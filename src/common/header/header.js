import React,{ Component } from 'react';
import { Layout, Menu, Dropdown, Button,Icon } from 'antd';
import './index.css'
import { getUserName,Request,removeUserName } from '../../until/index.js'
	const { Header } = Layout;
class MyHeader extends Component{
	constructor(props){
		super(props)
		this.handleLogOut=this.handleLogOut.bind(this)
	}
	handleLogOut(){
		Request({
	        method: 'get',
	        url: 'http://127.0.0.1:3001/user/logout',
	    })
	    .then((result)=>{
	    	removeUserName()
	    	window.location.href='/login'
	    })
	}


	render(){
		const menu = (
		  <Menu>
		    <Menu.Item>
		      <a onClick={ this.handleLogOut }><Icon type="logout" />退出</a>
		    </Menu.Item>
		  </Menu>
		)
		return(
	<div className="Header">
		<Header className="header">
	      <div className="logo">SHOPING MALL</div>
	       <div className="dropDown">
		    <Dropdown overlay={menu} placement="bottomCenter">
		      <Button>{ getUserName() }</Button>
		    </Dropdown>
		  </div>
	    </Header>
	</div>
		)
	}

}


export default MyHeader;