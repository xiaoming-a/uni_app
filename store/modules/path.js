export default {
	state:{
		dataList:[
			// {
			// 	name:"张珊",
			// 	tel:"12345645678",
			// 	city:"北京市朝阳区",
			// 	details:"2号楼",
			// 	isDefault:true
			// },
			// {
			// 	name:"张珊",
			// 	tel:"12345645678",
			// 	city:"北京市海淀区",
			// 	details:"2号楼",
			// 	isDefault:false
			// }
		]
	},
	getters:{
		defaultPath(state){
			return state.dataList.filter(item=>item.isDefault.toString() === 'true')
		},
	},
	mutations:{
		// 初始化
		initGetAddress(state,list){
			state.dataList = list
		},
		createPath(state,obj){
			state.dataList.unshift(obj)
		},
		updataPath(state,{index,item}){
			for (let key in item) {
				state.dataList[index][key] = item[key]
			}
		},
		removePath(state){
			state.dataList.forEach(item=>{
				if(item.isDefault){
					item.isDefault = false
				}
			})
		},
	},
	actions:{
		createPathFn({commit},obj){
			if(obj.isDefault){
				commit('removePath')
			}
			commit('createPath',obj)
		},
		
		updataPathFn({commit},obj){
			if(obj.item.isDefault){
				commit('removePath')
			}
			commit('updataPath',obj)
		},
	},
}