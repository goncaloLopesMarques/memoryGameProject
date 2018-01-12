<template>
	<div>
		<div  align = "left">
            <h2 style="color:#41b883">Activate User</h2>
			<br>
		</div>
		<div>
			<label>Name: </label>
			<p>{{this.user.fullName}}</p>
		</div>
		<div class="form-group" align = "left">
	        <label for="inputActivateReason">Activate Reason: </label>
	        <input
	            type="text" class="form-control" v-model="user.reason_reactivated"
	            name="reason_reactivated" id="inputActivateReason" 
	            placeholder="Activate Reason"/>
	    </div>
	    <div class="form-group" align = "left">
	        <a class="save" v-on:click.prevent="activateUser()">Save</a>
	        <a class="cancel" v-on:click.prevent="cancelActivate()">Cancel</a>
	    </div>
	</div>
</template>

<script type="text/javascript">
	module.exports={
		props: ['user'],
	    methods: {
	    	activateUser: function(user){
	        	console.log(this.user);
	        	if (this.user.blocked == 0) {
	        		swal('User already active!');
	        	}else{
	        		this.user.blocked = 0;
	        		this.user.reason_reactivated;
	        		console.log(this.user.blocked);
	        		console.log(this.user.reason_reactivated);
	        		console.log(this.user.id);
	        		//user = this.user;
	        		console.log(this.user);
					axios.put('api/user/activateUser/'+this.user.id, this.user)
			        .then(response=>{
			            console.log(response);
			            this.$emit('user-activated', this.user);
			            swal("User Activated");
			        });
	        	}
	        	
	        },
	        cancelActivate: function(){
	        	this.activatingUser = null;
	        	this.$emit('activate-canceled', this.user);
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