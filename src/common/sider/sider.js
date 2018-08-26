import React,{ Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {NavLink} from 'react-router-dom';
import User from '../../pages/user/index.js'
const { SubMenu } = Menu;
const { Sider } = Layout;
class MySider extends Component{

	render(){
		return(
				 <Sider width={200} style={{ background: '#fff' }}>
			        <Menu
			          mode="inline"
			          defaultSelectedKeys={['1']}
			          defaultOpenKeys={['sub1']}
			          style={{ minHeight: 600, borderRight: 0 }}
			        >
			          <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
			            <Menu.Item key="1">
			            	<NavLink exact to='/'><Icon type="home" />首页</NavLink>
			            </Menu.Item>
			            <Menu.Item key="2">
			            	<NavLink  to='/user'><Icon type="user" />用户列表</NavLink>
			            </Menu.Item>
			            <Menu.Item key="3">
			            	<NavLink  to='/class'><Icon type="database" />分类管理</NavLink>
			            </Menu.Item>
			            <Menu.Item key="4">
			            	<NavLink  to='/shop'><Icon type="book" />商品管理</NavLink>
			            </Menu.Item>
			          </SubMenu>
			        </Menu>
			      </Sider>
		)
	}

}


export default MySider;