<template>
	<view class="my-path-list">
		<view 
		  v-for="(item,index) in dataList" 
		  :key="index"
		  @tap="choseItem(index)">
			<view 
			class="path-item" 
			@click="goConfirmOrder(item)">
				<view class="path-item-seft">
					<view class="seft-top">
						<view class="top-name">{{item.name}}</view>
						<view class="">{{item.tel}}</view>
					</view>
					
					<view class="seft-bottom">
						<view v-if="(item.isDefault.toString()) === 'true'" class="actives">默认</view>
						<view class="">{{item.city}} {{item.details}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="add-path">
			<view class="path-btn" @tap="goAddPath">新增地址</view>	
		</view>
	</view>
</template>

<script>
	
	import { mapState, mapMutations } from "vuex"
	import $http from '@/common/request/index.js'
 	
	export default {
		data() {
			return {
				isSelect:false
			}
		},
		computed:{
			...mapState({
				dataList:state=>state.path.dataList,
				userInfo:state=>state.user.userInfo,
			})
		},
		onLoad(e) {
			if(e.type === 'selectPath'){
				this.isSelect = true
			}else{
				this.isSelect = false
			}
			
			this.getPath()
		},
		methods: {
			...mapMutations(['initGetAddress']),
			
			// 初始化地址
			getPath(){
				$http.request({
					url:'/selectAddress',
					method:"POST",
					header:{
						token:true
					},
					data:{
						userId:this.userInfo.id
					}
				}).then(res=>{
					this.initGetAddress(res.data)
				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none',
					})
				})
		
			},
			
			// 跳转地址
			goAddPath(){
				uni.navigateTo({
					url:"../addMyPath/addMyPath"
				})
			},
		
			// 修改
			choseItem(index){
				if(!this.isSelect){
					let pathObj = JSON.stringify({
						index:index,
						item:this.dataList[index]
					})
					
					uni.navigateTo({
						url:`../addMyPath/addMyPath?data=${pathObj}`
					})
				}
			},
			
			// 返回确认订单页面
			goConfirmOrder(item){
				// 如果是从确认订单来的 返回订单页面
				if(this.isSelect){
					uni.$emit('selectPathItem',item)
					uni.navigateBack({
						delta:1
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.my-path-list{
		
		.path-item{
			padding-left: 20rpx;
			border-bottom: 2rpx solid #ccc;
			
			
			.path-item-seft{
				padding: 10rpx;
	
				
				.seft-top{
					display: flex;
					
					.top-name{
						margin-right: 10rpx;
					}
				}
				
				.seft-bottom{
					display: flex;
					align-items: center;
					
					.actives{
						padding: 0rpx 12rpx;
						background-color: #49bdfb;
						color: #fff;
						border-radius: 20rpx;
						margin-right: 10rpx;
						font-size: 24rpx;
						text-align: center;
					}
				}
			}
		}
		
		
		.add-path{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 0;
			
			.path-btn{
				border: 2rpx solid #49bdfb;
				color:  #49bdfb;
				border-radius: 30rpx;
				padding: 6rpx 60rpx;
			}
		}
	}
</style>
