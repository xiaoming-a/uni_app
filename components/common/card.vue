<template>
	<view class="card">
		<view>-</view>
		<slot>
			<view class="card-text">
				{{cardTitle}}
			</view>
		</slot>
		<view>-</view>
	</view>
</template>

<script>
	export default{
		name:"card",
		props:{
			cardTitle:{
				type:String,
				default:"猜你喜欢",
			},
		},
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.card{
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight:bold;
		
		.card-text{
			padding: 0 20rpx;
			font-size: 32rpx;
		}
	}
</style>