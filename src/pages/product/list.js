import React,{ Component } from 'react';
import Mylayout from '../../common/layout/layout.js'
import { Breadcrumb ,Button,Table,Divider,InputNumber,Switch,Input } from 'antd';
import { connect } from 'react-redux';
import { actionCreater } from './store/index.js'
import {
  Link
} from 'react-router-dom';

const Search = Input.Search;
class ProductList extends Component{

	componentDidMount(){
		//获取第几级ID的第几页，第二个参数是页码
		this.props.handlePage(1)
	}
	//当数据更新时，生命周期函数执行componentDidUpdata
	render(){
		const {keyword}=this.props;
		const columns = [
		{
		  title: 'ID',
		  dataIndex: 'id',
		  key: 'id'
		}, 
		{
		  title: '商品名称',
		  dataIndex: 'name',
		  key: 'name',
		  render:(name)=>{
		  	if(keyword){
		  		let reg=new RegExp("("+keyword+")",'ig')
		  		let html=name.replace(reg,'<b style="color:red">$1</b>')
		  		return <span dangerouslySetInnerHTML={{ __html:html }}></span>
		  	}else{
		  		return name
		  	}
		  }
		}, 
		{
		  title: '状态',
		  dataIndex: 'status',
		  key: 'status',
		  render:(order,record)=>{
		  	return (
		  		<span>
		  			<Switch 
		  			checkedChildren="在售"
		  			unCheckedChildren="下架" 
		  			defaultChecked={record.status==='0' ? true : false} 
		  			onChange={(checked)=>{
		  				this.props.handleStatus(record.id,checked ? 0 :1)
		  			}}
		  			/>
		  		</span>	
		  		)
		  }
		}, 
		{
		  title: '排序',
		  dataIndex: 'order',
		  key: 'order',
		  render:(order,record)=>{
		  	return <InputNumber defaultValue={order} 
		  		onBlur={(e)=>{
		  			this.props.handleOrder(record.id,e.target.value)
		  		}}
		  	 />
		  }
		},
		{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (//record是当前的意思
		    <span>
		       <Link to={'/product/add/'+record.id}>
		      	编辑 
		      </Link>
		      <Divider type="vertical" />
		      <Link to={'/product/detail/'+record.id}>
		      	查看
		      </Link>
		    </span>

		  )
		}
		];
		const data=this.props.list.map((product)=>{
	      return {
	        key:product.get('_id'),
	        id:product.get('_id'),
	        name:product.get('name'),
	        order:product.get('order'),
	        status:product.get('status')
	      }
	    }).toJS()
		
		return(
			<Mylayout>
				<Breadcrumb.Item>商品管理</Breadcrumb.Item>
				<Breadcrumb.Item>商品分类</Breadcrumb.Item>
				
				<div className="clearfix">
					<Link to='/product/add'>
			          <Button type="primary" style={{ float:"right" }}>添加</Button>
			        </Link>
				</div>
			         <Search 
			         style={{ width: 200 }}
			         placeholder="请输入关键字"	
			         enterButton
			         onSearch={value =>{
			         	console.log(value)
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
    isPageFetching:state.get('product').get('isPageFetching'),
    current:state.get('product').get('current'),
    pageSize:state.get('product').get('pageSize'),
    total:state.get('product').get('total'),
    list:state.get('product').get('list'),
    keyword:state.get('product').get('keyword'),
  }
}
//把方法映射到组件的props上,这个函数要把dispatch方法穿进去
const mapDispatchToProps=(dispatch)=>{
  return {
    handlePage(page){
      const action=actionCreater.getPageAction(page)
      dispatch(action)
    },
	handleOrder(id,newOrder){
		dispatch(actionCreater.UpdateOrderAction(id,newOrder));
	},
	handleStatus(id,newStatus){
		dispatch(actionCreater.handleStatusAction(id,newStatus));
	},
	handleSearch(keyword,page){
		dispatch(actionCreater.handleSearchAction(keyword,page));
	}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductList);