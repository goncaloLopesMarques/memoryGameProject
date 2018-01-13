<template>
  <table class="table table-striped">
      <thead>
          <tr>
              <th>ID</th>
              <th>Game Creator</th>
        <th>Start Date</th>
        <th>Number of Players</th>
              <th>Actions</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="game in games"  :key="game.gameID">
              <td>{{ game.gameID }}</td>
              <td>{{ game.gamePlayers[0].name }}</td>
        <td>{{ game.startTime }}</td>
        <td>{{ game.numberOfPlayers }}</td>
              <td>
                  <a class="btn btn-xs btn-primary" v-if ="clicked" v-on:click.prevent="join(game)">Join</a>
              </td>
          </tr>
      </tbody>
  </table>
</template>
 
<script type="text/javascript">
  // Component code (not registered)
  module.exports={
    props: ['games', 'user'],
    data() {
            return { 
        clicked: true
}
    },
        methods: {
            join(game) {
        clicked = false
              this.$emit('join-click',{gameID: game.gameID,
                     playerName: this.user.nickName,
                     numberOfPlayers: game.numberOfPlayers,
                     players: game.gamePlayers});
      },
    /*  remove(game){
        if(game.player1 != this.user.nickName){
          swal("Error", "Cannot delete another person game", "error");
        }else{
          this.$socket.emit('remove_game',game.gameID);
        }
      },*/      
        },    
  }
</script>
 
<style scoped>
 
</style>