<template>
	<view class="cart">
		<template v-if="dataList.length > 0">
			<!-- 自定义导航 -->
			<uni-nav-bar 
			    title="购物车" 
			    fixed="true"
			    statusBar="true"
				:rightText="isRightClick? '完成': '编辑'"
				@clickRight="clickRight">
			</uni-nav-bar>
			
			<!-- 内容 -->
			<view class="cart-list">
				<view 
				    class="list-item" 
				    v-for="(item,index) in dataList"
					:key="item.id"
				>
					<label class="radio" @tap="selectItem(index)">
						<radio value="" color="#ff3333" :checked="item.checked"></radio><text></text>
					</label>
					<image class="list-img" :src="item.imgUrl" mode=""></image>
					<view class="item-con">
						<view class="list-name">{{item.name}}</view>
						<view class="list-color f-color">{{item.color}}</view>
						<view class="list-price">
							<view>￥ {{item.price}}</view>
							
							<template v-if="!isRightClick">
								<view>* {{item.num}}</view>
							</template>
							
							<template v-else>
								<uni-number-box
								:value="item.num"
								:min="minNum"
								@change="changeNum($event,index,item.id)">
								</uni-number-box>
							</template>

							
						</view>
					</view>
				</view>
			</view>
				
			<!-- 底部结算 -->
			<view class="cart-foot">
				<label class="radio foot-radio" @tap="checkedAll">
					<radio value="" color="#ff3333" :checked="isChecked"></radio><text>全选</text>
				</label>
				
				<template v-if="!isRightClick">
					<view class="foot-box">
						<view class="foot-price">合计：<text class="f-ative-color">￥{{totalCount.price}}</text></view>
						<view class="foot-clear" @tap="goConfrim">结算（{{totalCount.num}}）</view>
					</view>
				</template>
				
				<template v-else>
					<view class="foot-box">
						<view class="foot-clear" style="background-color: black;color: #fff;">移入收藏夹</view>
						<view class="foot-clear" @tap="delectGoods">删除</view>
					</view>
				</template>
				
				
			</view>
		</template>
		
		<template v-else>
			<!-- 自定义导航 -->
			<uni-nav-bar 
			    title="购物车" 
				fixed="true"
				statusBar="true">
				</uni-nav-bar>
			<view class="cart-else-list">
				<text>囧~ 购物车为空</text>
			</view>
		</template>
		
		<!-- tabbar -->
		<tabbar cureentPage="cart"></tabbar>
		
	</view>
</template>

<script>
	import UniNumberBox from '@/components/uni/uni-number-box/uni-number-box.vue'
	import UniNavBar from "@/components/uni/uni-nav-bar/uni-nav-bar.vue"
	import { mapState, mapActions,mapGetters,mapMutations } from "vuex"
	import tabbar from "@/components/common/Tabbar.vue"
	import $http from '@/common/request/index.js'
	
	export default {
		data() {
			return {
				isRightClick:false,
				minNum:1
			};
		},
		components:{
			UniNavBar,
			UniNumberBox,
			tabbar
		},
		computed:{
			...mapState({
				dataList:state => state.cart.dataList,
				userInfo:state=>state.user.userInfo,
				selectList:state => state.cart.selectList,
			}),
			
			...mapGetters(['isChecked','totalCount'])
		},
		onShow() {
			this.getShopGoods()
		},
		methods:{
			// 全选
			...mapActions(['checkedAll','delectGoods']),
			
			...mapMutations(['selectItem','initGetCart','initOrder']),
		
			// 获取商品
			getShopGoods(){
				$http.request({
					url:'/selectShopCart',
					method:"POST",
					header:{
						token:true
					},
					data:{
						userId:this.userInfo.id
					}
				}).then(res=>{
					if(res.code === 0){
						this.initGetCart(res.data)
					}
				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
	
			clickRight(){
				this.isRightClick = !this.isRightClick
			},
			
			// 编辑下 增加或减少 物品
		    changeNum(e,index,id){
				console.log(id);
				$http.request({
					url:'/changeGoodsNum',
					method:"POST",
					header:{
						token:true
					},
					data:{
						id:id,
						num:e
					}
				}).then(res=>{
					if(res.success){
						this.dataList[index].num = e
					}
				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
			// 跳转到 结算页面
			goConfrim(){
				if(this.selectList.length === 0){
					uni.showToast({
						icon:'none',
						title:"最少选择一件商品"
					})
					return
				}
				
				let newList = []
				
				for (let i = 0; i < this.selectList.length; i++) {
					for (let j = 0; j < this.dataList.length; j++) {
						if(this.selectList[i] === this.dataList[j].id){
							newList.push(this.dataList[j])
						}
					}
				} 
			
				$http.request({
					url:'/orderList',
					method:"POST",
					header:{ 
						token:true
					}, 
					data:{
						goodsList:newList,
						userId:this.userInfo.id 
					}
				}).then(res=>{
					if(res.code === 0){
						this.initOrder(res.data.orderId)
						uni.navigateTo({
							url:`../confirmOrder/confirmOrder?goods= ${JSON.stringify(this.selectList)}`
						})
					}
				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					}) 
				})
			},

		}
	} 
</script>

<style lang="scss" scoped>
	.cart{
		
		.cart-list{
			padding-bottom: 100rpx;

			.list-item{
				display: flex;
				padding: 20rpx;
				align-items: center;
				background-color: #f7f7f7;
				margin-bottom: 10rpx;
				
				.list-img{
					width: 200rpx;
					height: 200rpx;
				}
				
				.list-color{
					font-size: 24rpx;
				}
				
				.item-con{
					flex: 1;
					padding-left: 20rpx;
					
					.list-price{
						display: flex;
						justify-content: space-between;
					}
				}
				
				
			}
		}
		
		.cart-else-list{
			background-color: #f7f7f7;
			position: absolute;
			left: 0;
			bottom: 0;
			top: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		
		.cart-foot{
			position: fixed;
			bottom: 120rpx;
			right: 0;
			left: 0;
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-top: 2rpx solid #f7f7f7;
			
			.foot-radio{
				padding-left: 20rpx;
			}
			
			.foot-box{
				display: flex;
				
				.foot-price{
					line-height: 100rpx;
					padding: 0 20rpx;
					font-size: 32rpx;
				}
				
				.foot-clear{
					background-color: #49bdfb;
					padding: 0rpx 60rpx;
					line-height: 100rpx;
				}
			}
		}
	}
</style>
