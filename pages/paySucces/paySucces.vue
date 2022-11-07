<template>
	<view class="pay-success">
		<view class="f-ative-color pay-text">支付成功</view>
		<view class="go-index f-ative-color" @tap="goIndex">返回首页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 返回首页
			goIndex(){
				uni.switchTab({
					url:"../index/index"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pay-success{
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
		.pay-text{
			font-size: 52rpx;
		}
		
		.go-index{
			margin-top: 10rpx;
			padding: 10rpx 60rpx;
			border: 2rpx solid #49bdfb;
			border-radius: 20rpx;
		}
	}
</style>
