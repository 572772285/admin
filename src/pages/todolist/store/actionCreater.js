import * as types from './actionTypes.js';
import axios from 'axios';
export const changeValueAction=(payload)=>{
	return {
		type:types.CHANGE_VALUE,
		payload:payload
	}
}
export const addItemAction=()=>{
	return {
		type:types.ADD_ITEM,
	}
}
export const delItemAction=(index)=>{
	return {
		type:types.DEL_ITEM,
		payload:index
	}
}
const loadInitDataAction=(payload)=>{
	return {
		type:types.LOAD_INIT,
		payload:payload
	}
}
//使用redux中间件后return可以接受函数
export const getServerDateAction=(payload)=>{
	//返回一个函数
	return (dispatch)=>{
		axios 
	    .get('http://127.0.0.1:3001/api/getData')
	    .then((data)=>{
	      const action=loadInitDataAction(data.data)
	      //返回一个dispatch方法，返回自身
	      dispatch(action)
	    })
	    .catch((e)=>{
	      console.log('err::',e)
	    })
	}
}