<template>
	<view class="icon-banner">
		<view class="icon-banner-item" v-for="(item,index) in dataList" :key="item.id">
			<image class="icon-banner-item-img" :src="item.imgUrl" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default{
		name:"iconBanner",
		data(){
			return{
				
			}
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

<style lang="scss" scoped>
	.icon-banner{
		display: flex;
		flex-wrap: wrap;
		padding: 0 10rpx;
		
		.icon-banner-item{
			width: 24%;
			padding: 0 0.5%;
			
			.icon-banner-item-img{
				width: 100%;
				height: 150rpx;
			}
		}
	}
</style>