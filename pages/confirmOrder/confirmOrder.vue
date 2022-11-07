<template>
	<view class="confirm-order default-bg-color">
		<lines />
		<!-- 收货地址 start -->
		<view class="order-map" @tap="goPath">
			<template v-if="path">
				<view class="map-left">
					<view class="order-map-content">
						<view class="con-name">收件人：{{path.name}}</view>
						<view class="con-tel">{{path.tel}}</view>
					</view>
					<view class="order-address">
						收货地址：{{path.city}} {{path.details}}
					</view>
				</view>
				<view class="map-right">></view>
			</template>
			<template v-else>
				<view class="con-name">请选择地址</view>
			</template>
		</view>
		<!-- 收货地址 end -->
		
		<!-- 商品 start -->
		<view class="good-list">
			<view 
			class="goods-content"
			v-for="(item,index) in goodsItems"
			:key="item.id">
				<view class="content-img-box">
					<image class="content-img" :src="item.imgUrl" mode=""></image>
				</view>
				<view class="content-con">
					<view class="content-con-item">{{item.name}}</view>
					<view class="content-con-item f-color">{{item.color?item.color:''}}</view>
					<view class="content-con-item f-ative-color">七天无理由退货</view>
				</view>
				<view class="content-price f-ative-color">
					<view class="price-con">￥{{item.price}}</view>
					<view class="price-con">*{{item.num}}</view>
				</view>
			</view>
		</view>
		<!-- 商品 end -->
		
		<!-- 底部 start -->
		<view class="order-foot">
			<view class="summation">
				合计：
				<text class="f-ative-color">￥{{totalCount.price}}</text>
			</view>
			<view class="sub" @tap="subPay">提交订单</view>
		</view>
		<!-- 底部 end -->
	</view>
</template>

<script>
	
	import lines from '@/components/common/lines.vue'
	import { mapGetters,mapState,mapMutations } from "vuex"
	import $http from '@/common/request/index.js'
	
	export default {
		data() {
			return {
				path:false,
				goodsIdList:[],
				goodsList:[]
			}
		},
		components:{
			lines,
		},
		computed:{
			...mapGetters(['defaultPath','totalCount']),
			...mapState({
				dataList:state => state.cart.dataList,
				userInfo:state=>state.user.userInfo,
				orderNum:state=>state.order.orderNum,
				selectList:state => state.cart.selectList,
			}),
			
			goodsItems(){
				return this.goodsIdList.map(item=>{
					return this.dataList.find(v=>v.id === item)
				})
			},
			
		},
		onLoad(e) {
			
			uni.$on('selectPathItem',(res)=>{
				this.path = res
			})
			
			this.goodsIdList = JSON.parse(e.goods)
			
			this.getPath()
		},
		onUnload() {
			uni.$off('selectPathItem',(res)=>{
				console.log('移除');
			})
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
					
					if(this.defaultPath.length){
						this.path = this.defaultPath[0]
					}
					
				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none',
					})
				})
					
			},
			
			// 跳转到地址管理
			goPath(){
				uni.navigateTo({
					url:`../myPathList/myPathList?type=selectPath`
				})
			},
			
			// 选择支付方式
			subPay(){
				if(!this.path){
					uni.showToast({
						title:"请选择收货地址",
						icon:"none"
					})
				}
				
				$http.request({
					url:'/addPay',
					method:"POST",
					header:{
						token:true
					}, 
					data:{
						userId:this.userInfo.id, 
						orderId:this.orderNum,
						selectList:this.selectList
					}
				}).then(res=>{
					if(res.code === 0){ 
						uni.navigateTo({
							url:"../paymont/paymont?details=" + JSON.stringify({
								price: this.totalCount.price
							}) 
						})  
					}
				}).catch(err=>{
					uni.showToast({
						
						title:'请求失败',
						icon:'none',
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.confirm-order{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		
		.order-map{
			background-color: #fff;
			line-height: 40rpx;
			padding: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.map-left{
				flex: 11;
				.order-map-content{
					display: flex;
					justify-content: space-between;
					
					.con-name{
						font-weight: bold;
					}
				}
				
				.order-address{
					white-space: nowrap;
					text-overflow: ellipsis;
				    overflow: hidden;
					word-break: break-all;
				}
			}
			
			.map-right{
				flex: 1;
				text-align: center;
				font-size: 50rpx;
				color: #d9d9d9;
			}
		}
		
		.good-list{
			background-color: #fff;
			padding: 0 10rpx;
			
			.goods-content{
				width: 100%;
				height: 200rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 20rpx;
				padding: 0 20rpx;
				
				
				.content-img-box{
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					
					.content-img{
						width: 160rpx;
						height: 160rpx;
					}
				}
				
				.content-con{
					flex: 3;
					padding: 10rpx 0 10rpx 20rpx;
					
					.content-con-item{
						height: 33%;
						display: -webkit-box;
						-webkit-box-orient:vertical;
						text-overflow: ellipsis;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;//表明是2行文本显示省略号，换成3则表明是3行文本显示省略号
						-webkit-box-orient: vertical;
						font-size: 28rpx;
						
						&:nth-child(2),
						&:nth-child(3){
							height: 33%;
							display: -webkit-box;
							-webkit-box-orient:vertical;
							text-overflow: ellipsis;
							overflow : hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;//表明是2行文本显示省略号，换成3则表明是3行文本显示省略号
							-webkit-box-orient: vertical;
						}
					}
				}
				
				.content-price{
					height: 200rpx;
					flex: 2;
					
					.price-con{
						width: 100%;
						height: 100rpx;
						line-height: 100rpx;
						text-align: center;
					}
				}
			}
		}
		
		.order-foot{
			width: 100%;
			height: 80rpx;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #fff;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			
			.summation{
				padding: 20rpx;
			}
			
			.sub{
				color: #fff;
				background-color: #49bdfb;
				padding: 20rpx 30rpx;
			}
		}
	}
</style>
