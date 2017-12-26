export default function(vue){
    vue.auth = {
        //set token
        setToken: (token, expiration) =>{
            localStorage.setItem('token',token)
            localStorage.setItem('expiration',expiration)
        },
        //get Token
        getToken: () =>{
             
        },
        //destroy token
        //is authenticated
        isAuthenticated: ()=>{
            if(this.getToken()){
                return true;
            }else{
                return false;
            }
        }
    }
    Object.defineProperties(Vue.prototype,{
        $auth:{
            get: () =>{
                return Vue.auth;
            }
        }
    })
}