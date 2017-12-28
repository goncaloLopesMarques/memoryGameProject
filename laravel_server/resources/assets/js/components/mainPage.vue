<template>
	<div align = "right">
		<table>
			<td><button class="nick">NickName: {{nickName}}</button></td>
			<td><button class="logOut" v-on:click="logout">Logout</button></td>
			<td><button class="edit" v-on:click="editUser">Editar Utilizador</button></td>
		</table>
	<div>
	   <user-edit :user="currentUser"  @user-saved="savedUser" @user-canceled="cancelEdit" v-if="currentUser"></user-edit>	   
	</div>
	</div>
    			
</template>
<script type="text/javascript">
   import UserEdit from './userEdit.vue';  
   export default {	 
		   
		components: {
	     'user-edit': UserEdit	
		},
		  
        data() {
            return { 
				user:{
				id:'',
				fullName:'',
				nickName:'',
				email:'',
				},
				nickName: localStorage.getItem("nickName"),	
				currentUser: null
			}
		}, 
		
		    methods: {
			 editUser: function(){
				this.currentUser = this.user;
	            this.showSuccess = false;
			 },	
			 cancelEdit: function(){
	            this.currentUser = null;
	            this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = false;
	        },
			 savedUser: function(){
	            this.currentUser = null;
	            this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = true;
	            this.successMessage = 'User Saved';
			}, 
			 fillUser: function(){
				this.user.id = localStorage.getItem("id")
				this.user.fullName = localStorage.getItem("fullName")
				this.user.nickName = localStorage.getItem("nickName")
				this.user.email = localStorage.getItem("email")
			},
			childMessage: function(message){
				this.showSuccess = true;
	            this.successMessage = message;
			},
			logout: function() {  
                 Vue.auth.destroyToken();
                this.$router.push("/index");
	         }    
			 
			},
			
	    mounted() {
			this.fillUser();
		}


	}
</script>


<<style>
.logOut{
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
.edit{
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
.nick{
	background-color:#f5f8fa;
	-moz-border-radius:28px;
	-webkit-border-radius:28px;
	border-radius:28px;
	border:1px solid #35495e;
	display:inline-block;
	cursor:pointer;
	color:#41b883;
	font-family:Arial;
	font-size:13px;
	padding:6px 15px;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
}
</style>

	