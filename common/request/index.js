import store from "@/store/index.js"
export default {
	common:{
		baseUrl:"https://zhouweiming.top/xm_sd/api",  
		
		data:{},
		header:{
			"Content-Type":"application/json",
			"Content-Type":"application/x-www-form-urlencoded"
		},
		method:"GET",
		dataType:"json",
	},
	request(options = {}){
		
		uni.showLoading({
			title: '加载中'
		});
		
		options.url = this.common.baseUrl + options.url
		options.data = options.data || this.common.data
	    options.header = options.header || this.common.header
		options.method = options.method || this.common.method
		options.dataType = options.dataType || this.common.dataType
		
		if(options.header.token){
			options.header.token = store.state.user.token

			if(!options.header.token){
				uni.showToast({
					icon:"none",
					title:"请先登录"
				})
				
				return uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		}
		
		return new Promise((resolve,reject)=>{
			uni.request({
				...options,
				success: (res) => {
					if(res.statusCode !== 200){
						setTimeout(function () {
							uni.hideLoading();
						}, 500);
						 return reject()
					}
					let data = res.data
					resolve(data)
					setTimeout(function () {
						uni.hideLoading();
					}, 500);
				}
			})
		})
	}
}