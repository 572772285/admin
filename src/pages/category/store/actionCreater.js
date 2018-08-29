import * as types from './actionTypes.js';
import { message } from 'antd';
import { Request } from '../../../until/'
//使用redux中间件后return可以接受函数
const AddRequsetAction=()=>{
  return ({
    type:types.ADD_VALUE
  })
}
const AddDownAction=()=>{
  return ({
    type:types.ADD_DONE
  })
}
const SetOneCategory=(payload)=>{
  return ({
    type:types.SET_ONE_CATEGORY,
    payload
  })
}

//list
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
export const getAddcatogoryAction=(values)=>{
	//返回一个函数
	return (dispatch)=>{
    dispatch(AddRequsetAction())
        Request({
            method:'post',
            url: 'http://127.0.0.1:3001/category',
            data:values
          })
          .then((result)=>{
            if(result.code===0){
              if(result.data){
                dispatch(SetOneCategory(result.data))
              }
              message.success('添加分类成功')
            }else if(result.code===1){
              message.error(result.message)
            }
            dispatch(AddDownAction())
          })
          .catch((err)=>{
          message.error('网络错误，请稍后再试 ')
            console.log(err)
          })
           
	}
}
export const getOneCategoryAction=()=>{
  //返回一个函数
  return (dispatch)=>{
    dispatch(AddRequsetAction())
        Request({
            method:'get',
            url: 'http://127.0.0.1:3001/category',
            data:{
              pid:0
            }
          })
          .then((result)=>{
            if(result.code===0){
              dispatch(SetOneCategory(result.data))
            }else if(result.code===1){
              message.error(result.message)
            }
            dispatch(AddDownAction())
          })
          .catch((err)=>{
          message.error('网络错误，请稍后再试 ')
            console.log(err)
          })
  }
}
export const getPageAction=(pid,page)=>{
  //返回一个函数
  return (dispatch)=>{
    dispatch(GetPageRequestAction())

        Request({
            method: 'get',
            url: 'http://127.0.0.1:3001/category',
            data:{
              pid:pid,
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
export const getShowUpdateModalAction = (updateId,updateName)=>{
  return {
    type:types.SHOW_UPDATE_MODAL,
    payload:{
      updateId,
      updateName
    }
  }
}