import $http from '@/common/request/index.js'

export default {
	state:{
		dataList:[
			// {
			// 	checked:false,
			// 	id:"1",
			// 	name:"大衣绒毛爆款,冬季穿搭必备",
			// 	color:"颜色：白色",
			// 	imgUrl:"../../static/img/mj.jpg",
			// 	price:"26",
			// 	num:1
			// },
			// {
			// 	checked:false,
			// 	id:"2",
			// 	name:"大衣绒毛爆款,冬季穿搭必备",
			// 	color:"颜色：白色",
			// 	imgUrl:"../../static/img/ys.jpg",
			// 	price:"26",
			// 	num:1
			// }
		],
		selectList:[]
	},
	
	getters:{
		// 判断是否全选
		isChecked(state){
			return state.dataList.length === state.selectList.length
		},
		
		// 合计 数量
		totalCount(state){
			let total = {
				price:0,
				num:0
			}
			
			state.dataList.forEach(item=>{
				// 是否选中
				if(state.selectList.indexOf(item.id) > -1){
				    // 合计
					total.price += Number(item.price) * item.num
					total.num = state.selectList.length
				}
			})
			
			return total
		},
		
	},
	mutations:{
		// 赋值
		initGetCart(state,goods){
			state.dataList = goods
		},
		
		// 进行全选
		allCheck(state){
			state.selectList = state.dataList.map(item =>{
				item.checked = true
				return item.id
			})
		},
		
		// 取消全选
		unAllCheck(state){
			state.dataList.forEach(item=>{
				item.checked = false
			})
			
			state.selectList = []
		},
		
		// 单选
		selectItem(state,index){
			let id = state.dataList[index].id
			
			let i = state.selectList.indexOf(id)
			
			if(i > -1){
				state.dataList[index].checked = false
				return state.selectList.splice(i,1)
			} 
			state.dataList[index].checked  = true
			state.selectList.push(id)
		},
		
		// 删除 购物车商品
		delGoods(state){
			state.dataList = state.dataList.filter(item=>{
				return state.selectList.indexOf(item.id) === -1
			})
		},
		
		// 加入购物车
		addCart(state,goods){
			state.dataList.push(goods)
		},
	},
	actions:{
		checkedAll({commit,getters}){
			getters.isChecked ? commit("unAllCheck") : commit("allCheck")
		},
		
		// 删除 购物车商品
		delectGoods({commit,state}){
			
			uni.showModal({
				content:"确定删除吗？",
				success: () => {
					$http.request({
						url:'/delectGoods',
						method:"POST",
						header:{
							token:true
						},
						data:{
							goodsId:state.selectList
						}
					}).then(res=>{
						if(res.code === 0){
							commit('delGoods')
							commit('unAllCheck')
							
							uni.showToast({
								title:"删除成功",
								icon:"none"
							})
						}
					}).catch(err=>{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					})
				}
			})
			
		}
	},
}