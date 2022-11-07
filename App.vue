<script>
	export default {
		onLaunch: function() {
			this.$store.commit('initUser')
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("@/common/css/uni.css");
	@import url("@/static/icon/iconfont.css");
	@import url("@/common/css/common.css");
</style>
