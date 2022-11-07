<template>
	<view class="mine">
		<!-- 头部 start -->
		<view class="mine-header" 
		style="background: url('../../static/img/ys.jpg') no-repeat;">
			<view class="header-box">
				<view class="header-main" @tap="goConfig">
					<image class="main-img" src="../../static/img/sz.png" mode=""></image>
				</view>
				
				<view class="header-logo">
					<image class="logo-img" :src="loginStatus?userInfo.imgUrl:'../../static/img/mj.jpg'" mode=""></image>
					<view class="img-name">
						{{ loginStatus ? userInfo.nickName : "用户昵称" }}
					</view>
				</view>
			</view>
		</view>
		
		<!-- 订单 start -->
		<view class="order">
			<view class="order-header">
				<view class="left-text">我的订单</view>
				<view class="icon-text" @tap="goOrder">
					<view class="box-left-text">全部订单</view>
					<view class="iconfont icon-xiangyoujiantou box-right-icon"></view>
				</view>
			</view>
			<view class="order-list">
				<view class="list-item" v-for="(item,index) in bannerList" :key="item.id">
					<image class="item-img" :src="item.imgUrl" mode=""></image>
					<view class="itme-text">{{item.name}}</view>
				</view>
			</view>
		</view>
		
		<!-- 内容列表 statr -->
		<view class="box-content">
			<view class="con-list-item">
				<view>我的收藏</view>
				<view class="iconfont icon-xiangyoujiantou list-text"></view>
			</view>
		</view>
		
		<!-- tabbar -->
		<tabbar cureentPage="mine"></tabbar>
		
	</view>
</template>

<script>
	
	import { mapState } from "vuex"
	import tabbar from "@/components/common/Tabbar.vue"
	
	export default {
		data() {
			return {
				bannerList:[ 
					{
						id:1,
						imgUrl:"../../static/img/mine/dfk.png",
						name:'待付款'
					},
					{
						id:2,
						imgUrl:"../../static/img/mine/dfh.png",
						name:'待发货'
					},
					{
						id:3,
						imgUrl:"../../static/img/mine/dsh.png",
						name:'待收货'
					},
					{
						id:4,
						imgUrl:"../../static/img/mine/dpj.png",
						name:'待评价'
					},
					{
						id:5,
						imgUrl:"../../static/img/mine/tk.png",
						name:'退款/售后'
					},
				]
			}
		},
		components:{
			tabbar
		},
		
		computed:{
			...mapState({
				loginStatus:state=> state.user.loginStatus,
				userInfo:state=> state.user.userInfo,
			})
		},
		methods: {
			// 跳转页面
			goConfig(){
				uni.navigateTo({
					url:"../myConfig/myConfig"
				})
			},
			
			goOrder(){
				uni.navigateTo({
					url:"../order/order"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mine{
		
		.mine-header{
			width: 100%;
			height: 400rpx;
			
			.header-box{
				position: relative;
				top:120rpx;
				
				.header-main{
					position: absolute;
					left: 20rpx;
					
					.main-img{
						width: 40rpx;
						height: 40rpx;
					}
				}
				
				.header-logo{
					position: absolute;
					width: 120rpx;
					left: 50%;
					margin-left: -60rpx;
					

					.logo-img{
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						border: 2rpx solid #ccc;
						background-color: #fff;
					}
					
					.img-name{
						color: #fff;
						font-size: 28rpx;
						text-align: center;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
		
		.order{
			
			.order-header{
				display: flex;
				padding: 20rpx;
				justify-content: space-between;
				
				.left-text{
					font-size: 28rpx;
					font-weight: bold;
				}
				
				.icon-text{
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24rpx;
					
					
					.box-right-icon{
						font-size: 20rpx;
						margin-left: 5rpx;
					}
				}
			}
			
			.order-list{
				display: flex;
				padding: 20rpx;
				
				.list-item{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
					.item-img{
						width: 66rpx;
						height: 66rpx;
					}
					
					.itme-text{
						font-size: 24rpx;
						margin-top: 10rpx;
					}
				}
			}
		}
		
		.box-content{
			margin: 20rpx 0;
			padding: 0 20rpx;
			
			.con-list-item{
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
	}
	
	
</style>
