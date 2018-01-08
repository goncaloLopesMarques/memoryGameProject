<template>
	<table class="table table-striped">
	    <thead>
	        <tr>
	            <th>ID</th>
	            <th>{{ user.nickName }}</th>
	            <th>Actions</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr v-for="game in games"  :key="game.gameID">
	            <td>{{ game.gameID }}</td>
	            <td>{{ game.player1 }}</td>
	            <td>
	                <a class="btn btn-xs btn-primary" v-on:click.prevent="join(game)">Join</a>
	            </td>
	        </tr>
	    </tbody>
	</table>
</template>

<script type="text/javascript">
	// Component code (not registered)
	module.exports={
		props: ['games', 'user'],
        methods: {
            join(game) {
            	this.$emit('join-click',{gameID: game.gameID,
                     playerName: this.user.nickName});
			},
		/*	remove(game){
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