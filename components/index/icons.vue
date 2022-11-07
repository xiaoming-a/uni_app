<template>
	<view class="icons">
		<view class="icons-item" v-for="(item,index) in dataList" :key="item.id">
			<image class="icons-img" :src="item.imgUrl" mode=""></image>
			<text class="icons-text f-color">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		name:"icons",
		data(){
			return{}
		},
		props:{
			dataList:{
				type:Array,
				default: () => []
			},
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	
	.icons{
		display: flex;
		flex-wrap: wrap;
		
		.icons-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-items: center;
			width: 25%;
			padding-top: 20rpx;
			
			.icons-img{
				width: 110rpx;
				height: 110rpx;
			}
			
			.icons-text{
				font-size: 28rpx;
			}
		}
	}
	
</style>