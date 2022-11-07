<template>
	<view class="login">
		
		<swiper vertical="true" class="sw-main">
			<!-- 上屏 -->
			<swiper-item>
				<scroll-view >
					<view class="login-tel">
						<view class="tel-main">
							<!-- 关闭 -->
							<view class="colse" @tap="goBack">
								<image class="colse-img" src="../../static/img/change.png" mode=""></image>
							</view>
							<!-- logo -->
							<view class="login-logo">
								<image class="logo-img" src="../../static/img/shop.png" mode=""></image>
							</view>
							<!-- 手机号注册 -->
							<view class="tel-phone" @tap="goTelPage">手机号注册</view>
							<!-- 其他登录方式 -->
							<login-other></login-other>
							<!-- 已有登录 -->
							<view class="login-have">
								<view class="login-have-txt">已有账号，去登录</view>
								<image class="login-have-img" src="../../static/img/down.png" mode=""></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			
			<!-- 下屏 -->
			<swiper-item>
				<view class="swiper-item">
					<scroll-view>
						<view class="login-tel">
							<view class="tel-main">
									<!-- 关闭 -->
									<view class="colse" @tap="goBack">
										<image class="colse-img" src="../../static/img/change.png" mode=""></image>
									</view>
									
									<view class="login-have bottom-nav">
										<image class="login-have-img"  src="../../static/img/up.png" mode=""></image>
										<view class="login-have-txt">没有账号，去注册</view>
									</view>
									
									<view class="login-from">
										<view class="login-user">
											<view class="login-user-text">账号</view>
											<input type="text" v-model="userName" value="" placeholder="请输入手机号/昵称">
										</view>
										<view class="login-user">
											<view class="login-user-text">密码</view>
											<input type="password" v-model="passWork" value="" placeholder="请输入密码">
										</view>
									</view>
									<!-- 忘记密码 -->
									<view class="login-quice">
										<view class="login-quice-text">忘记密码?</view>
										<view class="login-quice-text">免密码登录</view>
									</view>
									
									<!-- 手机号登录 -->
									<view class="tel-phone" @tap="submit">登录</view>
									
									<!-- 其他登录方式 -->
									<login-other></login-other>
						
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	
	import loginOther from "@/components/login/logoOther.vue"
	import $http from '@/common/request/index.js'
	import { mapMutations } from "vuex"
	
	export default {
		data() {
			return {
				userName:"",
				passWork:"",
				rules:{
					userName:{
						rule:/\S/,
						msg:"账号不能为空"
					},
					passWork:{
						rule:/^[0-9a-zA-Z]{6,16}$/,
						msg:"密码为6-16位字符"
					}
				}
			}
		},
		components:{
			loginOther
		},
		methods: {
			...mapMutations(['login']),
			// 返回 上一页
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			
			// 登录
			submit(){			
				if(!this.validate("userName")) return;
				if(!this.validate("passWork")) return;
				
				uni.showToast({
					icon:"none",
					title:"登录中..."
				})
				
				$http.request({
					url:'/login',
					method:"POST",
					data:{
						userName:this.userName,
						passWork:this.passWork
					}
				}).then(res=>{
					if(res.data.success){
						setTimeout(()=>{
							
							this.login(res.data.data)
							
							uni.hideLoading()
							
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
							
							this.goBack()
						},500)
					}else {
						uni.showToast({
							icon:"none",
							title:res.data.msg
						})
					}

				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
			
			// 检验规则
			validate(key){
				let bool = true;
				
				if(!this.rules[key].rule.test(this[key])){
					uni.showToast({
						icon:"none",
						title:this.rules[key].msg
					})
					bool = false
					return false
				}
				
				return bool
			},
			
			// 跳转登录页
			goTelPage(){
				
				uni.navigateTo({
					url:"../loginTel/loginTel"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.login{
		
		.sw-main{
			height: 100vh;
		}
		
			
		.bottom-nav{
			position: absolute;
			top: 80rpx;
			left: 50%;
			transform: translateX(-50%);
		}
		
		.login-tel{
			width: 100vw;
			height: 100vh;
			
			
			.tel-main{
				padding: 0 20rpx;
				
				.colse{
					padding: 120rpx 0;
					
					.colse-img{
						width: 60rpx;
						height: 60rpx;
					}
				}
				
				.login-logo{
					display: flex;
					padding-bottom: 100rpx;
					justify-content: center;
					align-items: center;
					
					.logo-img{
						width: 300rpx;
						height: 300rpx;
					}
				}
				
				.tel-phone{
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					color: #fff;
					background-color: #49bdfb;
					border-radius: 40rpx;
				}
				
				.login-have{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
					.login-have-txt{
						// color: #6f6f6f;
					}
					
					.login-have-img{
						width: 50rpx;
						height: 50rpx;
					}
				}
				
				
				.login-from{
					padding-top: 40rpx;
					
					.login-user{
						font-size: 32rpx;
						padding: 10rpx 0;
						display: flex;
						align-items: center;
						border-bottom: 2rpx solid #ccc;
						
						.login-user-text{
							width: 80rpx;
						}
					}
				}
				
				.login-quice{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 0;
				}
				
				.login-tip{
					padding: 20rpx 0;
					font-size: 24rpx;
					color: #6c6c6c;
					text-align: center;
				}
			}
		}
		
	}
</style>
