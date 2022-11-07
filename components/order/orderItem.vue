<template>
	<view class="order-item">
		<view class="goods-content">
			<view class="content-img-box">
				<image class="content-img" :src="dataItem.imgUrl" mode=""></image>
			</view>
			<view class="content-con">
				<view class="content-con-item">{{dataItem.name}}</view>
				<view class="content-con-item f-color">颜色分类:{{dataItem.attrs}}</view>
				<view class="content-con-item f-ative-color">{{dataItem.tip}}</view>
			</view>
			<view class="content-price f-ative-color">
				<view class="price-con">￥{{dataItem.pprice}}</view>
				<view class="price-con">*{{dataItem.num}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props:{
			dataItem:{
				type:Object,
				default: ()=> ''
			},
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.order-item{
		
		.goods-content{
			width: 100%;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 20rpx;
			
			
			.content-img-box{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				
				.content-img{
					width: 160rpx;
					height: 160rpx;
				}
			}
			
			.content-con{
				flex: 3;
				padding: 10rpx 0 10rpx 20rpx;
				
				.content-con-item{
					height: 33%;
					display: -webkit-box;
					-webkit-box-orient:vertical;
					text-overflow: ellipsis;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;//表明是2行文本显示省略号，换成3则表明是3行文本显示省略号
					-webkit-box-orient: vertical;
					font-size: 28rpx;
					
					&:nth-child(2),
					&:nth-child(3){
						height: 33%;
						display: -webkit-box;
						-webkit-box-orient:vertical;
						text-overflow: ellipsis;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;//表明是2行文本显示省略号，换成3则表明是3行文本显示省略号
						-webkit-box-orient: vertical;
					}
				}
			}
			
			.content-price{
				height: 200rpx;
				flex: 2;
				
				.price-con{
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
				}
			}
		}
	}
</style>