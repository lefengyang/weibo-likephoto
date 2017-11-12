import axios from 'axios'
import db from './indexeddb'
import db_u from './indexeddb_user'


Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S+": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

axios.defaults.timeout = 10000;

export function fetchGet(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var gsid = '_2A253ArP0DeTxGedG7FUR8yrIzjmIHXVVkN_hrDV6PUJbkdANLUbCkWp-f5wpaeSszG3ckfmEanQfD1Lfmw..';

export default {
    //搜索用户
    Search(name) {
        var fid = encodeURIComponent('100303type=3&q='+name+'&t=3');
        var url = 'https://api.weibo.cn/2/cardlist?networktype=wifi&uicode=10000003&moduleID=708&featurecode=10000085&wb_version=3472&c=android&i=373870b&s=ec1d46da&ft=0&ua=Xiaomi-Redmi%20Note%204X__weibo__7.10.0__android__android6.0.1&wm=20005_0002&aid=01ArjpCveqntRDwMarzTzwFs_0Auw-9edgqvNj2HJe5wcWxlU.&fid='+fid+'&uid=1877034455&v_f=2&v_p=53&from=107A095010&gsid='+gsid+'&imsi=460013080513158&lang=zh_CN&lfid=231091&page=1&skin=default&count=10&oldwm=20005_0002&sflag=1&containerid='+fid+'&luicode=10000010&need_head_cards=0';
        return fetchGet('http://www.piggogo.com/proxy.php?type=json&url='+encodeURIComponent(url));
    },

    //加载点赞相册
    LoadPhotoPage(uid, page) {
        var url = 'https://api.weibo.cn/2/container?networktype=wifi&uicode=10000012&moduleID=700&featurecode=10000085&wb_version=3472&c=android&i=373870b&s=ec1d46da&ft=0&ua=Xiaomi-Redmi Note 4X__weibo__7.10.0__android__android6.0.1&wm=20005_0002&aid=01ArjpCveqntRDwMarzTzwFs_0Auw-9edgqvNj2HJe5wcWxlU.&fid=107803'+uid+'_-_photolike&v_f=2&v_p=53&from=107A095010&gsid='+gsid+'&lang=zh_CN&lfid=230283'+uid+'&page='+page+'&skin=default&count=24&oldwm=20005_0002&sflag=1&containerid=107803'+uid+'_-_photolike&luicode=10000198';
        return fetchGet('http://www.piggogo.com/proxy.php?type=json&url='+encodeURIComponent(url));
    },

    //点赞用户列表
    LikeUser(mid, page) {
        var url = 'https://api.weibo.cn/2/like/show?networktype=wifi&uicode=10000002&moduleID=700&featurecode=10000085&wb_version=3472&c=android&i=373870b&s=ec1d46da&ft=0&id='+mid+'&ua=Xiaomi-Redmi%20Note%204X__weibo__7.10.0__android__android6.0.1&wm=20005_0002&aid=01ArjpCveqntRDwMarzTzwFs_0Auw-9edgqvNj2HJe5wcWxlU.&v_f=2&v_p=53&from=107A095010&gsid='+gsid+'&lang=zh_CN&page='+page+'&skin=default&type=0&count=50&oldwm=20005_0002&sflag=1&luicode=10000074&filter_by_author=0&filter_by_source=0';
        return fetchGet('http://www.piggogo.com/proxy.php?type=json&url='+encodeURIComponent(url));
    },

    //查看用户，则加到本地数据库
    addUser(uid, name){
        var d_str = new Date().Format('yyyy-MM-dd HH:mm:ss');
        db_u.save({uid:uid,name:name,last:d_str});
    },

    //删除用户
    delUser(uid){
        db_u.delete(uid);
    },

    //读取用户
    getUser(){
        return new Promise((resolve, reject) => {
            db_u.getAll(data => {
                data.sort(function(a, b){
                    if(!a.last)return 1;
                    if(!b.last)return -1;
                    return b.last.replace(/[- :]/g,'') - a.last.replace(/[- :]/g,'');
                });
                resolve(data);
            });
        });
    },

    //查看大图，则加到本地数据库
    addPhoto(url, mid){
        db.save({url:url,mid:mid?mid:''});
    },

    //读取本地数据库
    getPhotoList(page){
        return new Promise((resolve, reject) => {
            db.getPage(page, data => {
                var arr = [];
                for(var i in data){
                    arr.push({url:data[i]['url'],mid:data[i]['mid']});
                }
                resolve(arr);
            });
        });
    }

}


