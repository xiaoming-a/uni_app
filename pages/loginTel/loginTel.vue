<template>
	<view class="login-tel">
			<view class="tel-main">
					<view class="login-from">
						<view class="login-user">
							<view class="login-user-text">手机号</view>
							<input type="number" focus="true" v-model="tel" value="" placeholder="请输入11位手机号">
						</view>
					</view>
					
					<!-- 手机号登录 -->
					<view class="tel-phone" @tap="nextSubmit">下一步</view>
					<!-- 提示 -->
					<view class="login-tip">继续注册表示你阅读同意 <text class="f-ative-color">《小明商城协议》</text></view>
		</view>
	</view>
</template>

<script>
	
	import lines from '@/components/common/lines.vue'
	import $http from '@/common/request/index.js'
	
	export default {
		data() {
			return {
				tel:"",
				rules:{
					tel:{
						rule:/^1[23456789]\d{9}$/,
						msg:"密码为6-16位字符"
					}
				}
			}
		},
		components:{
			lines
		},
		methods: {
			// 下一部
			nextSubmit(){
				if(!this.validate("tel")) return;
				
				$http.request({
					url:'/registered',
					method:"POST",
					data:{
						phone:this.tel,
					}
				}).then(res=>{
					if(!res.data.success){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						return
					}else {
						uni.navigateTo({
							url:`../loginCode/loginCode?phone=${this.tel}`
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
		}
	}
</script>

<style lang="scss" scoped>
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
							width:150rpx;
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
		
</style>
