import React,{ Component } from 'react';
import { Card } from 'antd';
import Mylayout from '../../common/layout/layout.js';
import { connect } from 'react-redux';
import { actionCreater } from './store';
import './index.css'
class Home extends Component{
	componentDidMount(){
	    this.props.handleInit()
	}
	render(){
		return(
			<Mylayout>
				<Card className="Home" title="用户数" hoverable={true}>
					<p>{this.props.usernum}</p>
				</Card>
				<Card className="Home" title="订单数" hoverable={true}>
					<p>{this.props.ordernum}</p>
				</Card>
				<Card className="Home" title="商品数" hoverable={true}>
					<p>{this.props.productnum}</p>
				</Card>
			</Mylayout>
		)
	}

}
//第一个参数是store里面的state映射到组件的props上
const mapStateToProps=(state)=>{
  return {
    usernum:state.get('home').get('usernum'),
    ordernum:state.get('home').get('ordernum'),
    productnum:state.get('home').get('productnum')
  }
}
//把方法映射到组件的props上,这个函数要把dispatch方法穿进去
const mapDispatchToProps=(dispatch)=>{
  return {
    handleInit(){
      const action=actionCreater.getHomeaction()
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);