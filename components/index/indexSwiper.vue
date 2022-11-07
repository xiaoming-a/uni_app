<template>
	<view class="index-swiper">
		<swiper class="swiper-boxs" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in dataList" :key="item.id">
				<view class="swiper-item">
					<image class="swiper-img" :src="item.imgUrl">
				</view>
			</swiper-item>
			
		</swiper>
	</view>
</template>

<script>
	export default {
		name :"indexSwiper",
		props:{
			dataList:{
				type:Array,
				default: () => []
			},
		},
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	
    .swiper-boxs{
		width: 100%;
		height: 400rpx;
	}
	
	.swiper-img{
		width: 100%;
		height: 400rpx;
	}
</style>