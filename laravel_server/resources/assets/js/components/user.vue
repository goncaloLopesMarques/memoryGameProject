<template>
	<div>
		<div class="jumbotron">
			<h1>{{ title }}</h1>
		</div>
		<div>
            <router-link to="/admin">Back to Admin Page</router-link>
        </div>
		<user-list :users="users" @edit-click="editUser" @delete-click="deleteUser" @block-click="blockUser" @activate-click="activateUser" @message="childMessage" ref="usersListRef"></user-list>
	
		<div class="alert alert-success" v-if="showSuccess">
			 
			<button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
			<strong>{{ successMessage }}</strong>
		</div>
		<!--<user-edit :user="currentUser"  @user-saved="savedUser" @user-canceled="cancelEdit" v-if="currentUser"></user-edit>-->
		<user-block :user="blockingUser" @user-blocked="blockedUser" @block-canceled="cancelBlock" v-if="blockingUser"></user-block>
		<user-activate :user="activatingUser" @user-activated="activatedUser" @activate-canceled="cancelActivate" v-if="activatingUser"></user-activate>
	</div>				
</template>

<script type="text/javascript">
	import UserList from './userList.vue';
	import UserEdit from './userEdit.vue';
	import UserBlock from './userBlock.vue';
	import UserActivate from './userActivate.vue';
	
	export default {
		data: function(){
			return { 
		        title: 'List Users',
		        showSuccess: false,
		        successMessage: '',
		        currentUser: null,
		        blockingUser: null,
		        activatingUser: null,
		        users: [],
			}
		},
	    methods: {
	        editUser: function(user){
	            this.currentUser = user;
	            this.showSuccess = false;
	        },
	        deleteUser: function(user){
	        	console.log(user);
	            axios.delete('api/users/'+user.id)
	                .then(response => {
	                    this.showSuccess = true;
	                    this.successMessage = 'User Deleted';
	                    this.getUsers();
	                });
	        },
	        blockUser: function(user){
	        	this.blockingUser = user;
	        	this.activatingUser = null;
	        	this.showSuccess = false;
	        },
	        cancelBlock: function(){
	            this.blockingUser = null;
	            this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = false;
	        },
	        blockedUser: function(){
	            this.blockingUser = null;
	            this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = true;
	            this.successMessage = 'User Blocked';
	        },
	        activateUser: function(user){
	        	this.activatingUser = user;
	        	this.blockingUser = null;
	        	this.showSuccess = false;
	        },
	        cancelActivate: function(){
	            this.activatingUser = null;
	            this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = false;
	        },
	        activatedUser: function(){
	            this.activatingUser = null;
	            this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = true;
	            this.successMessage = 'User Activated';
	        },
	        savedUser: function(){
	            this.currentUser = null;
	            this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = true;
	            this.successMessage = 'User Activated';
	        },
	        cancelEdit: function(){
	            this.currentUser = null;
	            this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = false;
	        },
	        getUsers: function(){
	            axios.get('api/users')
	                .then(response=>{this.users = response.data.data; });
			},
			childMessage: function(message){
				this.showSuccess = true;
	            this.successMessage = message;
			}
			
	    },
	    components: {
	    	'user-list': UserList,
	    	'user-edit': UserEdit,
	    	'user-block': UserBlock,
	    	'user-activate': UserActivate
	    },
	    mounted() {
			this.getUsers();
		}

	}
</script>

<style scoped>	
p {
	font-size: 2em;
	text-align: center;
}
</style>