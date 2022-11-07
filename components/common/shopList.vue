<template>
	<view class="shop-list">
	    <view class="shop-list-title f-color">
			
	    	<view class="title-item"
			v-for="(item,index) in shopList.data"
			:key="item.id"
			@tap="changeTap(index)"
			>
	    		<view :class="{sActive:shopList.currentIndex === index }">{{item.name}}</view>
				<view class="shop-icon">
					<view class="iconfont icon-xiangshangjiantou up" :class="{sActive:item.status === 1}"></view>
					<view class="iconfont icon-xiangxiajiantou down" :class="{sActive:item.status === 2}"></view>
				</view>
	    	</view>

	    </view>
		
		<lines></lines>
		
		<comodity-list :dataList ="dataList"></comodity-list>
	</view>
</template>

<script>
	import lines from '@/components/common/lines.vue'
	import comodityList from "@/components/common/comodityList.vue"
	import $http from '@/common/request/index.js'
	
	export default{
		data(){
			return {
				shopList:{
					currentIndex:0,
					data:[
						{
							id:"1",
							name:"价格",
							status:1,
							key:"pprice"
						},
						{
							id:"2",
							name:"折扣",
							status:0,
							key:"oprice"
						},
						{
							id:"3",
							name:"品牌",
							status:0,
							discount:"discount"
						}
					]
				},
				dataList:[]
			}
		},
		props:{
			keyword:{
				type:String,
				default:()=> ''
			}
		},
		components:{
			lines,
			comodityList
		},
		computed:{
			orderBy(){
				let obj = this.shopList.data[this.shopList.currentIndex]
				let val = obj.status === 1 ? 'DESC' : 'ASC'
				return {
					[obj.key]:val
				}
			},
		},
		mounted() {
			this.getList()
		},
		methods:{
			// 改变 筛选条件
			changeTap(index){
				this.getList()
				
				this.shopList.currentIndex = index
				// 索引值
				let iconIndex = this.shopList.currentIndex 
				// 获取索引对象
				let item = this.shopList.data[iconIndex]
				if( iconIndex == index){
					return item.status = item.status === 1 ? 2:1
				}
				
				let newItem = this.shopList.data[index]
				item.status = 0
				
				newItem.status = 1
			},
			
			// 获取搜索商品列表
			getList(){
				$http.request({
					url:'/goods/search',
					data:{
						name:this.keyword,
						...this.orderBy
					}
				}).then(res=>{
					if(res.code === 0){
						this.dataList = res.data
					}
				}).catch(err=>{
					console.log(err);
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.shop-list{
		
		.shop-list-title{
			display: flex;
			
			.title-item{
				flex: 1;
				display: flex;
				height: 80rpx;
				justify-content: center;
				align-items: center;
				
				.shop-icon{
					position: relative;
					margin-left: 10rpx;
					
					.iconfont{
						width: 16rpx;
						height: 8rpx;
						font-size: 24rpx;
					}
					
					.up{
						position: absolute;
						left: 0;
						top:-20rpx,
					}
					
					.down{
						position: absolute;
						left: 0;
						top:-4rpx,
					}
				}
			}
		}
	}
	
	.sActive{
		color: #00aaff !important;
	}
</style>