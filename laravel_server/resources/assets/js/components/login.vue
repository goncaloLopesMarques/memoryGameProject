<template>
	<div>
		<link href='http://fonts.googleapis.com/css?family=Merienda+One' rel='stylesheet' type='text/css'>
   		<br>
   		<br>
   		<br>
         <div align = "center">
            <table>
           <tr>
             <th :class="$style.tabela">Email </th>
             <th><input type="text" name="nickName" v-model="user.username"></th>
            <tr>
             <th :class="$style.tabela">Password</th>
             <th><input type="password" name="password" v-model="user.password"></th>
            </tr>
            </tr>
          </table>
         </div>  
         <br>      
         <div align="center">
         	 <button type="button" class="loginButton" v-on:click="login">Login</button>
			 <router-link class="registerButton" :to="{ path: '/createUser' }">Register User</router-link>
             <router-link class="backButton" :to="{ path: '/' }">Back</router-link>
             <br>
         </div>
	</div>	
    			
</template>

<script type="text/javascript">
import VueRouter from 'vue-router'
import{getHeader} from  '../vueapp.js'
import Router from '../vueapp.js'
   export default {
        data() {
            return {
                user: {
					client_id: 2,
					client_secret: 'Hu4OEZojQvN7S6ReYAj0RInhcHqcx94PAHp9QEPu',
					grant_type: 'password',
                    username:'',
					password: '',
                },
			}
			
        }, 
		    methods: {	        
			login: function(user) {
			var router = this.$router; 
			let aux = this.user.username;
			const authUser = {};
                axios.post('/oauth/token', this.user)
                    .then(function(response){
						console.log(response);
						Vue.auth.setToken(response.data.access_token, response.data.expires_in + Date.now(),aux,response.data.refresh_token)
						//obter os dados do utilizador logado
						axios.get('/api/user', {headers: getHeader()})
							.then(function(response){
								Vue.auth.setAuthUser(response.data.id)
								console.log(response)
							})
							.catch(function(error){
								console.log(error)
							})
						//window.localStorage.setItem('authUser', JSON.stringify(authUser))
						let successMessage = response.data.message
						console.log(successMessage);
						router.push("/mainPage");

                    })
                     .catch(function(error){
						 	console.log(error)
                    });
	            } 
	        },
	    components: {
	    	
	    },
	    mounted() {
			
		}

	}
</script>
<style>
.loginButton {
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
.loginButton:active {
	position:relative;
	top:1px;
}
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
.registerButton:active {
	position:relative;
	top:1px;
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
.backButton:active {
	position:relative;
	top:1px;
}
table, th, td {
    border: 1px solid black;
    color: black;
}
</style>

<style module>
.tabela {
	font: 100 20px/1.2 'Merienda One', Helvetica, sans-serif;
  	color: rgba(0,0,0,0.7);
  	text-shadow: 3px 3px 3px #fff;
}
.red {
  font: 400 100px/1.2 'Merienda One', Helvetica, sans-serif;
  color: rgba(0,0,0,0.7);
  text-shadow: 3px 3px 3px #fff;
  text-align: center;
}
.bold {
  font-weight: bold;
}
</style>