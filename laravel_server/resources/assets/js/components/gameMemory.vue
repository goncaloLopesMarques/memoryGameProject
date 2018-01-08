<template>
	<div class="gameseparator">
        <div>
            <h2 class="text-center">Game {{game.gameID}}</h2>
            <br>
            <div>
          <table align = "left" v-if="(started && this.game.gamePlayers[0].playerSocketID == this.$parent.socketId)">
           <tr>
             <th>Numero de linhas </th>
             <th><input name="linhas" v-model="linhas"></th>
            <tr>
             <th>Numero de colunas</th>
             <th><input name="colunas" v-model="colunas"></th>
            </tr>
            <tr>
                <th><button class=".btn-success" v-on:click.prevent="startGame" >StartGame</button></th>
            </tr>
            </tr>
          </table>   
            
        </div>
        </div>

        <div class="game-zone-content">       
            <div class="alert" :class="alerttype">
                <strong>{{ message }} &nbsp;&nbsp;&nbsp;&nbsp;<a v-on:click.prevent="closeGame">Close Game</a></strong>
            </div>
            <div align= "left">
                Players:
            </div>
            <div align ="center">
                <h1>{{this.gameType}}</h1>
            </div>
            <div align = "left">
              <li v-for="item in this.players">
                {{ item }}
              </li>
            </div>
             
            <div class="board">
                <div v-for="(piece, key) of game.board" >
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                </div>
            </div>
            <hr>
        </div>  
    </div>			
</template>
<script type="text/javascript">
 import swal from 'sweetalert';
	export default {
        props: ['game','user'],
        data: function(){
			return {
                started: true,
                linhas:4,
                colunas:4,
                socketId: '',
                players:[],
                gameType: ''
            }
        },
        mounted(){
            this.fillThingsUp();
        },

        computed: {
             ownPlayerNumber(){
                if(this.game.gamePlayers[0].playerSocketID == this.$parent.socketId){

                 return this.game.gamePlayers[0].id;

                }else if(this.game.gamePlayers[1].playerSocketID == this.$parent.socketId){
                
                 return this.game.gamePlayers[1].id;
                
                }else if(this.game.gamePlayers[2].playerSocketID == this.$parent.socketId){
                 
                 return this.game.gamePlayers[2].id;    
                
                }else if(this.game.gamePlayers[3].playerSocketID == this.$parent.socketId){
                 
                 return this.game.gamePlayers[3].id;
                
                }
                
            },

           message(){
                // return Message to show
                if (!this.game.gameStarted) {
                    return "Game has not started yet";
                } else if (this.game.gameEnded) {
                    if (this.game.winner == this.ownPlayerNumber) {
                        return "Game has ended. YOU WIN!!";
                    } else if (this.game.winner == 0) {
                        return "Game has ended. It's a Tie!!";
                    } 
                    return "Game has ended and " + this.adversaryName + "'s won. YOU LOST!!";
                } else {
                    if (this.game.playerTurn == this.ownPlayerNumber) {
                        return "It's your turn";
                    } else {
                        return "It's " + this.adversaryName + "'s turn";
                    }
                }
                return "Game is inconsistent";
            },
            adversaryName(){
                var ownNumber = this.ownPlayerNumber;
                if(ownNumber == 1){
                    return this.players[0].name;
                }
                if(ownNumber == 2){
                    return this.players[1].name;
                }
                if(ownNumber == 3){
                    return this.players[2].name;
                }
                if(ownNumber == 4){
                    return this.players[3].name;
                }
                return "unnknown";
                
            },
            alerttype(){
                 if(!this.game.gameStarted){
                   return "aler-warning";
               }else if(this.game.gameEnded){
                   if(this.game.winner == this.ownPlayerNumber){
                       return "alert-success";
                   }else if(this.game.winner == 0){
                       return "alert-info";
                   }
                    return "alert-danger";
               }else{
                   if(this.game.playerTurn == this.ownPlayerNumber){
                       return "alert-success";
                   }else{
                       return "alert-info";
                   }
               }
                   
            }
           
        },
        methods: {
            startGame(){
                if(this.linhas >= 4 && this.colunas >= 4){
                this.$parent.startGame(this.game,this.linhas,this.colunas);
                this.started = null;
                this.fillThingsUp()
                console.log(this.players)
                console.log(this.game)  
                }else{
                    swal("Error", "The minimum value is 4", "error");
                }
                
            },
            closeGame (){
                // Click to close game
                this.$parent.remove(this.game);
            },
            clickPiece(index){
                if(!this.game.gameEnded){
                    if(this.game.playerTurn != this.ownPlayerNumber){
                        alert("its not your turn!");
                    }else{
                        if(this.game.board[index]==0){
                            this.$parent.play(this.game,index);
                        }
                    }
                }
            },
            
            pieceImageURL: function (piece) {
                var imgSrc = String(piece);
                return 'img/' + imgSrc + '.png';
            },
            fillThingsUp(){
                var aux =0
                for(var i = 0 ; i< this.game.numberOfPlayers; i++){
                   aux ++;
                   this.players[i] = 'Player'+aux+' '+this.game.gamePlayers[i].name;
                    
                }
                if(this.game.numberOfPlayers ==1){
                    this.gameType = "SinglePlayer"
                }else{
                    this.gameType = "MultiPlayer"
                }
                
                return this.players
            }
 
        }
       
    }
</script>

<style scoped>	
.gameseparator{
    border-style: solid;
    border-width: 2px 0 0 0;
    border-color: black;
}
</style>