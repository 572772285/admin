import { fromJS } from 'immutable'
import * as types from './actionTypes.js'
//用fromjs包装immutable
const defaultState=fromJS({
    isFetching:false,
    current:1,
    pageSize:10,
    total:50,
    list:[]//immutable对象
})
//reducer是一个纯函数，输入和输出都固定，里面不能有随机数 Math.random()，时间new Date()
//reducer负责处理逻辑但不改变数据，数据改变由store负责
export default((state=defaultState,action)=>{
	if(action.type===types.PAGE_VALUE){
		return state.set('isFetching',true)
	}
	if(action.type===types.PAGE_DONE){
		return state.set('isFetching',false)
	}
	if(action.type===types.PAGE_CODE){
		return state.merge({
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			list:fromJS(action.payload.list)
		})
	}
	return state
})