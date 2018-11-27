import React,{ Component } from 'react';
import Mylayout from '../../common/layout/layout.js'
import { Breadcrumb,Button,Popconfirm } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment'
import { actionCreater } from './store/index.js';
import '../../common/rich-eiditor/index.css'
import './detail.css'
class OrderDetail extends Component{
	constructor(props){
		super(props)
		this.state={
			orderNo:this.props.match.params.orderNo
		}
	}
	componentDidMount(){
	    if(this.state.orderNo){
	    	this.props.handleOrderDetail(this.state.orderNo)
	    }
	}

	render(){
		console.log(this.props.orderDetail)
		const {
			orderNo,
			createdAt,
			paymentTypeDesc,
			productList,
			shipping,
			payment,
			status,
			statusDesc,

		}=this.props.orderDetail
		let createdTime='';
		if(createdAt){
			createdTime=moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
		}
		// const { getFieldDecorator } = this.props.form;
	    // const tailFormItemLayout = {
		   //  wrapperCol: {
		   //      xs: {
		   //        span: 10,
		   //        offset: 0,
		   //      },
		   //      sm: {
		   //        span: 16,
		   //        offset: 8,
		   //     	},
		   //  },
	    // };
		return(
			
			<Mylayout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>
							商品详情
						</Breadcrumb.Item>
					</Breadcrumb>
					{
					orderNo
						?<div className="order-detail">
						<div className="panel">
							<h2 className="panel-header">订单信息</h2>
							<div className="panel-body">
								<ul className="order-info">
									<li className="order-no">
										<span className="lable">订单号:</span>
										<span className="text">{orderNo}</span>
										
									</li>
									<li className="order-create-time">
										<span className="lable">创建时间:</span>
										<span className="text">{createdTime}</span>
										
									</li>
									<li className="order-shipping-address">
										<span className="lable">收件地址:</span>
										<span className="text">{shipping.province}
											{shipping.city}{shipping.address}
											(邮编：{shipping.zip})
										</span>
									</li>
									<li className="order-shipping-name">
										<span className="lable">收件人:</span>
										<span className="text">
											{shipping.name}(电话：{shipping.phone})
										</span>
									</li>
									<li className="order-payment-type">
										<span className="lable">支付方式:</span>
										<span className="text">
											{paymentTypeDesc}
										</span>
									</li>
									<li className="order-status">
										<span className="lable">支付状态:</span>
										<span className="text">
											{statusDesc}
										</span>
									</li>
									<li className="order-payment">
										<span className="lable">价格：￥</span>
										<span className="text">
											{payment}
										</span>
									</li>
									<li className="order-opreation">
										{
											status==='30'
											?<Popconfirm placement="topLeft" title={'确定发货吗？'} onConfirm={()=>{
												this.props.handleOrderDeliver(orderNo)
											}} okText="发货" cancelText="取消">
											<Button type="primary">发货</Button>
											</Popconfirm>
											:null
										}
									</li>
								</ul>
							</div>
						</div>
						<div className="panel ">
							<h2 className="panel-header">商品详情</h2>
							<div className="panel-body">
								<ul className="cart-title clearfix">
									<li className="product-info">商品信息</li>
									<li className="product-price">单价</li>
									<li className="product-count">数量</li>
									<li className="product-totalPrice">小计</li>
								</ul>
								{
									productList.map((product,index)=>{
									return	<ul className="cart-item clearfix" key={index}>
											<li className="product-info">
												<a href={'/product/detail/'+product.product} className="link" target="_blank">
													<img src={product.FileList.split(',')[0]} alt="" />
													<span>{product.name}</span>
												</a>
											</li>
											<li className="product-price">
												￥{product.price}
											</li>
											<li className="product-count">
												<span>{product.count}</span>
											</li>
											<li className="product-totalPrice">
												￥{product.totalPrice}
											</li>
										</ul>
									})
								}

							</div>
						</div>
					</div>
					:null
					}
					
				</div>
			</Mylayout>

		)
	}

}
const mapStateToProps=(state)=>{
  return {
	orderDetail:state.get('order').get('orderDetail'),
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    handleOrderDetail(orderNo){
    	dispatch(actionCreater.getOrderDetailAction(orderNo))
    },
    handleOrderDeliver(orderNo){
    	dispatch(actionCreater.getOrderDeliverAction(orderNo))
    },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail);