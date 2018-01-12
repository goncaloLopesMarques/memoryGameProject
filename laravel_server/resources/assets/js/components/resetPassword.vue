<template>
    <div>
        <div  align = "left">
            <h2 style="color:#41b883">Forgot Password</h2>
            <br>
        </div>
        <div class="form-group" align = "left">
            <label for="inputEmail">Enter your email:</label>
            <input
                type="email" class="form-control" v-model="user.email"
                name="email" id="inputEmail" 
                placeholder="Email"/>
        </div>
        <div class="form-group" align = "left">
            <a class="save" v-on:click.prevent="send()">Send Email</a>
        </div>
    </div>
</template>

 <script>
  export default {
    data() {
      return {
        user: {
          email: '',
        },
      }
    },
    methods: {
        send() {
        
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