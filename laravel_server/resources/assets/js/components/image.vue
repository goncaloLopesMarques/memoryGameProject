<template>
	<div>
		<div class="jumbotron">
			<h1>{{ title }}</h1>
		</div>

		<image-list :images="images" @delete-click="deleteImage" @message="childMessage"></image-list>
	
		<div class="alert alert-success" v-if="showSuccess">
			 
			<button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
			<strong>{{ successMessage }}</strong>
		</div>				
	</div>				
</template>

<script type="text/javascript">
	import ImageList from './imageList.vue';
	
	export default {
		data: function(){
			return { 
		        title: 'List Images',
		        showSuccess: false,
		        successMessage: '',
		        images: [],
			}
		},
	    methods: {
	        
	        deleteImage: function(image){
	        	console.log(image);
	            axios.delete('api/images/'+image.id)
	                .then(response => {
	                    this.showSuccess = true;
	                    this.successMessage = 'Image Deleted';
	                    this.getImages();
	                });
	        },
	        getImages: function(){
	            axios.get('api/images')
	                .then(response=>{this.images = response.data.data; 
	                });
			},
			childMessage: function(message){
				this.showSuccess = true;
	            this.successMessage = message;
			}
			/*editUser: function(user){
	            this.currentUser = user;
	            this.showSuccess = false;
	        },
	        
	        savedUser: function(){
	            this.currentUser = null;
	            this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = true;
	            this.successMessage = 'User Saved';
	        },

	        cancelEdit: function(){
	            this.currentUser = null;
	            this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = false;
	        }
	        */
	        
	    },
	    components: {
	    	'image-list': ImageList
	    },
	    mounted() {
			this.getImages();
		}

	}
</script>

<style scoped>	
p {
	font-size: 2em;
	text-align: center;
}
</style>