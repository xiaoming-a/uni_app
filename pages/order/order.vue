<template>
	<view class="order default-bg-color">
		<lines />
		<!-- 头部 -->
		<view class="order-header">
			<view 
			class="header-item"
			     @tap="choseItem(index)"
			     v-for="(item,index) in tabList"
			     :key="item.id"
			     :class="{active:index === tabIndex}">
			 {{item.name}}
			 </view>
		</view>
		
		<block 
		    v-for="(item,index) in tabList"
			:key="item.id">
			<view v-show="index === tabIndex">
				    <view 
					    v-if="item.list.length > 0"
					    class="order-main"
						:style="{height:componentHeight + 'px'}">
				    	<!-- 商品 start -->
				    	<view 
						    class="order-goods"
							v-for="(item2,index2) in item.list"
							:key="item2.id">
				    		<view class="goods-header">
				    			<view class="goods-left">
				    				<image class="left-img" :src="item2.shopUrl" mode=""></image>
				    				<view class="con-text">{{item2.shopName}}</view>
				    				<view class="right-icon-text iconfont icon-xiaoxi"></view>
				    			</view>
				    			<view class="goods-right f-ative-color">{{item2.status}}</view>
				    			
				    		</view>
				    		
				    		<view 
							    class="goods-con-box"
								v-for="(item3,index3) in item2.goodsItem"
								:key="item3.id">
								
								<order-item :dataItem="item3"></order-item>
				    		</view>
				    		
				    	
				    	    <!-- 总价 -->
				    	    <view class="order-price">
				    	    	订单金额：<text class="f-color">￥{{item2.totalPrice}}</text> （包含运费：{{item2.totalActive}}）
				    	    </view>
				    	    
				    	    <lines/>
				    	    
				    	    <!-- 支付 -->
				    	    <view class="order-pay">
				    			<view class="pay-box f-ative-color">支付</view>
				    		</view>
				    	</view>
				    </view>
					
					<view
					    v-else
					    class="no-main"
					    :style="{height:componentHeight + 'px'}">
						<view class="">你还没有相关订单</view>
						<view class="no-btn">去首页逛逛</view>
					</view>
					
			</view>
		</block>
	</view>
</template>

<script>
	
	import lines from '@/components/common/lines.vue'
	import getClientHeight from "@/common/js/getClientHeight.js"
	import orderItem from "@/components/order/orderItem.vue"
	
	export default {
		data() {
			return {
				tabList:[
					{
						id:"1",
						name:"全部",
						list:[
							{
								id:1,
								status:"待买家支付",
								totalPrice:"299.00",
								totalActive:"0.00",
								shopName:"商家",
								shopUrl:"../../static/img/mj.jpg",
								goodsItem:[
									{
										id:1,
										imgUrl:"../../static/img/ys.jpg",
										name:"轻奢岩板茶台办公室现代简约茶桌椅组合一体接待室高端别墅大茶台",
										attrs:"白色",
										pprice:"299.00",
										num:1,
										tip:"七天无理由退货"
									},
									{
										id:2,
										imgUrl:"../../static/img/ys.jpg",
										name:"轻奢岩板茶台办公室现代简约茶桌椅组合一体接待室高端别墅大茶台",
										attrs:"黑色",
										pprice:"299.00",
										num:1
									}
								]
							}
						]
					},
					{
						id:"2",
						name:"待付款",
						list:[]
					},
					{
						id:"3",
						name:"待收货",
						list:[]
					},
					{
						id:"4",
						name:"代发货",
						list:[]
					},
					{
						id:"5",
						name:"待评价",
						list:[]
					},],
				tabIndex:0,
				componentHeight: 0,
			}
		},
		components:{
			lines,
			orderItem
		},
		onReady() {
			this.getHeight()
		},
		methods: {
			// 选择 tab
			choseItem(i){
				this.tabIndex = i
			},
			
			// 兼容可是区域高度
			getHeight(){
				let system = getClientHeight()
				
				uni.getSystemInfo({
					success: (res) => {
					    // #ifdef  MP-WEIXIN
						this.componentHeight = res.windowHeight - uni.upx2px(120) - system
						// #endif
						this.componentHeight = res.windowHeight - uni.upx2px(120)
					}
				})	
			},
		}
	}
</script>

<style lang="scss" scoped>
	.order{
		
		.order-header{
			display: flex;
			justify-content: center;
			align-items: center;
			border: 2rpx solid #f7f7f7;
			background-color: #fff;
			
			.header-item{
				flex: 1;
				text-align: center;
				line-height: 120rpx;
			}
		}
		
		
		.no-main{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			background-color: #fff;
			
			.no-btn{
				margin-top: 20rpx;
				padding: 6rpx 60rpx;
				border: 2rpx solid #49bdfb;
				color: #49bdfb;
				border-radius: 40rpx;
			}
		}
		
		.order-main{
			
			.order-goods{
				
				.goods-header{
					display: flex;
					align-items: center;
					justify-content: flex-end;
					padding: 0 20rpx;
					line-height: 76rpx;
					background-color: #fff;
					
					.goods-left{
						flex: 1;
						display: flex;
						align-items: center;
						
						.left-img{
							width: 36rpx;
							height: 36rpx;
							border-radius: 50%;
						}
						
						.con-text{
							margin: 0 10rpx;
						}
					}
				}
				
				
				
				.order-price{
					display: flex;
					justify-content: flex-end;
					padding: 20rpx;
					background-color: #fff;
				}
				
				.order-pay{
					display: flex;
					justify-content: flex-end;
					background-color: #fff;
					padding: 20rpx;
					
					.pay-box{
						border: 2rpx solid #49bdfb;
						padding: 6rpx 40rpx;
						border-radius: 30rpx;
					}
				}
				
			}
			
		}
	}
	
	
	.active{
		border-bottom: 4rpx solid #49bdfb;
	}
</style>
