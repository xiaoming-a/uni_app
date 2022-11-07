<template>
	<view class="add-my-path">
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx-nav">
			<view class="left-icon iconfont icon-xiangzuo_o" @tap="goBack"></view>
			<view class="con-input">{{title}}</view>
			<view class="right-icon">
				<span class="btn" @tap="sumb">保存</span>
			</view>
		</view>
		<!-- #endif -->
		
		<!-- 开始 -->
		
		<view class="path-item">
			<view>收 件 人</view>
			<input type="text"  v-model="pathObj.name" value="" placeholder="请输入收件人名称">
		</view>
		
		<view class="path-item">
			<view>手 机 号</view>
			<input type="text" value="" v-model="pathObj.tel" placeholder="请输入手机号">
		</view>
		
		
		<view class="path-item">
			<view >所在地区</view>
			<view class="text-name" @tap="showCityPicker">{{pathObj.city}} > </view>
			<mpvue-city-picker 
			    :themeColor="themeColor" 
			    ref="mpvueCityPicker" 
			    :pickerValueDefault="cityPickerValueDefult" 
			    @onConfirm="onConfirm">
			</mpvue-city-picker>
		</view>
		
		<view class="path-item">
			<view>详细地址</view>
			<input type="text" value="" v-model="pathObj.details" placeholder="5-60 个字符">
		</view>
		
		<view class="path-item">
			<view>设置为默认地址</view>
			<!-- <radio value="" :checked="pathObj.isDefault" color="#ff3333"></radio> -->
			<radio-group @tap="changeRadio">
				<radio value="" :checked="(pathObj.isDefault.toString()) === 'true' ? true : false" color="#ff3333"></radio>
			</radio-group>
		</view>
		
	</view>
</template>

<script>
	
	import mpvueCityPicker from "@/components/uni/mpvue-citypicker/mpvueCityPicker.vue"
	import { mapActions,mapState } from "vuex"
	import $http from '@/common/request/index.js'
	
	export default {
		data() {
			return {
				themeColor:'#007AFF',
				cityPickerValueDefult:[0,0,1],
				pickerText:'',
				
				pathObj:{
					name:"",
					tel:"",
					city:"请选择",
					details:"",
					isDefault:false
				},
			
				title:"",
				index:0,
				// 是否修改的状态
				isStatus:false,
				isflah:false,
			}
		},
		computed:{
			...mapState({
				userInfo:state=>state.user.userInfo,
			})
		},
		onLoad(e) {
			if(e.data){
				this.title = "修改地址"
				uni.setNavigationBarTitle({
					title:this.title
				})
				let obj = JSON.parse(e.data)
				this.pathObj = obj.item
				this.index = obj.index
				this.isStatus = true
			}else{
				this.title = "新增地址"
				uni.setNavigationBarTitle({
					title:this.title
				})
				this.isStatus = false
			}
		},
		components:{
			mpvueCityPicker,
		},
		onNavigationBarButtonTap() {
			this.sumb()
		},
		methods: {
			
			...mapActions(['createPathFn','updataPathFn']),
			
			// 返回上一层
			goBack(){
				uni.navigateBack(1);
			},
			
			// 保存
			sumb(){
				
				if(this.isStatus){
					this.upAddressAt()
				} else {
					this.addAddressAt()
				}
			},
			
			// 修改
			upAddressAt(){
				
				this.pathObj.isDefault = this.pathObj.isDefault? "true":"false"
				
				let obj = {
					...this.pathObj,
					userId:this.userInfo.id
				}
				$http.request({
					url:'/upAddress',
					method:"POST",
					header:{
						token:true,
					},
					data:obj 
				}).then(res=>{
					if(res.success){
						// 修改
						this.updataPathFn({
							index:this.index,
							item:this.pathObj
						})
						uni.navigateBack(1);
					}else{
						uni.showToast({
							title:'请求失败',
							icon:'none',
						}) 
					}
				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none',
					}) 
				})
			},
			
			// 新增
			addAddressAt(){
				// 新增
				let obj = {
					...this.pathObj,
					userId:this.userInfo.id
				}
			
				$http.request({
					url:'/addAddress',
					method:"POST",
					header:{ 
						token:true,
					},
					data:obj 
				}).then(res=>{
					if(res.success){
						this.createPathFn(obj)
						uni.navigateBack(1);
					}else{
						uni.showToast({
							title:'请求失败',
							icon:'none',
						})  
					}
				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none',
					}) 
				})
			},
		
			// 显示并选择城市  
			showCityPicker(){
				this.$refs.mpvueCityPicker.show();
			},
			// 三级联动提交
			onConfirm(e){
				this.pathObj.city = e.label;
			},
			
			// 单选按钮改变
			changeRadio(){ 
				this.pathObj.isDefault = (this.pathObj.isDefault.toString()) === 'true' ? true:false
				
				this.pathObj.isDefault = !this.pathObj.isDefault 
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.add-my-path{
		padding: 20rpx;
		
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
		
		.path-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16rpx 0;
			border-bottom: 2rpx solid #ccc;
			
			input{
				flex: 1;
				text-align: left;
				padding-left: 10rpx;
			}
			
			.text-name{
				color: #949494;
			}
		}
	}
</style>
