import { fromJS } from 'immutable'
import * as types from './actionTypes.js'
//用fromjs包装immutable
const defaultState=fromJS({
	isAddFetching:false,
	setOneCategory:[],
	isPageFetching:false,
    current:1,
    pageSize:10,
    total:50,
    list:[],//immutable对象
    updateModelVisible:false,
    updateId:'',
    updateName:""
})
//reducer是一个纯函数，输入和输出都固定，里面不能有随机数 Math.random()，时间new Date()
//reducer负责处理逻辑但不改变数据，数据改变由store负责
export default((state=defaultState,action)=>{
	if(action.type===types.ADD_VALUE){
		return state.set('isFetching',true)
	}
	if(action.type===types.ADD_DONE){
		return state.set('isFetching',false)
	}
	if(action.type===types.SET_ONE_CATEGORY){
		return state.set('setOneCategory',fromJS(action.payload))
	}
	if(action.type===types.PAGE_VALUE){
		return state.set('isPageFetching',true)
	}
	if(action.type===types.PAGE_DONE){
		return state.set('isPageFetching',false)
	}
	if(action.type===types.PAGE_CODE){
		return state.merge({
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			list:fromJS(action.payload.list)
		})
	}
	if(action.type===types.SHOW_UPDATE_MODAL){
		return state.merge({
			updateModelVisible:true,
			updateId:action.payload.updateId,
			updateName:action.payload.updateName,
		})
	}
	if(action.type===types.CHANGE_NAME){
		return state.set('updateName',action.payload)
	}
	if(action.type===types.CLOSE_UPDATE_MODEL){
		return state.set('updateModelVisible',false)
	}
	return state
})