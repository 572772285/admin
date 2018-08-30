
import React,{ Component } from 'react';
import Mylayout from '../../common/layout/layout.js';
import { Breadcrumb,Button} from 'antd';
import {
  Link
} from 'react-router-dom';
class Product extends Component{

	render(){
		return(
			<Mylayout>
				<Breadcrumb>
						<Breadcrumb.Item>分类管理</Breadcrumb.Item>
						<Breadcrumb.Item>添加分类</Breadcrumb.Item>
				</Breadcrumb>
				<Link to='/product/add'>
			          <Button type="primary" style={{ float:"right" }}>添加</Button>
			    </Link>
			</Mylayout>
		)
	}

}


export default Product;