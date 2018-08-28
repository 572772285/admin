import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
class ErrorPage extends Component{

	render(){
		return(
			<div className="errorPage">
				<Link to="/">返回首页</Link>
				页面出错了。。。
			</div>
		)
	}

}


export default ErrorPage;