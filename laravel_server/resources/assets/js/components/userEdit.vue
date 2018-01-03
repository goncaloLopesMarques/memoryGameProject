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
	            axios.put('api/user/'+this.user.id, this.user)
	                .then(response=>{
	                	// Copy object properties from response.data.data to this.user
	                	// without creating a new reference
	                	Object.assign(this.user, response.data.data);
	                	this.$emit('user-saved', this.user)
	                });
	        },
	        cancelEdit: function(){
	        	axios.get('api/user/'+this.user.id)
	                .then(response=>{
	                	// Copy object properties from response.data.data to this.user
	                	// without creating a new reference
	                	Object.assign(this.user, response.data.data);
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