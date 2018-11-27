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
const SetHlepstate=()=>({
    type:types.SETSTATE_ERR
})
const SetErrorImg=()=>({
    type:types.ERRORIMG
})
export const getAddcatogoryAction=(err,values)=>{
	//返回一个函数
	return (dispatch,getState)=>{
    const state=getState().get('product')
    const categoryId=state.get('categoryId')

    let isError=false;
    const image=state.get('FileList')
    if(!categoryId){
      dispatch(SetHlepstate())
      isError=true;
    }
    if(!image){
      dispatch(SetErrorImg())
      isError=true;
    }
    if(err){
      return
    }
    //新增处理
    let method='post'
    //编辑处理
    if(values.id){
      method='put'
    }
    dispatch(AddRequsetAction())
        Request({
            method:method,
            url: 'http://127.0.0.1:3001/product/shopmall',
            data:{
              ...values,
              categoryId:categoryId,
              FileList:state.get('FileList'),
              value:state.get('value')
            }
          })
          .then((result)=>{

            if(result.code===0){
            message.success('添加分类成功')
              window.location.href='/product'
            }else if(result.code===1){
              message.error(result.message)
            }
          })
          .catch((err)=>{
          message.error('网络错误，请稍后再试 ')
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
export const getPageAction=(page)=>{
  //返回一个函数
  return (dispatch)=>{
    dispatch(GetPageRequestAction())

        Request({
            method: 'get',
            url: 'http://127.0.0.1:3001/product',
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
export const getShowUpdateModalAction = (updateId,updateName)=>{
  return {
    type:types.SHOW_UPDATE_MODAL,
    payload:{
      updateId,
      updateName
    }
  }
}
export const getChangeNameAction =(payload)=>{
  return {
    type:types.CHANGE_NAME,
    payload
  }
}
export const CloseUpdateModelAction =()=>{
  return{
  type:types.CLOSE_UPDATE_MODEL
  }
}
export const getUpdateNameAction =(pid)=>{
  
  return (dispatch,getState)=>{
    //getState方法会返回整个数据
      const state=getState().get('category')
        Request({
            method: 'put',
            url: 'http://127.0.0.1:3001/category/updateName',
            data:{
              id:state.get('updateId'),
              name:state.get('updateName'),
              pid:pid,
              page:state.get('current')
            }
          })
          .then((result)=>{
            if(result.code===0){
              dispatch(SetcodeAction(result.data))
              dispatch(CloseUpdateModelAction())
              
            }else{
              message.error(result.message)
            }
          })
          .catch((err)=>{
              message.error('网络错误，请稍后再试 ')
          })
           
  }
}
//排序
export const UpdateOrderAction =(id,newOrder)=>{
  
  return (dispatch,getState)=>{
    //getState方法会返回整个数据
      const state=getState().get('product')
        Request({
            method: 'put',
            url: 'http://127.0.0.1:3001/product/updateOrder',
            data:{
              id:id,
              order:newOrder,
              page:state.get('current')
            }
          })
          .then((result)=>{
            if(result.code===0){
              dispatch(SetcodeAction(result.data))
              
            }else{
              message.error(result.message)
            }
          })
          .catch((err)=>{
              message.error('网络错误，请稍后再试 ')
          })
           
  }
}

//上下架
export const handleStatusAction =(id,newStatus)=>{
  
  return (dispatch,getState)=>{
    //getState方法会返回整个数据
      const state=getState().get('product')
        Request({
            method: 'put',
            url: 'http://127.0.0.1:3001/product/getStatus',
            data:{
              id:id,
              status:newStatus,
              page:state.get('current')
            }
          })
          .then((result)=>{
            if(result.code===0){
              message.success(result.message)
            }else{
              dispatch(SetcodeAction(result.data))
              message.error(result.message)
            }
          })
          .catch((err)=>{
              message.error('网络错误，请稍后再试 ')
          })
           
  }
}
const setProductDetail=(payload)=>{
  return({
    type:types.SETPRODUCT_DETAIL,
    payload
  })
}
//编辑
export const getProductDetailAction =(productId)=>{
  
  return (dispatch)=>{
        Request({
            method: 'get',
            url: 'http://127.0.0.1:3001/product/detail',
            data:{
              id:productId
            }
          })
          .then((result)=>{
            if(result.code===0){
              console.log(result)
              dispatch(setProductDetail(result.data))
            }
            
          })
          .catch((err)=>{
              message.error('网络错误，请稍后再试 ')
          })
           
  }
}
//查询
export const handleSearchAction =(keyword,page=1)=>{
  
  return (dispatch)=>{
        Request({
            method: 'get',
            url: 'http://127.0.0.1:3001/product/search',
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