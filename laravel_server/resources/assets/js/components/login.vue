<template>
	<div>
		<link href='http://fonts.googleapis.com/css?family=Merienda+One' rel='stylesheet' type='text/css'>
		<div>
			<h1 :class="$style.red">{{ title }}</h1>
		</div>
   		<br>
   		<br>
   		<br>
         <div align = "center">
            <table>
           <tr>
             <th :class="$style.tabela">Nickname</th>
             <th><input type="text" name="nickName"></th>
            <tr>
             <th :class="$style.tabela">Password</th>
             <th><input type="password" name="password"></th>
            </tr>
            </tr>
          </table>
         </div>  
         <br>      
         <div align="center">
         	<button type="button" class="btn btn-primary">Login</button>
			 <router-link class="btn btn-default" :to="{ path: '/createUser' }">
                            Register User
                        </router-link>
         </div>
	</div>	
    			
</template>

<script type="text/javascript">

	export default {
		data: function(){
			return { 
		        title: 'Memory Game',
			}
		},
	    methods: {
	        
	    },
	    components: {
	    	
	    },
	    mounted() {
			
		}

	}
</script>
<style>
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