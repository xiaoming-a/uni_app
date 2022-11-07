<template>
	<view class="comodity" :style="{flexWrap: isWrap}">
		<view 
		class="comodity-item" 
		v-for="(item,index) in dataList" 
		:style="{width:`calc(${itemWidth} - 20rpx)`}"
		@tap="goDetails(item.id)"
		:key="item.id">
			<image 
			:style="{height:imgHeight}"
			class="comodity-item-img" 
			:src="item.imgUrl" mode=""></image>
			<view class="comodity-item-content">
				<text class="describe" :style="{fontSize:nameSize}">{{item.name}}</text>
				<view>
					<text class="present-price">￥{{item.pprice}}</text>
				    <text class="original-price">￥{{item.oprice}}</text>
				</view>
				<text class="discount">{{item.discount}} 折</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"comodity",
		props:{
			dataList:{
				type:Array,
				default: () => []
			},
			itemWidth:{
				type:String,
				default: () => "375rpx"
			},
			imgHeight:{
				type:String,
				default: () => "375rpx"
			},
			isWrap:{
				type:String,
				default: () => "wrap"
			},
			nameSize:{
				type:String,
				default: () => "26rpx"
			},
		},
		data(){
			return{
				
			}
		},
		methods:{
			// 跳转商品详情页
			goDetails(id){
				uni.navigateTo({
					url:"/pages/details/details?id=" + id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.comodity{
		display: flex;
		
		.comodity-item{
			padding: 0rpx 10rpx 10rpx 10rpx; 
			
			.comodity-item-img{
				width: 100%;
			}
			
			.comodity-item-content{
				text-align: center;
				
				.describe{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					color: #333;
					padding: 10rpx 20rpx;
				}
				
				.present-price{
					font-size: 24rpx;
					padding: 0 10rpx;
				}
				
				.original-price{
					text-decoration: line-through;
					font-size: 24rpx;
					color: #8b8b8b;
					padding: 0 10rpx;
				}
				
				.discount{
					border-radius: 8rpx;
					border: 2rpx solid #ca0000;
					padding: 2rpx 10rpx;
					font-size: 20rpx;
					color: #ca0000;
				}
			}
		}
	}
</style>