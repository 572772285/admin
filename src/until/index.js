
import axios from 'axios';
//定义一个公用的发送Ajax方法
export const Request=(options)=>{
	return new Promise((resolve,reject)=>{
		axios({
            method: options.method||'get',
            url: options.url,
            data:options.data||null,
            withCredentials: true
          })
		.then((result)=>{
			console.log(result)
			let data=result.data
			if(data.code===10){
				removeUserName()
				window.location.href='/login';
				reject(data.message)
			}
			resolve(data)
		})
		.catch((e)=>{
			reject(e)
		})
	})
}
//设置localStorage
export const setUserName = (username)=>{
	window.localStorage.setItem('username',username)
}
//获取localStorage
export const getUserName = ()=>{
	return window.localStorage.getItem('username')
}
//删除localStorage
export const removeUserName = ()=>{
	window.localStorage.removeItem('username')
}