import React,{ Component } from 'react';
import { Layout } from 'antd';
import MyHeader from '../header/header.js'
import MySider from '../sider/sider.js'
const { Content } = Layout;
class Mylayout extends Component{

	render(){
		return(
			  <Layout>
			    <MyHeader />
			    <Layout>
			      <MySider />
			      <Layout style={{ padding: '0 24px 24px' }}>
			        
			        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
			          {this.props.children}
			        </Content>
			      </Layout>
			    </Layout>
			  </Layout>
		)
	}

}


export default Mylayout;