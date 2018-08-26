import * as types from './actionTypes.js';
import { message } from 'antd';
import { Request,setUserName } from '../../../until/'
//使用redux中间件后return可以接受函数
const LoginValue=()=>{
	return ({
		type:types.LOGIN_VALUE
	})
}
const LoginDone=()=>{
	return({
		type:types.LOGIN_DONE
	})
}
export const getLoginaction=(values)=>{
	//返回一个函数
	return (dispatch)=>{
		dispatch(LoginValue())

        Request({
            method: 'post',
            url: 'http://127.0.0.1:3001/admin/login',
            data:values
          })
          .then((result)=>{
            if(result.code===0){
            	//存储用户信息
            	setUserName(result.data.username)
              window.location.href='/'
            }else if(result.code===1){
              message.error(result.message)
              dispatch(LoginDone())
            }
          })
          .catch((err)=>{
          message.error('网络错误，请稍后再试 ')
            console.log(err)
          })
           
	}
}