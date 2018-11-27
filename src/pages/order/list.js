import React,{ Component } from 'react';
import Mylayout from '../../common/layout/layout.js'
import { Breadcrumb ,Button,Table,Input } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment'
import { actionCreater } from './store/index.js'
import {
  Link
} from 'react-router-dom';

const Search = Input.Search;
class OrderList extends Component{

	componentDidMount(){
		//获取第几级ID的第几页，第二个参数是页码
		this.props.handlePage(1)
	}
	//当数据更新时，生命周期函数执行componentDidUpdata
	render(){
		const {keyword}=this.props;
		const columns = [
		{
		  title: '订单号',
		  dataIndex: 'orderNo',
		  key: 'orderNo'
		}, 
		{
		  title: '收件人',
		  dataIndex: 'name',
		  key: 'name',
		}, 
		{
		  title: '订单状态',
		  dataIndex: 'statusDesc',
		  key: 'statusDesc',
		}, 
		{
		  title: '订单价格',
		  dataIndex: 'payment',
		  key: 'payment',
		},
		{
		  title: '创建时间',
		  dataIndex: 'createAt',
		  key: 'createAt',
		},
		{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (//record是当前的意思
		    <span>
		      <Link to={'/order/detail/'+record.orderNo}>
		      	查看
		      </Link>
		    </span>

		  )
		}
		];
		const data=this.props.list.map((order)=>{
	      return {
	        key:order.get('orderNo'),
	        orderNo:order.get('orderNo'),
	        name:order.get('shipping').get('name'),
	        statusDesc:order.get('statusDesc'),
	        payment:order.get('payment'),
	        createAt: moment(order.get('createAt')).format('YYYY-MM-DD HH:mm:ss')
	      }
	    }).toJS()
	    console.log(this.props.list)
		
		return(
			<Mylayout>
				<Breadcrumb.Item>订单管理</Breadcrumb.Item>
				<Breadcrumb.Item>订单分类</Breadcrumb.Item>
				
			         <Search 
			         style={{ width: 200 }}
			         placeholder="请输入关键字"	
			         enterButton
			         onSearch={value =>{
			         	this.props.handleSearch(value)
			         }}
			         />

		        	<Table 
			        dataSource={data}
			        columns={columns}
			        pagination={
			          {
			          	current:this.props.current,
			            defaultCurrent:this.props.current,
			            pageSize:this.props.pageSize,
			            total:this.props.total
			          }
			        } 
			        onChange={(pagination)=>{
			        	
			        	if(keyword){
			        		this.props.handleSearch(keyword,pagination.current)
			        	}else{
			        		this.props.handlePage(pagination.current)
			        	}
			        }}
			        loading={
			        	{
			        		spinning:this.props.isPageFetching,
			        		tip:'小阳正在努力为你加载中'
				       	}
			        }
			        />
			         <Button type="primary" onClick={this.showModal}>Open</Button>
			</Mylayout>

		)
	}

}
//第一个参数是store里面的state映射到组件的props上
const mapStateToProps=(state)=>{
  return {
    isPageFetching:state.get('order').get('isPageFetching'),
    current:state.get('order').get('current'),
    pageSize:state.get('order').get('pageSize'),
    total:state.get('order').get('total'),
    list:state.get('order').get('list'),
    keyword:state.get('order').get('keyword'),
  }
}
//把方法映射到组件的props上,这个函数要把dispatch方法穿进去
const mapDispatchToProps=(dispatch)=>{
  return {
    handlePage(page){
      const action=actionCreater.getPageAction(page)
      dispatch(action)
    },
	handleSearch(keyword,page){
		dispatch(actionCreater.handleSearchAction(keyword,page));
	}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(OrderList);