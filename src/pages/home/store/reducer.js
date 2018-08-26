import { fromJS } from 'immutable'
import * as types from './actionTypes.js'
//用fromjs包装immutable
const defaultState=fromJS({
	usernum:200,
    ordernum:201,	
    productnum:202
})
//reducer是一个纯函数，输入和输出都固定，里面不能有随机数 Math.random()，时间new Date()
//reducer负责处理逻辑但不改变数据，数据改变由store负责
export default((state=defaultState,action)=>{
	if(action.type===types.SETCOUNT){
		return state.merge({
			usernum:action.payload.usernum,
		    ordernum:action.payload.ordernum,	
		    productnum:action.payload.productnum
		})
	}
	return state
})