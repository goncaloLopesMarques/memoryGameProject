<template>
	<table class="table table-striped">
	    <thead>
	        <tr>
	            <th>Name</th>
	            <th>Email</th>
	            <th>Nickname</th>
	            <th>Blocked</th>
	            <th>Actions</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr v-for="user in users"  :key="user.id" :class="{activerow: editingUser === user}">
	            <td>{{ user.fullName }}</td>
	            <td>{{ user.email }}</td>
	            <td>{{ user.nickName }}</td>
	            <td>{{ user.blocked }}</td>
	            <td>
	            	<a class="btn btn-xs btn-danger" v-on:click.prevent="blockUser(user)">Block</a>
	            	<a class="btn btn-xs btn-success" v-on:click.prevent="activateUser(user)">Activate</a>
	                <!--<a class="btn btn-xs btn-primary" v-on:click.prevent="editUser(user)">Edit</a>-->
	                <a class="btn btn-xs btn-warning" v-on:click.prevent="deleteUser(user)">Delete</a>
	            </td>
	        </tr>
	    </tbody>
	</table>
</template>

<script type="text/javascript">
	// Component code (not registered)
	module.exports={
		props: ['users'],
		data: function(){
			return { 
				editingUser: null,
				blockingUser: null,
				activatingUser: null
			}
		},
        methods: {
            editUser: function(user){
                this.editingUser = user;
                this.$emit('edit-click', user);	
            },		
            deleteUser: function(user){
                this.editingUser = null;
                this.$emit('delete-click', user);
			},
			blockUser: function(user){
				this.editingUser = user;
				this.$emit('block-click', user);
			},
			activateUser: function(user){
				this.editingUser = user;
				this.$emit('activate-click', user);
			}
        },		
	}
</script>

<style scoped>
	tr.activerow {
  		background: #123456  !important;
  		color: #fff          !important;
}

</style>