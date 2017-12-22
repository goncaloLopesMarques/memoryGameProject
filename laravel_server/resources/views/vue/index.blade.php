@extends('master')

@section('title', 'Vue.js App')

@section('content')
<head>
    <div align ="center">
     <img src="/img/vue.png" height ="300" width = "300"/> 
    </div>  
</head>
<body>
    <div align ="center">
    <h1>Memory Game</h1>
    <br></br>
    <br></br>
    </div>
    
</body>    
    <router-view></router-view>
@endsection

@section('pagescript')
<script src="js/vueapp.js"></script>

 @stop  
