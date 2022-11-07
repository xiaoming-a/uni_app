<template>
	<view class="shop">
		<view class="shop-item" v-for="item in dataList" :key="item.id">
			<view class="shop-big">
				<image class="shop-big" :src="item.bigUrl" mode=""></image>
			</view>
			<view class="scroll-box">
				<scroll-view scroll-x="true" class="scroll-content">
					<view class="scroll-item">
						<commodity 
						:dataList="item.data" 
						itemWidth="250rpx" 
						imgHeight="250rpx" 
						isWrap="nowrap"
						nameSize="20rpx"
						>
						</commodity>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import commodity from "@/components/common/commodity.vue"
	
	export default{
		name:"shop",
		data(){
			return{}
		},
		props:{
			dataList:{
				type:Array,
				default: () => []
			},
		},
		components:{
			commodity
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.shop{
		
		.shop-item{
			
			.shop-big{
				width: 100%;
				height: 275rpx;
			}
			
			.scroll-box{
				
				.scroll-content{
					width: 100%;
					white-space: nowrap;
					
					.scroll-item{
						display: inline-block;
						width: 300rpx;
					}
				}
			}
			
		}
	}
</style>