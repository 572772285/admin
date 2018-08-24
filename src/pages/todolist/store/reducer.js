import * as types from './actionTypes.js'
import { fromJS } from 'immutable'
//用fromjs包装immutable
const defaultState=fromJS({
	value:'',
    list:[]
})
//reducer是一个纯函数，输入和输出都固定，里面不能有随机数 Math.random()，时间new Date()
//reducer负责处理逻辑但不改变数据，数据改变由store负责
export default((state=defaultState,action)=>{
	if(action.type===types.CHANGE_VALUE){
		/*
		//改变store上的value要做深拷贝
		const newState=JSON.parse(JSON.stringify(state))
		newState.value=action.payload
		return newState
		*/
		return state.set('value',action.payload)
	}
	if(action.type===types.ADD_ITEM){
		/*
		const newState=JSON.parse(JSON.stringify(state))
		newState.list.push(newState.value)
		newState.value=''
		return newState
		*/
		//获取list的值
		const newList=[...state.get('list'),state.get('value')]
		return state.merge({
			list:newList,
			value:''
		})
	}
	if(action.type===types.DEL_ITEM){
		/*
		const newState=JSON.parse(JSON.stringify(state))
		newState.list.splice(action.payload,1)
		return newState
		*/
		const newList=[...state.get('list')]
		newList.splice(action.payload,1)//删除后的list
		//把删除后的list放到list里
		return state.set('list',newList)
	}
	if(action.type===types.LOAD_INIT){
		/*
		const newState=JSON.parse(JSON.stringify(state))
		newState.list=action.payload
		return newState
		*/
		return state.set('list',action.payload)
	}
	return state
})