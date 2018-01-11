<template>
	<div>
		<div>
			<router-link to="/uploadImage">Upload New Image</router-link>
		</div>
		<table class="table table-striped">
		    <thead>
		        <tr>
		            <th>Face</th>
		            <th>Active</th>
		            <th>Path</th>
		            <th>Image</th>
		            <th>Actions</th>
		        </tr>
		    </thead>
		    <tbody>
		        <tr v-for="image in images"  :key="image.id">
		            <td>{{ image.face }}</td>
		            <td>{{ image.active }}</td>
		            <td>{{ image.path }}</td>
		            <td><img v-bind:src="ImageURL(image.path)" ></td>
		            <td>
		            	<a class="btn btn-xs btn-success" v-on:click.prevent="activateImage(image)">Activate</a>
		                <a class="btn btn-xs btn-warning" v-on:click.prevent="deleteImage(image)">Delete</a>
		            </td>
		        </tr>
		    </tbody>
		</table>
	</div>
</template>

<script type="text/javascript">
	// Component code (not registered)
	module.exports={
		props: ['images'],
		data: function(){
			return { 
				//editingUser: null
			}
		},
        methods: {
            /*editUser: function(user){
                this.editingUser = user;
                this.$emit('edit-click', user);	
            },	*/	
            ImageURL: function (image) {
                var imgSrc = String(image);
                return 'img/' + imgSrc;
            },
            deleteImage: function(image){
                //this.editingUser = null;
                this.$emit('delete-click', image);
			},
			activateImage: function(image){
				//this.editingUser = user;
				this.$emit('activate-click', image);
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