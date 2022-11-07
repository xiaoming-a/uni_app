<template>
	<view class="login-code">
		<view class="login-tel">
				<view class="tel-main">
						<view class="login-from">
							<view class="login-user">
								<view class="login-user-text">验证码</view>
								<input class="logon-inp" type="number" focus="true" v-model="telNumber" value="" placeholder="请输入验证码">
								<button 
								@tap="sendCode"
								class="login-btn" 
								plain="true" 
								size="mini" 
								:disabled="codeFlag">
								{{codeMsg}}
								</button>
							</view>
						</view>
						
						<!-- 手机号登录 -->
						<view class="tel-phone" @tap="nextBtn">下一步</view>
						
						<!-- 提示 -->
						<view class="login-tip">温馨提示：你可以选择免密码登录，更加方便</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import lines from '@/components/common/lines.vue'
	import $http from '@/common/request/index.js'
	import { mapMutations } from "vuex"
	
	export default {
		data() {
			return {
				telNumber:"",
				codeNumber:60,
				codeMsg:"",
				codeFlag:false,
				phone:"",
				getCode:""
			}
		},
		components:{
			lines
		},
		onLoad(e) {
			this.phone = e.phone
		},
		onReady() {
			this.codeMsg = `重新发送  (${this.codeNumber}s)`
			this.sendCode()
		},
		methods: {
			...mapMutations(['login']),
			// 发送验证码
			sendCode(){
				this.telNumber = ""
				$http.request({
					url:'/code',
					method:"POST",
					data:{
						userName:this.phone,
					}
				}).then(res=>{
					this.telNumber = res.data.code
					this.getCode = res.data.code
				}).catch(err=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
				
				this.codeFlag = true
				let timer = setInterval(()=>{
					--this.codeNumber
					this.codeMsg = `重新发送  (${this.codeNumber}s)`
				},1000)
				
				setTimeout(()=>{
					clearInterval(timer)
					this.codeNumber = 60
					this.codeFlag = false
						this.codeMsg = `重新发送`
				},60000)
			},
			
			// 下一步
			nextBtn(){
				if(this.telNumber !== ""){
					
					$http.request({
						url:'/addUser',
						method:"POST",
						data:{
							userName:this.phone,
							code:this.getCode
							
						}
					}).then(res=>{
						if(res.data.success){
							uni.showToast({
								icon:'none',
								title:res.data.msg
							})
							this.login(res.data.data)
							uni.reLaunch({
								url:"../index/index"
							})
						}
					}).catch(err=>{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					})
					
					
				}else {
					uni.showToast({
						title:"缺少验证码",
						icon:'none'
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.login-code{
		
		.login-tel{
			width: 100vw;
			height: 100vh;
			
			
			.tel-main{
				padding: 0 20rpx;
				
				.tel-phone{
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					color: #fff;
					background-color: #49bdfb;
					border-radius: 40rpx;
				}
		
				.login-from{
					padding-top: 40rpx;
					margin-bottom: 20rpx;
					
					.login-user{
						font-size: 32rpx;
						padding: 10rpx 0;
						display: flex;
						align-items: center;
						border-bottom: 2rpx solid #ccc;
						
						.login-user-text{
							width: 150rpx;
						}
						
						.logon-inp{
							flex: 1;
						}
						
						.login-btn{
							width: 250rpx;
						}
					}
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
