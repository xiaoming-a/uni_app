<template>
	<view class="my-config">
		
		<view class="item-list">
			
			<view class="my-config-item" @tap="goPath">
				<view>地址管理</view>
				<view class="iconfont icon-xiangyoujiantou list-text"></view>
			</view>
			
			<view class="my-config-item">
				<view>地址管理</view>
				<view class="iconfont icon-xiangyoujiantou list-text"></view>
			</view>
			
			<view class="my-config-item">
				<view>地址管理</view>
				<view class="iconfont icon-xiangyoujiantou list-text"></view>
			</view>
			
			<view class="my-config-item">
				<view>地址管理</view>
				<view class="iconfont icon-xiangyoujiantou list-text"></view>
			</view>
			
		</view>
		
		<view class="my-config-text" @tap="outLogin">退出</view>
	</view>
</template>

<script>
	
	import {mapMutations} from "vuex"
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['loginOut']),
			outLogin(){
				uni.showToast({
					title:"退出成功",
					icon:"none"
				})
				this.loginOut()
				uni.reLaunch({
					url:"../index/index"
				})
			},
			
			// 跳转 地址管理页面
			goPath(){
				uni.navigateTo({
					url:"../myPathList/myPathList"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-config{
		
		.item-list{
			margin: 20rpx 0;
			padding: 0 20rpx;
			
			.my-config-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				font-size: 28rpx;
				border-bottom: 2rpx solid #ccc;
				
				.list-text{
					font-size: 24rpx;
				}
			}
		}
		
		.my-config-text{
			background-color: #49bdfb;
			width: 100%;
			line-height: 88rpx;
			text-align: center;
			color: #fff;
		}
	}
</style>
