<template>
	<view class="details">
		<!-- 商品图片 start -->
		<swiper 
		    :indicator-dots="true" 
			:autoplay="true"
			:interval="3000" 
			:duration="1000">
			
			<swiper-item>
				<view class="swiper-item">
					<image class="sw-img" :src="details.imgUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 商品图片 end -->
		
		<!-- 商品描述 start -->
		<view class="details-goods">
			<view class="pprice">￥{{details.pprice}}</view>
			<view class="oprice">￥{{details.oprice}}</view>
			<view class="goods-name">{{details.name}}</view>
		</view>
		<!-- 商品描述 end -->
		
		<!-- 商品详情 start -->
		<view>
			<view>
				<image class="details-img" src="../../static/img/lty.jpg" mode=""></image>
			</view>
			<view>
				<image class="details-img" src="../../static/img/lty.jpg" mode=""></image>
			</view>
			<view>
				<image class="details-img" src="../../static/img/lty.jpg" mode=""></image>
			</view>
			<view>
				<image class="details-img" src="../../static/img/lty.jpg" mode=""></image>
			</view>
			<view>
				<image class="details-img" src="../../static/img/lty.jpg" mode=""></image>
			</view>
		</view>
		<!-- 商品详情 end -->
		
		<card cardTitle="看了又看"></card>
		<comodity-list :dataList="dataList"></comodity-list>
		
		<!-- 底部导航栏 start -->
		<view class="bottom-nav">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="iconfont icon-gouwuche" @tap="goCart"></view>
			<view class="add-shop-card" @tap="showPopings">加入购物车</view>
			<view class="shop-active" @tap="showPopings">立即购买</view>
		</view>
		<!-- 底部导航栏 end -->
		
		<!-- 底部弹出层 start -->
		<view class="popping" v-if="showPoping" @touchmove.stop.prevent = ''>
			<view class="pop-mask" @tap="hiddenPoping"></view>
			<view class="pop-box" :animation="animationData">
				
				<view class="img-box">
					<!-- <image class="po-img" src="../../static/img/mj.jpg" mode=""></image> -->
					<image class="po-img" :src="details.imgUrl" mode=""></image>
				</view>
				
				<view class="pop-shop">
					<view>购买数量</view>
					<uni-number-box 
					    :min="num" 
						:value="goodsNum"
						@change="changeNum">
					</uni-number-box>
				</view>
				
				<view class="pop-text" @tap="pushCart">确定</view>
			</view>
		</view>
		<!-- 底部弹出层 end -->
		
	</view>
	
</template>

