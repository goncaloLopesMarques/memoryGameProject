<template>
    <div>
        <div  align = "left">
            <h2 style="color:#41b883">Change Admin Email</h2>
            <br>
        </div>
        <div>
            <router-link to="/admin">Back to Admin Page</router-link>
        </div>
        <div class="form-group" align = "left">
            <label for="email">Admin Email</label>
            <input
                type="email" class="form-control" v-model="user.email"
                name="email" id="email" 
                placeholder="Admin Email"/>
        </div>
        <div class="form-group" align = "left">
            <a class="save" v-on:click.prevent="saveEmail()">Save</a>
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

    export default {
        data() {
            return {
                user: {
                    id: '',
                    email: '',
                }
            }
        },
        methods: {
            saveEmail: function(){
                axios.get('api/user/1')
                .then(response=>{
                        console.log(response);
                        var oldEmail = response.data.email;
                        var newEmail = this.user.email;
                        console.log(oldEmail);
                        console.log(newEmail);
                        var admin = this.user;
                        if (oldEmail == newEmail) {
                            swal('Email in use! Enter a different Email.');
                        }else{
                        axios.put('api/user/changeAdminEmail/'+response.data.id, admin)
                        .then(response=>{
                                    console.log(response);
                                    swal("Email changed!");
                                });
                        }
                    
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