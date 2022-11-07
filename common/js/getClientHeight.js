export default function getClientHeight() {
	const res = uni.getSystemInfoSync()
	const system = res.platform
	if(system === 'ios'){
		return 44 + res.statusBarHeight
	}else if(system === 'android'){
		return 48 + res.statusBarHeight
	}else {
		return uni.upx2px(200)
	}
}