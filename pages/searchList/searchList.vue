<template>
	<view>
		<view class="search-list">
			<!-- #ifdef MP-WEIXIN -->
			<view class="wx-nav">
				<view class="left-icon iconfont icon-xiangzuo_o" @tap="goBack"></view>
				<view class="con-input">
					<span class="icon-sea iconfont icon-fangdajing"></span>
					<input 
					    v-model="keyword"
					    class="input-texts" 
						type="text" disabled="true" 
						focus 
						placeholder="请输入搜索内容"/>
				</view>
				<view class="right-icon">
					<span class="btn">筛选</span>
				</view>
			</view>
			<!-- #endif -->
			
			<shop-list :keyword="keyword"></shop-list>
		</view>
	</view>
</template>

<script>
	
	import shopList from '@/components/common/shopList.vue'
	
	export default {
		data() {
			return {
				// 关键词
				keyword:"",
			}
		},
		onLoad(e) {
			// 获取传值
			this.keyword = e.keyword
			
			// #ifdef APP-PLUS  
			var webView = this.$mp.page.$getAppWebview();  
			webView.setTitleNViewSearchInputText(e.keyword);
			// #endif
			
		},
		components:{
			shopList
		},
		methods: {
			// #ifdef  MP-WEIXIN
			// 返回上一层
			goBack(){
				uni.navigateBack(1);
			},
			// #endif
		}
	}
</script>

<style scoped lang="scss">
	.search-list{
		.wx-nav{
			height: 200rpx;
			width: 100%;
			text-align: center;
			position: relative;
			background-color: #f7f7f7;
			
			.con-input{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				width: calc(700rpx - 220rpx);
				border: 1px solid #eeeeee;
				border-radius: 15px;
				display: flex;
				
				.icon-sea{
					display: inline-block;
					 height: 65rpx;
					 width: 30rpx;
					 line-height: 65rpx;
					 color: #b3b3b3;
					 font-size: 40rpx;
					 padding-left: 10rpx;
				}
				
				
				.input-texts{
					text-align: left;
				    height: 65rpx;
				    width: calc(700rpx - 250rpx);
				    font-size: 28rpx;
				    color: #b3b3b3;
					padding-left: 15rpx;
				}
			}
			
			.left-icon{
				position: absolute;
				top: 50%;
				left: 20rpx;
				transform: translateY(-50%);
				font-weight: bold;
				width: 60rpx;
			    height: 65rpx;
				font-size: 40rpx;
				line-height: 65rpx;
			}
			
			.right-icon{
				position: absolute;
			    top: 50%;
				right: 20rpx;
				transform: translateY(-50%);
				
				.btn{
					display: inline-block;
					width: 120rpx;
					height: 65rpx;
					font-size: 32rpx;
					line-height: 65rpx;
					color: #636263;
				}
			}
		}
	}
</style>
