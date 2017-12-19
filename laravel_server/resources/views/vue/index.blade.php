@extends('master')

@section('title', 'Vue.js App')

@section('content')
    <router-link to="/createUser">Create User</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/multitictactoe">Multiplayer TicTacToe</router-link>

    <router-view></router-view>
@endsection

@section('pagescript')
<script src="js/vueapp.js"></script>

<!-- <script src="/js/manifest.js"></script>
<script src="/js/vendor.js"></script>
<script src="/js/vueapp.js"></script>
 -->
 @stop  
