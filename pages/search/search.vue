<template>
	<view class="search">
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx-nav">
			<view class="left-icon iconfont icon-xiangzuo_o" @tap="goBack"></view>
			<view class="con-input">
				<span class="icon-sea iconfont icon-fangdajing"></span>
				<input 
				confirm-type="search"
				class="input-texts"
				 type="text" 
				 v-model="keyword" 
				 focus 
				 adjust-position
				 placeholder="请输入搜索内容"/>
			</view>
			<view class="right-icon">
				<span class="btn" @tap="search">搜索</span>
			</view>
		</view>
		<!-- #endif -->
		
		<!-- 内容 -->
		<lines></lines>
		
		<view class="search-item">
			<view class="search-title">
				<view class="f-color">最近搜索</view>
				<view class="f-color iconfont icon-shanchu" @tap="clearData"></view>
			</view>
			
			<view v-if="searchData.length > 0">
				<view 
				    @tap="goHist(item)"
				    v-for="(item,index) in searchData"
				    :key="index"
				    class="search-name f-color">
				    {{item}}
				</view>
			</view>
			<view class="no-search f-color" v-else>暂无搜索记录...</view>
		</view>
		
		<view class="search-item">
			<view class="search-title">
				<view class="f-color">热门搜索</view>
			</view>
			
			<view>
				<view class="search-name f-color">四件套</view>
			    <view class="search-name f-color">面膜</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	import lines from "@/components/common/lines.vue"
	
	export default {
		data() {
			return {
				// 关键词
				keyword:"",
				// 搜索记录
				searchData:[],
			}
		},
		components:{
			lines
		},
		// 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e){
			this.search()
		},
		// 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。
		onNavigationBarSearchInputConfirmed(){
			this.search()
		},
		// 监听原生标题栏搜索输入框输入内容变化事件
		onNavigationBarSearchInputChanged(e){
			this.keyword = e.text
		},
		
		onLoad() {
			uni.getStorage({
				key:'searchData',
				success: (res) => {
					this.searchData = JSON.parse(res.data)
				}
			})
		},
	
		methods: {
			
			search(){
				if(this.keyword === ""){
					return uni.showToast({
						title:"关键词不能为空",
						icon:"none"
					})
				} else {
					uni.navigateTo({
						url:`../searchList/searchList?keyword=${this.keyword}`,
				    })
				}
				uni.hideKeyboard()
				this.addSearch()
			},
			
			// 记录搜索值
			addSearch(){
				let index = this.searchData.indexOf(this.keyword)
				if(index < 0){
					this.searchData.unshift(this.keyword)
				}else{
					this.searchData.unshift(this.searchData.splice(index,1)[0])
				}
				
				// 本地存储
				uni.setStorage({
					key:'searchData',
					data:JSON.stringify(this.searchData),
				})
			},
			
			// 根据记录进入搜索页
			goHist(item){
				uni.navigateTo({
					url:`../searchList/searchList?keyword=${item}`,
				})
			},
			
			// 清除搜索记录
			clearData(){
				uni.showModal({
					title:"系统提示",
					content:"是否清除搜索记录",
					cancelText:"取消",
					confirmText:"确定",
					success: (res) => {
						console.log(res);
						if(res.confirm === true){
							uni.removeStorage({
								key:"searchData"
							});
							this.searchData = []
						}
					}
				})
			},
			
			// #ifdef  MP-WEIXIN
			// 返回上一层
			goBack(){
				uni.navigateBack(1);
			},
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.search{
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
		
		
		.search-item{
			padding: 20rpx;
			
			.search-title{
				display: flex;
				justify-content: space-between;
				font-size: 32rpx;
			}
			
			.search-name{
				display: inline-block;
				padding: 4rpx 24rpx;
				background-color: #e1e1e1;
				border-radius: 26rpx;
				margin: 10rpx;
				font-size: 28rpx;
			}
		}
	
	    .no-search{
			text-align: center;
			font-size: 28rpx;
		}
	}
</style>
