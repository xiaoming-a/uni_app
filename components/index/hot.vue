<template>
	<view class="hot">
		<view class="hot-item">
			<commodity :dataList="dataList" itemWidth="250rpx" imgHeight="250rpx"></commodity>
		</view>
	</view>
</template>

<script>
	
	import commodity from "@/components/common/commodity.vue"
		
	export default{
		name:"hot",
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
		methods:{},
	}
</script>

<style lang="scss" scoped>
</style>