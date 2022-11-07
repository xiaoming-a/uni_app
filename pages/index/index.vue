<template>
	<view class="index">
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx-nav">
			<view class="left-icon iconfont icon-fangdajing" @tap="goSearch"></view>
			<text class="text">小明商城</text>
			<view class="right-icon iconfont icon-xiaoxi"></view>
		</view>
		<!-- #endif -->
	
	    <!-- 头部滚动条 start -->
	    <scroll-view scroll-x="true" class="index-scroll" :scroll-into-view="topId">
			<view 
			:id="'top'+index"
			v-for="(item,index) in scrollListList"
			:key="item.id"
			@tap="choseItem(index)"
			class="index-scroll-item">
				<text :class="{sActive:index === choseIndex}">
				 {{item.name}}
				 </text>
			</view>
		</scroll-view>
		<!-- 头部滚动条 end -->
		
		<!-- 内容 start -->
		<swiper 
		:style="{height:componentHeight + 'px'}"
		@change="changeItem" 
		:current="choseIndex">
			<swiper-item 
			  v-for="(item,index) in newScrollListList"
			  :key="item.id">
			  
					<scroll-view 
					scroll-y="true" 
					:style="{height:componentHeight + 'px'}"
					@scrolltolower="loadMore(index)"
					>
					
					   <block v-if="item.data.length > 0">
					      <block
					        v-for="(item2,index2) in item.data" 
					        :key="item2.type">
					        
							<!-- 推荐  start -->
					      	<index-swiper 
					      	v-if="item2.type === 'swiperList'"
					          :dataList ="item2.data">
					      	</index-swiper>
					      	
					      	<template v-if="item2.type === 'recommend'">
					      		<recommend :dataList ="item2.data"></recommend>
					      		<card cardTitle="猜你喜欢"></card>
					      	</template>
					      	
					      	<comodity-list v-if="item2.type === 'comodityist'" :dataList ="item2.data"></comodity-list>
							<!-- 推荐  end -->
							
							<!-- 运动户外 start -->
							<banner v-if="item2.type === 'bannerList'" :imgUrl ="item2.imgUrl"></banner>
							
							<template v-if="item2.type === 'iconsList'">
								<icons :dataList ="item2.data"></icons>
								<card cardTitle="超级大牌"></card>
							</template>
							
							<template v-if="item2.type === 'iconBannerList'">
							    <icon-banner :dataList ="item2.data"></icon-banner>
							    <card cardTitle="热销爆品"></card>
							</template>
							
							<template v-if="item2.type === 'hotList'">
							    <hot :dataList ="item2.data"></hot>
							    <card cardTitle="推荐店铺"></card>
							</template>
							
							<template v-if="item2.type === 'shopList'">
								<shop :dataList ="item2.data"></shop>
								<card cardTitle="为您推荐"></card>
							</template>
							
							<comodity-list v-if="item2.type === 'comodityist'" :dataList ="item2.data"></comodity-list>
							<!-- 运动户外 end -->
							
					      </block>
					   </block>
					   <block v-else>暂无数据</block>
					   
					   <view class="upLoading f-color">
						   {{item.loadText}}
					   </view>
						
					</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 内容 end -->
		
		<!-- tabbar -->
		<tabbar cureentPage="index"></tabbar>
		
	</view>
</template>

