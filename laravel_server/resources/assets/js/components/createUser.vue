<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h1>Register Form</h1>

                <form @submit.prevent="register(user)">
                    <div class="text-left">
                        <div class="form-group" :class="{ 'has-error': errors.fullName.length }">
                            <label for="fullName">Name</label>
                            <input type="text" class="form-control" id="fullName" placeholder="Enter your full name" v-model="user.fullName">
                            <p class="help-block" v-for="error in errors.fullName">{{ error }}</p>
                        </div>

                          <div class="form-group" :class="{ 'has-error': errors.nickName.length }">
                            <label for="nickName">NickName</label>
                            <input type="text" class="form-control" id="nickName" placeholder="Enter your nickName" v-model="user.nickName">
                            <p class="help-block" v-for="error in errors.nickName">{{ error }}</p>
                        </div>

                        <div class="form-group" :class="{ 'has-error': errors.email.length }">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Your email" v-model="user.email">
                            <p class="help-block" v-for="error in errors.email">{{ error }}</p>
                        </div>

                        <div class="form-group" :class="{ 'has-error': errors.password.length }">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Your password" v-model="user.password">
                            <p class="help-block" v-for="error in errors.password">{{ error }}</p>
                        </div>

                        <div class="form-group" :class="{ 'has-error': errors.password_confirmation.length }">
                            <label for="password_confirmation">Password Confirmation</label>
                            <input type="password" class="form-control" id="password_confirmation" placeholder="Your password confirmation" v-model="user.password_confirmation">
                            <p class="help-block" v-for="error in errors.password_confirmation">{{ error }}</p>
                        </div>
                    </div>

                    <div class="text-center">
                        <button class="registerButton">Register</button>
                        <router-link class="backButton" :to="{ path: '/' }">Back</router-link>
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
                user: {
                    fullName: '',
                    nickName:'',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
                errors: {
                    fullName: [],
                    nickName:[],
                    email: [],
                    password: [],
                    password_confirmation: [],
                },
            }
        },
	    methods: {
            
             resetUser() {
                    this.user = {
                    fullName: null,
                    nickName: null,
                    email: null,
                    password: null,
                    password_confirmation: null,
                }
            },
	        register(user) {
                var router = this.$router;
                axios.post('/api/register', user)
                    .then(response => {
                        this.resetUser()
                        let successMessage = response.data.message
                        swal("Success", "Utilizador editado com sucesso", "success");
                        router.push("/index");
                    })
                     .catch(error => {
                        let data = error.response.data
                        for(let key in this.errors) {
                            // reset all errors
                            this.errors[key] = []
                            let errorMessage = data[key]
                            console.log('key', key)
                            console.log('errorMessage', errorMessage)
                            if(errorMessage)
                                this.errors[key] = errorMessage
                        }
                    });
	        }
        }
    }
</script>

<style>
.registerButton {
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
