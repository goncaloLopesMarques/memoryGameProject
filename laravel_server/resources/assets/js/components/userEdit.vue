<template>
	<div>
		<div  align = "left">
            <h2 style="color:#41b883">Edit User</h2>
			<br>
		</div>
	    
	    <div class="form-group" align = "left">
	        <label for="inputName">FullName</label>
	        <input
	            type="text" class="form-control" v-model="user.fullName"
	            name="fullName" id="inputFullName" 
	            placeholder="Fullname"/>
	    </div>
	    <div class="form-group" align = "left">
	        <label for="inputEmail">Email</label>
	        <input
	            type="email" class="form-control" v-model="user.email"
	            name="email" id="inputEmail"
	            placeholder="Email address"/>
	    </div>
	    <div class="form-group" align = "left">
	        <label for="inputNickname">Nickname</label>
	        <input
	            type="text" class="form-control" v-model="user.nickName"
	            name="nickName" id="inputNickName" 
	            placeholder="Nickname"/>
	    </div>
	    <div class="form-group" align = "left">
	        <label for="inputOldPassword">Old Password</label>
	        <input
	            type="password" class="form-control" v-model="user.oldPassword"
	            name="oldPassword" id="inputOldPassword" 
	            placeholder="Old Password"/>
	    </div>
	    <div class="form-group" align = "left">
	        <label for="inputPassword">New Password</label>
	        <input
	            type="password" class="form-control" v-model="user.password"
	            name="password" id="inputPassword" 
	            placeholder="Password"/>
	    </div>
	    <div class="form-group" align = "left">
	        <label for="inputPasswordConfirmation">Password Confirmation</label>
	        <input
	            type="password" class="form-control" v-model="user.passwordConfirmation"
	            name="passwordConfirmation" id="inputPasswordConfirmation" 
	            placeholder="Password Confirmation"/>
	    </div>

	    <div class="form-group" align = "left">
	        <a class="save" v-on:click.prevent="saveUser()">Save</a>
	        <a class="cancel" v-on:click.prevent="cancelEdit()">Cancel</a>
	    </div>
	</div>
</template>

<script type="text/javascript">
	module.exports={
		props: ['user'],
	    methods: {
	        saveUser: function(){
	        	var bcrypt = require('bcryptjs');
	        	axios.get('api/user/'+localStorage.getItem("id"))
                    .then(response=>{
                        console.log(response);
                        var newPassword = this.user.password;
                        var oldPassword = response.data.password;
                        var inputOldPassword = this.user.oldPassword;
                        var PasswordConfirmation = this.user.passwordConfirmation
	            		this.user.id = response.data.id;
                        var user = this.user
                        console.log(newPassword);
                        console.log(oldPassword);
                        console.log(inputOldPassword);
                        console.log(PasswordConfirmation);
                        bcrypt.compare(inputOldPassword, oldPassword, function(err, res) {
                            if (err){
                                // handle error
                            }
                            if (res){
                                if (newPassword==PasswordConfirmation) {
                                     axios.put('api/user/'+user.id, user)
	                				.then(response=>{
					                	//Object.assign(this.user, response.data.data);
					                	//this.$emit('user-saved', this.user);
					                	swal("User Saved!");
	                				});
                                }else{
                                    swal("New Password and Password Confirmation do not match!");
                                }
                            } else {
                                swal("Wrong Password");
                            }
                        }); 
                    });      
	        },
	        cancelEdit: function(){
	        	axios.get('api/user/'+this.user.id)
	                .then(response=>{
	                	console.log(response);
	                	// Copy object properties from response.data.data to this.user
	                	// without creating a new reference
	                	Object.assign(this.user, response.data.data);
	                	console.log(this.user);
	                	this.$emit('user-canceled', this.user);
	                });
	        }
		}
	}
</script>

<style scoped>	
.form-group{
	color:#35495e;
	font-size:20px;
	}
.titulo{
	color:#41b883;
	font-size:30px;
	}
.cancel{
    background-color:#35495e;
	-moz-border-radius:28px;
	-webkit-border-radius:28px;
	border-radius:28px;
	border:1px solid #18ab29;
	display:inline-block;
	cursor:pointer;
	color:#41b883;
	font-family:Arial;
	font-size:12px;
	padding:6px 15px;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
}
.save{
	background-color:#41b883;
	-moz-border-radius:28px;
	-webkit-border-radius:28px;
	border-radius:28px;
	border:1px solid #35495e;
	display:inline-block;
	cursor:pointer;
	color:#35495e;
	font-family:Arial;
	font-size:12px;
	padding:6px 15px;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
}
</style>