<script>
	
	import $http from '@/common/request/index.js'
	import card from "@/components/common/card.vue"
	import comodityList from "@/components/common/comodityList.vue"
	import UniNumberBox from '@/components/uni/uni-number-box/uni-number-box.vue'
	import {mapMutations,mapState} from "vuex"
	
	export default {
		data() {
			return {
				swiperList:[
					{
						id:1,
						imgUrl:"../../static/img/ys.jpg"
					},
					{
						id:2,
						imgUrl:"../../static/img/mj.jpg"
					},
					{
						id:3,
						imgUrl:"../../static/img/lty.jpg"
					}
				],
				dataList:[
					{
						id:"1",
						imgUrl:"../../static/img/ys.jpg",
						name:"大衣绒毛爆款,冬季穿搭必备",
						pprice:"499",
						oprice:"4999",
						discount:"1.0折",
					},
					{
						id:"2",
						imgUrl:"../../static/img/lty.jpg",
						name:"大衣绒毛爆款,冬季穿搭必备",
						pprice:"499",
						oprice:"4999",
						discount:"1.0",
					},
					{
						id:"3",
						imgUrl:"../../static/img/mj.jpg",
						name:"大衣绒毛爆款,冬季穿搭必备",
						pprice:"499",
						oprice:"4999",
						discount:"1.0折",
					},
					],
					
				showPoping:false,
				// 动画
				animationData: {},
				num:1,
				details:{},
				goodsNum:1,
			}
		},
		components:{
			card,
			comodityList,
			UniNumberBox,
		},
		onBackPress() {
			if(this.showPoping){
				this.hiddenPoping()
				return true
			}
		},
		computed:{
			...mapState({
				userInfo:state=>state.user.userInfo,
			})
		},
		onLoad(e) {
			this.getList(e.id)
		},
		
		// 点击分享
		onNavigationBarButtonTap(e) {
			if(e.type === 'share'){
				uni.share({
					"provider":"weixin",
					"type":"0",
					"scene":"WXSceneSession",
					"title":this.details.name,
					"href":"http://172.20.10.7:3000/#/pages/details/details?id=" + this.details.id,
					"imageUrl":this.details.imgUrl,
					success: (res) => {
						uni.showTabBar({
							title:"分享成功"
						})
					},
					fail: (err) => {
						console.log(err);
					}
				})
			}
		},
		
		methods: {
			
			// 获取数据
			getList(id){
				$http.request({
					url:`/goods/id`,
					data:{
						id
					}
				}).then(res=>{
					const {code, data} = res
					if(code === 0 ){
						this.details = data[0]
					}
				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
			
	
			
			
			// 立即购买
			showPopings(){
				// this.showPoping = true
				
				var animation = uni.createAnimation({
				      duration: 200,
				})
				
				animation.translateY(600).step()
				this.animationData = animation.export()
				
				setTimeout(()=>{
					animation.translateY(0).step()
					this.animationData = animation.export()
				},200)
					
					
				this.showPoping = true
			},
			
			hiddenPoping(){
				var animation = uni.createAnimation({
				      duration: 200,
				})
				
				animation.translateY(600).step()
				this.animationData = animation.export()
				
				setTimeout(()=>{
					animation.translateY(0).step()
					this.showPoping = false
				},200)
			},
			
			// 改变商品数量
			changeNum(e){
				this.goodsNum = e
			},
			
			// 跳转到购物车
			goCart(){
				uni.navigateTo({
					url:"../cart/cart"
				})
			},
			
			...mapMutations(['addCart']),
			
			// 确认加入 购物车
			pushCart(){
				let goods = this.details
				this.details['checked'] = false
				this.details['num'] = this.goodsNum
				
				this.addCartGoods(goods)
			},
			
			addCartGoods(goods){
				$http.request({
					url:'/addShopCart',
					method:"POST",
					header:{
						token:true
					},
					data:{
						...goods,
						userId:this.userInfo.id
					}
				}).then(res=>{
					if(res.code === 0){
						
						this.addCart(goods)
						
						this.hiddenPoping()
						uni.showToast({
							title:"成功加入购物车",
							icon:"none"
						})
					}
				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.details{
		padding-bottom: 90rpx;
		
		// 商品图片
		swiper{
			width: 100%;
			height: 700rpx;
			
			.sw-img{
				width: 100%;
				height: 700rpx;
			}
		}
		
		// 商品描述
		.details-goods{
			text-align: center;
			font-weight: bold;
			font-size: 36rpx;
			padding: 10rpx 0;
		}
		
		// 商品详情
		.details-img{
			width: 100%;
		}
		
		// 底部导航栏
		.bottom-nav{
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 90rpx;
			background-color: #fff;
			
			.iconfont{
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				background-color: #000;
				color: #fff;
				margin: 0 10rpx;
				text-align: center;
				line-height: 60rpx;
			}
			
			.add-shop-card{
				margin: 0 40rpx;
				padding: 6rpx 30rpx;
				background-color: #000;
				color: #fff;
				border-radius: 40rpx;
			}
			
			.shop-active{
				margin: 0 40rpx;
				padding: 6rpx 30rpx;
				background-color: #49bdfb;
				color: #fff;
				border-radius: 40rpx;
			}
		}
		
		// 底部弹出层
		.popping{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 99999;
			
			.pop-mask{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.3);
			}
			
			.pop-box{
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 460rpx;
				background-color: #f5f5f5;
				
				.img-box{
					width: 100%;
					height: 260rpx;
					position: relative;
					
					.po-img{
						width: 260rpx;
						height: 260rpx;
					}
				}
				
				.pop-shop{
					padding: 20rpx;
					display: flex;
					justify-content: space-between;
				}
				
				.pop-text{
					line-height: 80rpx;
					background-color: #49bdfb;
					color: #fff;
					text-align: center;
					// margin-bottom: 90rpx;
				}
			}
		}
	}
</style>
