

export default {
	set: function (name, value, days) {
		var d = new Date;
		var days = days || 365;
		d.setTime(d.getTime() + 24*60*60*1000*days);
		window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
	},

	get: function (name) {
		var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		return v ? v[2] : '';
	},

	del: function (name) {
		this.set(name, '', -1);
	}
}
