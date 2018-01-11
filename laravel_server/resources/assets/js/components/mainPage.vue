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
          <td><button class="logOut" v-on:click.prevent="createGame">Create a New Game</button></td>
		</tr>
	  </table>
	
	</div>

	<div align="center">
		<table>
			<td class="big"> Lobby</td>
			<td><button class="edit" v-on:click.prevent="hide">Hide/Show</button></td>
		</table>
	</div>
		<div>
		<lobby :games="lobbyGames" :user = "this.user" @join-click="join" @remove-click="remove" v-if="hideShow"></lobby>

		<template  v-for="game in activeGames">
                <game :user = "this.user" :game="game"></game>
            </template>


	</div>
	</div>
    			
</template>
<script type="text/javascript">
   import UserEdit from './userEdit.vue';
   import lobby from './lobby.vue' 
   import swal from 'sweetalert'; 
   import memoryGame from './gameMemory.vue'
   export default {	 
		   
		components: {
		 'user-edit': UserEdit,
		 'lobby' :	lobby,
		 'game' : memoryGame
		},
		  
        data() {
            return { 
				user:{
				id:'',
				fullName:'',
				nickName:'',	
				email:'',
				},	
				currentPlayer: this.user,
				currentUser: null,
				//lobby
				hideShow: true,
				socketId: "",
				lobbyGames: [],
				activeGames: []
			}
		}, 
		sockets:{
			
            connect(){
                console.log('socket connected');
                this.socketId = this.$socket.id;
            },
            discconnect(){
                console.log('socket disconnected');
                this.socketId = "";
            },
            lobby_changed(){
                // For this to work, websocket server must emit a message
                // named "lobby_changed"
                this.loadLobby();
            },
            my_active_games_changed(){
				this.loadActiveGames();
			},
			player_joined(playername){
				
				if(this.user.nickName == playername){
					swal("Success", playername+" successfully joined to the game", "success");
				}else{
				swal("Success", "The player: "+playername+" has joined to the game", "success");	
				}
				
            },
            my_active_games(games){
                this.activeGames = games;
            },
            my_lobby_games(games){
                this.lobbyGames = games;
            },
            game_changed(game){
                for(var lobbyGame of this.lobbyGames){
                    if(game.gameID == lobbyGame.gameID){
                        Object.assign(lobbyGame,game);
                        break;
                    }
                }
                for(var activeGame of this.activeGames){
                    if(game.gameID == activeGame.gameID){
                        Object.assign(activeGame,game);
                        break;
                    }
                }
			},
			invalid_play(errorObject){
                if(errorObject.type == 'Invalid_game'){
                    alert("error: Game does not exist on server");
                }else if(errorObject.type == 'Invalid_Player'){
                    alert("Error: Player not valid for this game");
                }else if(errorObject.type == 'Invalid_Play'){
                    alert("Error: This play aint valid ot not your turn");
                }else{
                    alert("Error: "+errorObject.type);
                }

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
			 loadLobby(){
              /// send message to server to load the list of games on the lobby
              this.$socket.emit('get_my_loby_games');
			 },
			 loadActiveGames(){
                /// send message to server to load the list of games that player is playing
				this.$socket.emit('get_my_activegames');
			},
			remove(game){
				if(game.gamePlayers[0].name != this.user.nickName){
					swal("Error", "Cannot delete another person game", "error");
				}else{
					this.$socket.emit('remove_game', game.gameID);
				}
			},
			hide: function(){
				if(this.hideShow == true){
					this.hideShow = null;
				}else{
					this.hideShow = true;
				}

			},
			startGame(game,linhas,colunas){
                if (this.user == null) {
                  alert('Current Player is Empty - Cannot Create a Game');
                  return;
                }else{
				  this.$socket.emit('start_game', { game: game, linhas: linhas, colunas: colunas});
				}
			},
			createGame(){
                // For this to work, server must handle (on event) the "create_game" message
                if (this.user == null) {
                    alert('Current Player is Empty - Cannot Create a Game');
                    return;
                }
                else {
					this.$socket.emit('create_game', { playerName: this.user.nickName });
                }
            },
			 join: function(game){
                if(game.player1 == this.user.nickName){
                    swal("Error", "Cannot join your own game", "error");
                    return;
                }
                this.$socket.emit('join_game',{
                     gameID: game.gameID,
                     playerName: this.user.nickName
                });
			},  
			 
		},		
	   mounted() {
			this.getUser();
			this.loadLobby();
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

	