<template>
	<view class="tab-bar">
		<view 
		@tap="chagePage(item.pagePath)"
		class="tab-container"
		v-for="(item,index) in tabbarList" 
		:key="item.id">
		    <image
			v-if="item.pagePath === cureentPage"
			class="img-box" 
			:src="item.selectedIconPath" 
			
			mode="">
			</image>
			<image 
			v-else
			class="img-box" 
			:src="item.iconPath" 
			mode="">
			</image>
			<view class="text">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
					tabbarList: [
						{
							id:"1",
							text: "首页",
							pagePath: "index",
							iconPath: "/static/tabbar/index.png",
							selectedIconPath: "/static/tabbar/index-active.png"
						},
						{
							id:"2",
							text: "分类",
							pagePath: "category",
							iconPath: "/static/tabbar/category.png",
							selectedIconPath: "/static/tabbar/category-active.png"
						},
						{
							id:"3",
							text: "购物车",
							pagePath: "cart",
							iconPath: "/static/tabbar/cart.png",
							selectedIconPath: "/static/tabbar/cart-active.png"
						},
						{
							id:"4",
							text: "我的",
							pagePath: "mine",
							iconPath: "/static/tabbar/mine.png",
							selectedIconPath: "/static/tabbar/mine-active.png"
						}
					]
			}
		},
		props:{
			cureentPage:{
				type:String,
				default:"index"
			}
		},
		methods:{
			// 切换页面
			chagePage(pagePath){
				if(pagePath === "cart" || pagePath === "mine"){
					this.navigateTo({
						url:`../../pages/${pagePath}/${pagePath}`,
						animationType:"fade-in",
						animationDuration:0
					})
				}else {
					uni.reLaunch({
						url:`../../pages/${pagePath}/${pagePath}`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-bar{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #fff;
		z-index: 9999;
		border-top: 2rpx solid #636263;
		
		.tab-container{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			.img-box{
				width: 40rpx;
				height: 40rpx;
			}
			
			.text {
				font-size: 24rpx;
				padding: 10rpx  0;
			}
		}
		
		
	}
</style>