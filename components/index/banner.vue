<template>
	<view class="banner">
		<image class="banner-img" :src="imgUrl" mode=""></image>
	</view>
</template>

<script>
	export default{
		name:"banner",
		data(){
			return{}
		},
		props:{
			imgUrl:{
				type:String,
				default: ()=> ''
			}
		},
		methods:{}
	}
</script>

<style scoped lang="scss">
	.banner{
		width: 100%;
		height: 300rpx;
		
		.banner-img{
			width: 100%;
			height: 100%;
		}
	}
	
</style>