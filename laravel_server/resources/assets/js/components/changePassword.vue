<template>
    <div>
        <div  align = "left">
            <h2 style="color:#41b883">Change Password</h2>
            <br>
        </div>
        <div>
            <router-link to="/admin">Back to Admin Page</router-link>
        </div>
        <div class="form-group" align = "left">
            <label for="inputOldPassword">Old Password</label>
            <input
                type="password" class="form-control" v-model="user.oldPassword"
                name="oldPassword" id="inputOldPassword" 
                placeholder="Old Password"/>
        </div>
        <div class="form-group" align = "left">
            <label for="inputNewPassword">New Password</label>
            <input
                type="password" class="form-control" v-model="user.password"
                name="newPassword" id="inputNewPassword" 
                placeholder="New Password"/>   
        </div>
        <div class="form-group" align = "left">
            <label for="inputPasswordConfirmation">New Password Confirmation</label>
            <input
                type="password" class="form-control" v-model="user.passwordConfirmation"
                name="passwordConfirmation" id="inputPasswordConfirmation" 
                placeholder="Password Confirmation"/>   
        </div>

        <div class="form-group" align = "left">
            <a class="save" v-on:click.prevent="savePassword()">Save</a>
            <router-link to="/resetPassword">Reset Password</router-link>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
    </div>
</template>

<script type="text/javascript">
import {getHeader} from  '../vueapp.js'
    export default {
        data() {
            return {
                user: {
                    id: '',
                    password: '',
                }
            }
        },
        methods: {
            savePassword: function(){
                //axios.put('api/user/',{headers: getHeader()})
                var bcrypt = require('bcryptjs');
                axios.get('api/user/'+localStorage.getItem("id"))
                    .then(response=>{
                        console.log(response);
                        var newPassword = this.user.password;
                        var oldPassword = response.data.password;
                        var inputOldPassword = this.user.oldPassword;
                        var PasswordConfirmation = this.user.passwordConfirmation
                        this.user.id = response.data.id;
                        var user = this.user
                            bcrypt.compare(inputOldPassword, oldPassword, function(err, res) {
                              if (err){
                                // handle error
                              }
                              if (res){
                                if (newPassword==PasswordConfirmation) {
                                    axios.put('api/user/changePassword/'+response.data.id, user)
                                    .then(response=>{
                                        console.log(response);
                                        swal("Password changed!");
                                    });
                                }else{
                                    swal("New Password and Password Confirmation do not match!");
                                }
                              } else {
                                swal("Wrong Password");
                              }
                            });
                    });
            },
        }
    }
 
</script>

<style scoped>  
.form-group{
    color:#35495e;
    font-size:20px;
    }
.titulo{
    color:#41b883;
    font-size:30px;
    }
    .cancel{
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
.save{
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
</style>