export default function(vue){
    Vue.auth = {
        //guardar o utilizador logado
        setAuthUser(id){
            localStorage.setItem('id',id)
        },
        //set token
        setToken(token, expiration,username, refresh_token){
            localStorage.setItem('token',token)
            localStorage.setItem('expiration',expiration)
            localStorage.setItem('refresh_token', refresh_token)
        },
        //getUser
        getUser(){
            user.id = localStorage.getItem("id");
            user.fullName = localStorage.getItem("fullName");
            user.nickName = localStorage.getItem("nickName");
            user.email = localStorage.getItem("email");
            
            if(!id){
                return null
            }else{
                return user;
            }

        },
        //get Token
        getToken(){
            var token = localStorage.getItem('token')
            var expiration = localStorage.getItem('expiration')

            if(!token || !expiration ){
                return null;
            }if(Date.now() > parseInt(expiration)){
                this.destroyToken();
                return null;
            }else{
                return token;
            }
             
        },
        //destroy token
        destroyToken(){
            localStorage.removeItem('token')
            localStorage.removeItem('expiration')
            localStorage.removeItem('id')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('fullName')
            localStorage.removeItem('nickName')
            localStorage.removeItem('email')
        },
        //is authenticated
        isAuthenticated(){
            if(this.getToken()){
                return true;
            }else{
                return false;
            }
        },
        
    }

}