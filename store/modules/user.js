export default {
	state:{
		// 登录状态
		loginStatus:false,
		//token
		token:null,
		// 用户信息
		userInfo:{},
	},
	getters:{},
	mutations:{
		// 把本地存储的数据读取
		initUser(state){
			let getUserInfo = uni.getStorageSync("userInfo")
			if(getUserInfo){
				let userInfo = JSON.parse(getUserInfo)
				state.userInfo = userInfo
				state.loginStatus = true
				state.token = userInfo.token
			}
		},
		// 登录方法
		login(state,userInfo){
			state.userInfo = userInfo
			state.loginStatus = true
			state.token = userInfo.token
			uni.setStorageSync("userInfo",JSON.stringify(userInfo))
		},
		loginOut(state){
			state.loginStatus = false
			state.userInfo = {}
			state.token = null
			uni.removeStorageSync("userInfo")
		},
	},
	actions:{}
}