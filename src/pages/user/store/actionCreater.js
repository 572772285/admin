import * as types from './actionTypes.js';
import { message } from 'antd';
import { Request } from '../../../until/'
//使用redux中间件后return可以接受函数
const GetPageRequestAction=()=>{
	return ({
		type:types.PAGE_VALUE
	})
}
const GetPageDownAction=()=>{
	return({
		type:types.PAGE_DONE
	})
}
const SetcodeAction=(payload)=>{
  return({
    type:types.PAGE_CODE,
    payload
  })
}
export const getPageAction=(page)=>{
	//返回一个函数
	return (dispatch)=>{
		dispatch(GetPageRequestAction())

        Request({
            method: 'get',
            url: 'http://127.0.0.1:3001/admin/users',
            data:{
              page:page
            }
          })
          .then((result)=>{
            if(result.code===0){
              dispatch(SetcodeAction(result.data))
            }else if(result.code===1){
              message.error(result.message)
            }
            dispatch(GetPageDownAction())
          })
          .catch((err)=>{
          message.error('网络错误，请稍后再试 ')
          dispatch(GetPageDownAction())
            console.log(err)
          })
           
	}
}