<script>
	
	import $http from '@/common/request/index.js'
	import indexSwiper from "@/components/index/indexSwiper.vue"
	import recommend from "@/components/index/recommend.vue"
	import card from "@/components/common/card.vue"
	import comodityList from "@/components/common/comodityList.vue"
	import banner from "@/components/index/banner.vue"
	import icons from "@/components/index/icons.vue"
	import iconBanner from "@/components/index/iconBanner.vue"
	import hot from "@/components/index/hot.vue"
	import shop from "@/components/index/shop.vue"
	import getClientHeight from "@/common/js/getClientHeight.js"
	import tabbar from "@/components/common/Tabbar.vue"
	
	
	export default {
		data() {
			return {
				choseIndex: 0,
				topId:'top0',
				componentHeight: 0,
				scrollListList:[],
			    newScrollListList:[],
			}
		},
		components:{
			indexSwiper,
			recommend,
			card,
			comodityList,
			banner,
			icons,
			iconBanner,
			hot,
			shop,
			tabbar
		},
		onLoad() {
			this.getList()
		},
		onReady() {
			this.getHeight()
		},
		methods: {
			// 选择 导航
			choseItem(index){
				if(index === this.choseIndex) return
				this.choseIndex = index
				this.topId = 'top'+index
				if(this.newScrollListList[index].load === 'first'){
					this.addData()
				}
			},
			// 改变 导航内容
			changeItem(e){
				this.choseItem(e.detail.current)
			},
			
			// 获取数据
			getList(){
				
				$http.request({
					url:'/index_list/data'
				}).then(res=>{
					const {code, data} = res
					if(code === 0 ){
						this.scrollListList = data.topBar
						this.newScrollListList = this.initData(data)
					}
				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
			
			// 监听原生标题栏按钮点击事件
			onNavigationBarButtonTap(e){
				if(e.float === 'left'){
					uni.navigateTo({
						url:'../search/search',
					})
				}
			},
			
			// 数据初始化
			initData(res) {
				let arr = []
				for(let i = 0;i < this.scrollListList.length;i++){
					let obj = {
						data:[],
						load:"first",
						loadText:"上拉加载更多..."
					}
					if(i == 0){
						obj.data = res.data
					}
					arr.push(obj)
				}
				
				return arr
			},
			
			// 兼容可是区域高度
			getHeight(){
				let system = getClientHeight()
				
				uni.getSystemInfo({
					success: (res) => {
					    // #ifdef  MP-WEIXIN
						this.componentHeight = res.windowHeight  - system
						// #endif
						this.componentHeight = res.windowHeight
					}
				})
			
		
			},
		
		    // 获取其他数据
			addData(callback){
				// 获取当前选择栏的序号
				let index = this.choseIndex
				let id = this.scrollListList[index].id
				
				let page = Math.ceil(this.newScrollListList[index].data.length / 5) + 1
				
				
				// 获取数据
				$http.request({
					url:`/index_list/${id}/data/${page}`
				}).then(res=>{
					const {code, data} = res
					if(code === 0 ){
						this.newScrollListList[index].data = [...this.newScrollListList[index].data,...data]
					}
				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
				
				this.newScrollListList[index].load = 'last'
				if(typeof callback === 'function'){
					callback()
				}
			},
			
			// 触底 加载
			loadMore(index){
				this.newScrollListList[index].loadText = '加载中...'
				this.addData(()=>{
					this.newScrollListList[index].loadText = '上拉加载更多...'
				})
			},
			
			// #ifdef  MP-WEIXIN
			// 微信 进入搜索页面
			goSearch(){
				uni.navigateTo({
					url:'../search/search',
				})
			},
			// #endif
			
		}
	}
</script>

<style scoped lang="scss">
	.index{
		
		.wx-nav{
			height: 200rpx;
			width: 100%;
			line-height: 200rpx;
			text-align: center;
			position: relative;
			
			.left-icon{
				font-size: 40rpx;
				position: absolute;
				top: 50%;
				left: 20rpx; 
				transform: translateY(-50%);
			}
			
			.right-icon{
				font-size: 40rpx;
				position: absolute;
			    top: 50%;
				right: 20rpx;
				transform: translateY(-50%);
			}
		}
		
		.index-scroll{
			width: 100%;
			height: 80rpx;
			white-space: nowrap;
			
			.index-scroll-item{
				display: inline-block;
				padding:  10rpx 18rpx;
				text-align: center;
				font-size: 34rpx;
				color: #545454;
			}
		}
	}
	
	.sActive{
		border-bottom: 6rpx solid #00aaff;
		color: #00aaff !important;
	}
	
	.upLoading{
		border-top: 2rpx solid #636263;
		line-height: 60rpx;
		text-align: center;
	}
</style>
