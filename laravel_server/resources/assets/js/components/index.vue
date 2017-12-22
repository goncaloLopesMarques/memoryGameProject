<template>
	<div>
		<link href='http://fonts.googleapis.com/css?family=Merienda+One' rel='stylesheet' type='text/css'>
 
         <div align="center">
         	 <router-link class="loginButton" :to="{ path: '/login' }">Login</router-link>
			 <router-link class="registerButton" color: green :to="{ path: '/createUser' }">Register User</router-link>
         </div>
	</div>	
    			
</template>
<<style>
.loginButton {
	background-color:#41b883;
	-moz-border-radius:28px;
	-webkit-border-radius:28px;
	border-radius:28px;
	border:1px solid #18ab29;
	display:inline-block;
	cursor:pointer;
	color:#35495e;
	font-family:Arial;
	font-size:17px;
	padding:16px 31px;
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
	font-size:17px;
	padding:16px 31px;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
}
.registerButton:active {
	position:relative;
	top:1px;
}

</style>

