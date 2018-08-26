import * as types from './actionTypes.js';
import { message } from 'antd';
import { Request } from '../../../until/'
//使用redux中间件后return可以接受函数
const setCount=(payload)=>{
	return({
		type:types.SETCOUNT,
    payload
	})
}
export const getHomeaction=()=>{
	//返回一个函数
	return (dispatch)=>{
        Request({
            url: 'http://127.0.0.1:3001/admin/home',
          })
          .then((result)=>{
            if(result.code===0){
              dispatch(setCount(result))
              console.log(result.data)
            }else if(result.code===1){
              message.error(result.message)
            }
          })
          .catch((err)=>{
          message.error('网络错误，请稍后再试 ')
            console.log(err)
          })
           
	}
}