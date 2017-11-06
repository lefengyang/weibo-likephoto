<template>
    <div>
        <h1>微博秋名山</h1>
        <input class="username" type="text" v-model="username" placeholder="微博用户名">
        <br><br>
        <input class="password" type="password" v-model="password" placeholder="输入密码">
        <br><br>
        <div @click="login()" class="btn">登录</div>
        <div @click="routerBack()" class="btn">返回</div>
    </div>
</template>

<script>
import api from '../api'

export default {
    data () {
        return {
            username:'',
            password:''
        }
    },
    methods: {
        routerBack(){
            this.$router.back();
        },
        login(){
            api.Login(this.username, this.password).then(res => {
                api.SetGsid(res);
                this.$router.push({path:'/', query:{}});
            }, err => {
                alert('登录失败！');
            });
        }
    }
}

</script>

<style lang="scss" scoped>
h1 {
    font-weight: normal;
    font-size: 1.4rem;
    padding: 1rem;
}

.username,.password{
    margin-left: 1rem;
    border: 1px solid #efefef;
    padding: 0.5rem;
    width: 14rem;
}

.btn{
    margin-left: 1rem;
    border:1px solid #efefef;
    color:#fff;
    background-color:#ff8420;
    border-radius:10px;
    padding:0.5rem 1rem;
    display: inline-block;
}
</style>
