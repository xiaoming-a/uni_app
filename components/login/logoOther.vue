<template>
	<!-- 其他登录方式 -->
	<view class="login-other">
		<view class="other-text">
			<view class="text-titile">或者使用以下方式登录</view>
		</view>
		
		<view class="other-main">
			<view class="main-item" @tap="loginOther('weixin')">
				<image class="main-img" src="../../static/img/wx.png" mode=""></image>
			</view>
			<view class="main-item" @tap="loginOther('sinaweibo')">
				<image class="main-img" src="../../static/img/wb.png" mode=""></image>
			</view>
			<view class="main-item" @tap="loginOther('qq')">
				<image class="main-img" src="../../static/img/QQ.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	
	import $http from '@/common/request/index.js'
	import { mapMutations } from "vuex"
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {

			...mapMutations(['login']),
			// 返回 上一页
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			
			getWXLogin(e){
				uni.getUserProfile({
					desc:"登录注册",
					success: (s) => {
						uni.login({
						  provider: e,
						  success:(result)=>{ 
							let code = result.code
							$http.request({
								url:'/wxLogin',
								method:"POST",
								data:{
									code:code
								},
							}).then(res=>{
								if(!res.success) return
								let parmas = {
									provider: e,
									openid:res.data.openid,
									nickName:s.userInfo.nickName,
									avatarUrl:s.userInfo.avatarUrl,
								}
								// 执行login
								this.getLogin(parmas)	
								
							}).catch(err=>{
								uni.showToast({
									title:'请求失败',
									icon:'none'
								})
							})
							
						  }
						});
					}
				})
			},
			
			// 微信登录
		    getLogin(parmas){
					$http.request({
						url:'/loginOther',
						method:"POST",
						data:parmas,
					}).then(res=>{
				
						this.login(res.data)
					
						uni.showToast({
							icon:"none",
							title:"登陆成功"
						})

						this.goBack()
						
					}).catch(err=>{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					})
			},
			
			loginOther(e){
				
				// #ifdef  MP-WEIXIN
				this.getWXLogin(e)
				// #endif
	
				// uni.login({
				//   provider: e,
				//   success:(res)=>{
				// 	console.log(res);  
					
				// 	let parmas = {
				// 		provider: e,
				// 		openid:result.userInfo.openid,
				// 		nickName:result.userInfo.nickName,
				// 		avatarUrl:result.userInfo.avatarUrl,
				// 	}
					
				// 	$http.request({
				// 		url:'/loginOther',
				// 		method:"POST",
				// 		data:parmas,
				// 	}).then(res=>{
				// 		this.login(res.data.data)
												
				// 		uni.showToast({
				// 			icon:"none",
				// 			title:res.data.msg
				// 		})
							
				// 		this.goBack()
							
				// 	}).catch(err=>{
				// 		uni.showToast({
				// 			title:'请求失败',
				// 			icon:'none'
				// 		})
				// 	})
					
				//   }
				// });
			},
		}
	}
</script>

<style lang="scss" scoped>
	// 其他登录方式 start
	.login-other{
		padding: 100rpx 0;
		
		.other-text{
			display: flex;
			padding: 50rpx 0;
			
			&::after{
				flex: 1;
				content: '';
				height: 2rpx;
				background-color: #ccc;
			}
			
			&::before{
				flex: 1;
				content: '';
				height: 2rpx;
				background-color: #ccc;
			}
			
			.text-titile{
				line-height: 0;
				padding: 0 10rpx;
			}
		}
		
		.other-main{
			display: flex;
			justify-content: space-around;
			
			.main-item{
				display: flex;
				justify-items: center;
				align-items: center;
				
				.main-img{
					width: 80rpx;
					height: 80rpx;
				}
			}
		}
		
	}
	// 其他登录方式 end
</style>