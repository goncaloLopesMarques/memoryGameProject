<template>
	<div align = "right">
	 <div align = "right">
	  <div>
	    <h1>User details</h1>
		<div>
		<table>
			<td><button class="nick">NickName: {{this.user.nickName}}</button></td>
			<td><button class="logOut" v-on:click="logout">Logout</button></td>
			<td><button class="edit" v-on:click="editUser">Editar Utilizador</button></td>
		</table>			
			</div>
		</div>
		</div>
	<div>
	   <user-edit :user="currentUser"  @user-saved="savedUser" @user-canceled="cancelEdit" v-if="currentUser"></user-edit>	   
	</div>

	<div align = "left">
	  <table>
	    <tr>
          <td class="textGreen">Current Player : </td>
          <td class="textGray">{{ this.user.nickName }}</td>
		</tr>
		<tr>
			<td>
				<p>
					
				</p>
			</td>
		</tr>
        <tr>
          <td><button class="btn btn-xs btn-success" v-on:click.prevent="createGame">Create a New Game</button></td>
		</tr>
	  </table>
	
	</div>

	<div align="center">
     <h2>Lobby</h2>
	</div>
		<div>
		<lobby :games="lobbyGames" :user = "this.user" @join-click="join"></lobby>
	</div>
	</div>
    			
</template>
<script type="text/javascript">
   import UserEdit from './userEdit.vue';
   import lobby from './lobby.vue' 
   import swal from 'sweetalert'; 
   export default {	 
		   
		components: {
		 'user-edit': UserEdit,
		 'lobby' :	lobby
		},
		  
        data() {
            return { 
				user:{
				id:'',
				fullName:'',
				nickName:'',	
				email:'',
				},	
				currentUser: null,
				//lobby
				lobbyGames: []
			}
		}, 
		
		    methods: {
			 getUser: function(){
				axios.get('api/user/'+localStorage.getItem("id"))
	                .then(response=>{
	                	// Copy object properties from response.data.data to this.user
	                	// without creating a new reference
						console.log(response)
						this.user.id = response.data.id;
						this.user.fullName = response.data.fullName;
						this.user.nickName = response.data.nickName;
						this.user.email = response.data.email;
						

					});
					
			 },
			 editUser: function(){
				this.currentUser = this.user;
	            this.showSuccess = false;
			 },	
			 cancelEdit: function(){
	            this.currentUser = null;
	            this.showSuccess = false;
	        },
			 savedUser: function(){
	            this.currentUser = null;
				swal("Success", "Utilizador editado com sucesso", "success");
			}, 
			childMessage: function(message){
				this.showSuccess = true;
	            this.successMessage = message;
			},
			logout: function() {  
                 Vue.auth.destroyToken();
                this.$router.push("/index");
			 },
			 	//lobby methods
			 join: function(game){
                if(game.player1 == this.currentPlayer){
                    alert('Cannot join because its your game');
                    return;
                }
                this.$socket.emit('join_game',{
                     gameID: game.gameID,
                     playerName: this.currentPlayer
                });
            }    
			 
		},
		
			
	   mounted() {
			this.getUser();
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
.textGreen{
color:#41b883;
font-size:24px;
}
.textGray{
color:#35495e;
font-size:24px;
}
.big{
color:#35495e;
font-size:30px;
}
</style>

	