<template>
    <div>
        <div  align = "left">
            <h2 style="color:#41b883">Change Password</h2>
            <br>
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
            <a class="save" v-on:click.prevent="savePassword()">Save</a>
            <a class="cancel" v-on:click.prevent="cancel()">Cancel</a>
            <router-link to="/users">Reset Password</router-link>
        </div>
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
                        this.user.id = response.data.id;
                        var user = this.user
                        //if (inputOldPassword==oldPassword) {
                            bcrypt.compare(inputOldPassword, oldPassword, function(err, res) {
                              if (err){
                                // handle error
                              }
                              if (res){
                                axios.put('api/user/changePassword/'+response.data.id, user)
                                .then(response=>{
                                    console.log(response);
                                    swal("Password changed!");
                                });
                              } else {
                                swal("Wrong Password");
                              }
                            });
                    });
            },
            cancel: function(){
                axios.get('/api/user', {headers: getHeader()})
                    .then(response=>{
                        // Copy object properties from response.data.data to this.user
                        // without creating a new reference
                        Object.assign(this.user, response.data.data);
                        this.$emit('user-canceled', this.user);
                    });
            }
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