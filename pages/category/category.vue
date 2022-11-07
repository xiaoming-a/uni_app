<template>
	<view class="category">
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx-nav">
			<view class="con-input">
				<span class="icon-sea iconfont icon-fangdajing"></span>
				<input 
				confirm-type="search"
				class="input-texts"
				 type="text" 
				 v-model="keyword" 
				 focus 
				 disabled="true"
				 adjust-position
				 @tap="goSearch"
				 placeholder="请输入关键字"/>
			</view>
		</view>
		<!-- #endif -->
		
		<lines></lines>
		
		<view 
		    class="list">
			<!-- 左侧 start -->
			<scroll-view
			    :style="{height:componentHeight + 'px'}"
			    scroll-y="true"
			    class="list-left">
				<view 
				    @tap="leftTap(index,item.id)"
				    class="left-item"
				    v-for="(item,index) in leftData"
				    :key="item.id">
				    <view 
					    class="left-name"
						:class="{leftNameActive:leftIndex === index}">
				    	{{item.name}}
				    </view>
				</view>
			</scroll-view>
			<!-- 左侧 end -->
			
			<!-- 右侧 start -->
			<scroll-view
			    :style="{height:componentHeight + 'px'}"
			    scroll-y="true" 
				class="list-right">
				<view 
				    v-for="(item,index) in rightData" 
					:key="index">
					<block v-for="item2 in item" :key="item2.id">
						<view class="right-list">
							<view class="list-title">{{item2.name}}</view>
							<block v-for="item3 in item2.list" :key="item3.id">
								<view class="right-content">
									<view class="right-item">
										<image class="right-img" :src="item3.imgUrl" mode=""></image>
										<view class="right-name">{{item3.name}}</view>
									</view>
								</view>
							</block>
						</view>
					</block>
				</view>
			</scroll-view>
			<!-- 右侧 end -->
			
		</view>
		
		<!-- tabbar -->
		<tabbar cureentPage="category"></tabbar>
	</view>
</template>

<script>
	
	import $http from '@/common/request/index.js'
	import lines from '@/components/common/lines.vue'
	import getClientHeight from "@/common/js/getClientHeight.js"
	import tabbar from "@/components/common/Tabbar.vue"
	
	export default {
		data() {
			return {
				keyword:"",
				componentHeight: 0,
				leftIndex:0,
				leftData:[],
				rightData:[],
			};
		},
		components:{
			lines,
			tabbar
		},
		onLoad() {
			this.getList()
		},
		onReady() {
			this.getHeight()
		},
		// 监听原生标题栏搜索输入框点击事件
		onNavigationBarSearchInputClicked() {
			this.goSearch()
		},
		methods:{
			goSearch(){
				uni.navigateTo({
					url:'../search/search',
				})
			},
			
			// 兼容可是区域高度
			getHeight(){
				let system = getClientHeight()
				
				uni.getSystemInfo({
					success: (res) => {
					    // #ifdef  MP-WEIXIN
						this.componentHeight = res.windowHeight - system
						// #endif
						this.componentHeight = res.windowHeight 
					}
				})
			},
			
			// 左侧导航栏点击
			leftTap(index,id){
				this.leftIndex = index
				
				this.getList(id)
			},
			// 获取数据
			getList(id){
				// if(id === (this.leftIndex + 1)) return
				$http.request({
					url:"/goods/list"
				}).then(res=>{
					if(res.code === 0){
						let leftData = []
						let rightData = []
						res.data.forEach(item=>{
							leftData.push({
								id:item.id,
								name:item.name
							})
							if(item.id === this.leftIndex + 1){
								rightData.push(item.data)
							}
						})
						this.leftData = leftData
						this.rightData = rightData
					}
				}).catch(err=>{
					console.log(err);
				})
			}
		},
	}
</script>

<style lang="scss">
.category{
	
	.wx-nav{
		height: 200rpx;
		width: 100%;
		text-align: center;
		position: relative;
		background-color: #fff;
		
		.con-input{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			width: calc(700rpx - 100rpx);
			border: 1px solid #eeeeee;
			border-radius: 15px;
			display: flex;
			background-color: #eeeeee;
			
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
			    width: calc(700rpx - 140rpx);
			    font-size: 28rpx;
			    color: #b3b3b3;
				padding-left: 15rpx;
			}
		}
	}
	
	.list{
		display: flex;
		overflow: hidden;
		
		.list-left{
			width: 200rpx;
			
			.left-item{
				border-bottom: 2rpx solid #fff;
				font-size: 28rpx;
				background-color: #f7f7f7;
				font-weight: bold;
				
				.left-name{
					padding: 22rpx 6rpx;
					text-align: center;
				}
			}
		}
		
		.list-right{
			width: calc(750rpx - 200rpx);
			padding-left: 30rpx;
			
			.right-list{
				
				.list-title{
					font-weight: bold;
					padding: 30rpx 0;
				}
				
				.right-content{
					display: flex;
					flex-wrap: wrap;
					
					.right-item{
						width: 150rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 10rpx;
						
						.right-img{
							width: 150rpx;
							height: 150rpx;
						}
						
						.right-name{
							padding: 16rpx 0;
						}
					}
				}
			}
		}
	}
}

.leftNameActive{
	border-left: 8rpx solid #49BDFB;
	background-color: #fff;
}
</style>
