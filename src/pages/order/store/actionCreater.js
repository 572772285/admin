import * as types from './actionTypes.js';
import { message } from 'antd';
import { Request } from '../../../until/'


export const getSetCategoryAction=(parentCategoryId,categoryId)=>({
      type:types.SET_CATEGORY,
      payload:{
        parentCategoryId,
        categoryId
      }

})
export const getImgageAction=(FileList)=>({
  type:types.GET_IMAGE,
  payload:FileList
})
export const getDetailImgageAction=(value)=>({
  type:types.GET_DETAIL_IMAGE,
  payload:value
})



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



export const getPageAction=(page)=>{
  //返回一个函数
  return (dispatch)=>{
    dispatch(GetPageRequestAction())

        Request({
            method: 'get',
            url: 'http://127.0.0.1:3001/order/orderList',
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


//查询
export const handleSearchAction =(keyword,page=1)=>{
  
  return (dispatch)=>{
        Request({
            method: 'get',
            url: 'http://127.0.0.1:3001/order/search',
            data:{
              keyword:keyword,
              page:page
            }
          })
          .then((result)=>{
            if(result.code===0){
              console.log(result)
              dispatch(SetcodeAction(result.data))
            }
            
          })
          .catch((err)=>{
              message.error('网络错误，请稍后再试 ')
          })
           
  }
}

const setOrderDetail=(payload)=>{
  return({
    type:types.SETORDER_DETAIL,
    payload
  })
}
//编辑
export const getOrderDetailAction =(orderNo)=>{
  
  return (dispatch)=>{
        Request({
            method: 'get',
            url: 'http://127.0.0.1:3001/order/detail',
            data:{
              orderNo:orderNo
            }
          })
          .then((result)=>{
            if(result.code===0){
              dispatch(setOrderDetail(result.data))
            }
            
          })
          .catch((err)=>{
              message.error('网络错误，请稍后再试 ')
          })
           
  }
}


//发货
export const getOrderDeliverAction =(orderNo)=>{
  
  return (dispatch)=>{
        Request({
            method: 'put',
            url: 'http://127.0.0.1:3001/order/fahuo',
            data:{
              orderNo:orderNo
            }
          })
          .then((result)=>{
            if(result.code===0){
              console.log(result)
              dispatch(setOrderDetail(result.data))
            }
            
          })
          .catch((err)=>{
              message.error('网络错误，请稍后再试 ')
          })
           
  }
}