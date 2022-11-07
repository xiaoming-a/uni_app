<template>
	<view class="recommend bg-color">
		<view class="recommend-item" v-for="item in dataList" :key="item.id">
			<image class="item-big" :src="item.bigUrl" mode=""></image>
			<view class="item-small">
				<block 
				v-for="item2 in item.data"
				:key="item2.id">
					<image class="item-small-img" :src="item2.imgUrl" mode=""></image>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"recommend",
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
	.recommend{
		padding: 20rpx;
		
		.recommend-item{
			display: flex;
			flex-direction: column;
			border-radius: 20rpx;
			border: 2rpx solid #ccc;
			overflow: hidden;
			margin: 20rpx;
			
			.item-big{
				width: 100%;
				height: 300rpx;
			}
			
			.item-small{
				width: 100%;
				height: 240rpx;
				
				.item-small-img{
					width: 33.33%;
					height: 240rpx;
				}
			}
		}
	}
</style>