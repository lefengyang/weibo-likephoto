<template>
    <div class="hello">
        <div class="back"><a @click="routerBack">返回</a></div>
        <div class="user" v-for="(item, index) in userLists">
            <div class="name" @click="_go(item.uid, item.name)">{{item.name}}<br>{{item.last}}</div>
            <div class="close" @click="_del(item.uid)">删除</div>
        </div>
    </div>
</template>

<script>
import api from '../api'

export default {
    data() {
        return {
            userLists: [],
        }
    },
    created() {
        api.getUser().then(res => {
            console.log(res);
            this.userLists = res;
        });
    },
    methods: {
        routerBack(){
            this.$router.back();
        },
        _go(uid, name) {
            api.addUser(uid, name);
            this.$router.push({path:'/list', query:{uid:uid,name:name}})
        },
        _del(uid) {
            api.delUser(uid);

            for(var i in this.userLists){
                if(this.userLists[i]['uid'] == uid){
                    this.userLists.splice(i,1);
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.back{
    padding: 0.5rem;
}
.user{
    padding: 0.5rem;
    .name{
        display:inline;
    }
    .close{
        float:right;
    }
}
</style>
