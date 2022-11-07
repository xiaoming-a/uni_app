<template>
	<view class="comodittyList">
		<!-- 商品 -->
		<commodity :dataList="dataList"></commodity>
	</view>
</template>

<script>
	
	import commodity from "@/components/common/commodity.vue"
	
	export default{
		name:"comodityList",
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
</style>