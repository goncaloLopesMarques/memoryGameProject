<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h1>Upload Image</h1>
                <form @submit.prevent="uploadImage(image)">
                    <div class="text-left">
                        <div>
                            <label for="face">Face</label>
                            <input type="text" class="form-control" id="face" placeholder="Enter image face type (tile/hidden)" v-model="image.face">
                        </div>
                        <div>
                            <label for="file">File</label>
                            <input type="file"  @change="imageChanged" id="path" placeholder="Image file">
                        </div>
                    </div>
                    <div class="text-center">
                        <button class="uploadButton">Upload</button>
                        <router-link class="backButton" :to="{ path: '/images' }">Back</router-link>
                        <br><br>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
  import swal from 'sweetalert'; 
    export default {
 
        data() {
            return {
                image: {
                    face:'',
                    path: '',
                },
                
            }
        },
        methods: {
            imageChanged(e) {
                console.log(e.target.files[0]);
                var fileReader = new FileReader();
                fileReader.readAsDataURL(e.target.files[0]);

                fileReader.onload = (e) => {

                    let img = new Image();
                    img.src = e.target.result;
                    console.log('image1:' +img.src);
                    let image = this.image;
                    img.onload = function () {
                        let width = this.width;
                        let height = this.height;
                        //console.log(width);
                        //console.log(height);
                        if (width =! 48 || height != 48) {
                            swal('Invalid image size. Please enter 48x48 pixels');
                        }else{
                            console.log('Valid image');
                            //img.src = e.target.result;
                            image.path = img.src;
                        }
                    }
                    //this.image.path = e.target.result;
                    //console.log('image2:' +this.image.path);
                }
                
            },
            resetImage() {
                    this.image = {
                    path: null,
                    face: null,
                }
            },
            uploadImage(image) {
                var router = this.$router;
                axios.post('/api/images', image)
                    .then(response => {
                        this.resetImage()
                        let successMessage = response.data.message
                        swal("Success", "Imagem created", "success");
                        router.push("/images");
                    });
            }
        }
    }
</script>

<style>
.uploadButton {
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
.backButton {
    background-color:#ffffff;
    -moz-border-radius:28px;
    -webkit-border-radius:28px;
    border-radius:28px;
    border:1px solid #000000;
    display:inline-block;
    cursor:pointer;
    color:#000000;
    font-family:Arial;
    font-size:12px;
    padding:6px 15px;
    text-decoration:none;
    text-shadow:0px 1px 0px #2f6627;
}

</style>

