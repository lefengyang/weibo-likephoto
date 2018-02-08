<template>
  <div class="hello">
    <h1>更新Gsid</h1>
	<input class="search-name" type="text" v-model="gsid" placeholder="微博GSID">
    <div @click="update()" class="btn">更新</div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            gsid: ''
        }
    },
    created() {
		var _this = this;
		var cql = 'select * from gsid limit 1';
		AV.Query.doCloudQuery(cql).then(data => {
			var results = data.results;
			for(var i in results){
				var gsid = results[i]['attributes']['gsidstr'];
				_this.gsid = gsid;
			}
		});
    },
    methods: {
        update() {
            var query = new AV.Query('gsid');
			query.get('5a7c0ac3fe88c200382db591').then((data) => {
				data.set('gsidstr', this.gsid);
				data.save();
			}).then(() => {
				this.$router.push({path:'/'})
			});
        }
    }
}
</script>

<style scoped>
.clr:after,.wrap:after{content:".";clear:both;display:block;height:0;visibility:hidden;}
.clr,.wrap{zoom:1;}

h1 {
    font-weight: normal;
    font-size: 1.4rem;
    padding: 1rem;
}

.search-name{
    margin-left: 1rem;
    border: 1px solid #efefef;
    padding: 0.5rem;
    width: 14rem;
}

.btn{
    border:1px solid #efefef;
    color:#fff;
    background-color:#ff8420;
    border-radius:10px;
    padding:0.5rem 1rem;
    display: inline-block;
}
</style>
