<template>
    <div class="hello">
        <div class="back"><a @click="routerBack">返回</a> <div class="blog-name">页码<input type="text" v-model="page" class="go-page-input"></div></div>
        <div class="photo-list">
            <img class="small" v-lazy="item.pic_small" v-for="(item, index) in picList" @click="_big(item.pic_ori, index, item.mid)">
            <div class="big-photo" v-show="is_view">
                <img :src="big_img" @click="_hide()">
                <div class="left-area" @click="_left()"></div>
                <div class="center-area"></div>
                <div class="right-area" @click="_right()"></div>
                <div class="like-user" @click="_like_user()" v-show="mid">此图点赞用户</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../api'
var loadingimg = require('../../static/loading.gif');

export default {
    data() {
        return {
            page: 1,
            is_end: 0,
            picList: [],
            is_view: false,
            big_img: '',
            index: 0,
            mid: ''
        }
    },
    created() {
        this.loadPage();
    },
    mounted(){
        window.addEventListener('scroll',()=>{
            if(this.getScrollTop() + window.innerHeight >= document.body.offsetHeight) {
                if(this.is_end)return;
                this.page++;
                this.loadPage();
            }
        },false);
    },
    methods: {
        routerBack(){
            this.$router.back();
        },
        _hide (){
            this.is_view = false;
        },
        getScrollTop() {
            var scrollTop=0;
            if(document.documentElement&&document.documentElement.scrollTop){
                scrollTop=document.documentElement.scrollTop;
            }
            else if(document.body){
                scrollTop=document.body.scrollTop;
            }
            return scrollTop;
        },
        loadPage(){
            if(this.picList.length>300){
                this.index = 0;
                this.picList = this.picList.slice(290);
            }
            api.getPhotoList(this.page).then(res => {
                var pics = [];
                for(var i in res){
                    var url = res[i]['url'];
                    var mid = res[i]['mid']?res[i]['mid']:'';
                    pics.push({pic_ori:url, pic_small:url.replace(/(https?:\/\/.*?\/).*?(\/.*)/,'$1thumb150$2'), mid:mid});
                }
                this.picList = this.picList.concat(pics);
            })
        },
        _big(url, index, mid) {
            this.big_img = loadingimg;
            this.is_view = true;
            this.index = index;
            this.mid = mid?mid:'';

            var newImg = new Image();
            newImg.src = url;
            newImg.onerror = () => {
                this.big_img = '';
            }
            newImg.onload = () => {
                this.big_img = url;
            }
        },
        _left() {
            if(this.$store.state.hand=='right'){
                this.prev();
            }else{
                this.next();
            }
        },
        _right() {
            if(this.$store.state.hand=='right'){
                this.next();
            }else{
                this.prev();
            }
        },
        prev() {
            if(this.index<=0)return;
            this.index--;
            this._big(this.picList[this.index]['pic_ori'], this.index, this.picList[this.index]['mid']);
        },
        next() {
            if(this.index>=this.picList.length-1)return;
            this.index++;
            this._big(this.picList[this.index]['pic_ori'], this.index, this.picList[this.index]['mid']);
        },
        _like_user() {
            if(this.mid){
                this.$router.push({path:'/like_user', query:{mid:this.mid}});
            }else{
                //...
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.left-area{position:absolute;left:0;top:0;bottom:0;right:75%;}
.right-area{position:absolute;left:75%;top:0;bottom:0;right:0;}

.go-page-input{width:50px;border:1px solid #333;text-align:center;}

.like-user{
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #fff;
    background: #000;
}

.back{
    padding:0.5rem;
}

.big-photo{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #000;
    img{
        max-width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}
.photo-list{
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    .small{
        width:33vw;
        height:33vw;
        margin-bottom: 1vw;
    }
}
</style>
