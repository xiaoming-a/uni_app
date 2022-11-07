<template>
	<view class="paymont">
		<!-- 自定义导航 -->
		<uni-nav-bar 
		    title="选择支付方式" 
		    fixed="true"
		    statusBar="true"
			rightText="关闭"
			@clickRight="clickRight">
		</uni-nav-bar>
		
		<!-- 支付方式 -->
		<view class="pay-mian">
			
			<radio-group>
				<label>
					<view class="pay-item">
						<image class="pay-item-img" src="../../static/img/zfb.jpg" mode=""></image>
						<view>
							<view>支付宝</view>
							<view class="pay-item-txt">推荐支付宝用户使用</view>
						</view>
						<label class="radio">
							<radio value="" color="#ff3333"></radio>
						</label>
					</view>
				</label>
				
				<label>
					<view class="pay-item">
						<image class="pay-item-img" src="../../static/img/wx.jpg" mode=""></image>
						<view>
							<view>微信</view>
							<view class="pay-item-txt">推荐微信用户使用</view>
						</view>
						<label class="radio">
							<radio value="" color="#ff3333"></radio>
						</label>
					</view>
				</label>
			</radio-group>

		</view>
		
		<!-- 底部 -->
		<view class="pay-foot">
			<view class="foot-left">
				<text class="f-ative-color">合计：</text>
				<text class="total">￥{{details.price}}</text>
			</view>
			<view class="foot-payitem" @tap="goPaymont">去支付</view>
		</view>
	</view>
</template>

<script>
	import UniNavBar from "@/components/uni/uni-nav-bar/uni-nav-bar.vue"
		
	export default {
		data() {
			return {
				isRightClick:false,
				details:{},
			}
		},
		components:{
			UniNavBar,
		},
		onLoad(e) {
			this.details = JSON.parse(e.details)
		},
		computed:{},
		methods: {
			// 关闭支付方式 返回上一页
			clickRight(){
				uni.navigateBack({
					delta:1
				})
			},
			
			// 支付
			goPaymont(){
				uni.navigateTo({
					url:"../paySucces/paySucces"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.paymont{
		
		.pay-mian{
			
			.pay-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx;
				border-bottom: 2rpx solid #ccc;
				
				.pay-item-img{
					width: 100rpx;
					height: 100rpx;
				}
				
				.pay-item-txt{
					color: #9c9c9c;
				}
			}
		}
		
		.pay-foot{
			width: 100%;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			height: 100rpx;
			justify-content: space-between;
			align-items: center;
			
			.foot-left{
				background-color: #000000;
				line-height: 100rpx;
				flex: 1;
				padding-left: 50rpx;
				
				.total{
					color: #fff;
				}
			}
			
			
			.foot-payitem{
				background-color: #42b7FB;
				line-height: 100rpx;
				text-align: center;
				color: #fff;
				width: 220rpx;
			}
		}
	}
</style>
