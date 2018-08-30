import React,{ Component } from 'react';
import Mylayout from '../../common/layout/layout.js'
import { Breadcrumb ,Button,Table,Divider,InputNumber,Modal,Input } from 'antd';
import { connect } from 'react-redux';
import { actionCreater } from './store/index.js'
import {
  Link
} from 'react-router-dom';


class List extends Component{
	constructor(props){
		super(props);
		this.state={
			pid:this.props.match.params.pid||0
		}
	}
	componentDidMount(){
		//获取第几级ID的第几页，第二个参数是页码
		this.props.handlePage(this.state.pid,1)
	}
	//当数据更新时，生命周期函数执行componentDidUpdata
	componentDidUpdate(preProps,preState){
		//上一个
		// console.log(preProps)
		//当前
		// console.log(this.props)
		let oldPath=preProps.location.pathname
		let newPath=this.props.location.pathname
		if(oldPath!==newPath){
			let newPid=this.props.match.params.pid||0
			this.setState({
				pid:newPid
			},()=>{
				this.props.handlePage(newPid,1)
			})
		}
	}
	render(){
		const pid=this.state.pid
		const columns = [
		{
		  title: 'ID',
		  dataIndex: 'id',
		  key: 'id'
		}, 
		{
		  title: '分类名称',
		  dataIndex: 'name',
		  key: 'name'
		}, 
		{
		  title: '排序',
		  dataIndex: 'order',
		  key: 'order',
		  render:(order,record)=>{
		  	return <InputNumber defaultValue={order} 
		  		onBlur={(e)=>{
		  			console.log(pid,record.id,e.target.value)
		  			this.props.handleOrder(pid,record.id,e.target.value)
		  		}}
		  	 />
		  }
		},
		{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (//record是当前的意思
		    <span>
		      <a 
		      onClick={()=>{
		      	this.props.showUpdateModal(record.id,record.name)
		      	console.log(record.id,record.name)
		      }
		      }
		      >更改分类</a>
		      <Divider type="vertical" />
		      <Link to={'/category/'+record.id}>查看子分类</Link>
		    </span>
		  )
		}
		];
		const data=this.props.list.map((category)=>{
	      return {
	        key:category.get('_id'),
	        id:category.get('_id'),
	        name:category.get('name'),
	        order:category.get('order'),
	        pid:category.get('pid')
	      }
	    }).toJS()
		
		return(
			<Mylayout>
				<Breadcrumb.Item>分类管理</Breadcrumb.Item>
				<Breadcrumb.Item>添加分类</Breadcrumb.Item>
				<div className="clearfix">
					<h4 style={{ float:"left" }}>父类id:{ pid }</h4>
					<Link to='/category/add'>
			          <Button type="primary" style={{ float:"right" }}>添加</Button>
			        </Link>
				</div>
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
			        	this.props.handlePage(pid,pagination.current)
			        }}
			        loading={
			        	{
			        		spinning:this.props.isPageFetching,
			        		tip:'小阳正在努力为你加载中'
				       	}
			        }
			        />
			         <Button type="primary" onClick={this.showModal}>Open</Button>
			        <Modal
			          title="修改分类名称"
			          visible={this.props.updateModelVisible}
			          onOk={()=>{
			          	this.props.handleUpdateName(pid)
			          }}
			          onCancel={this.props.handleCloseUpdateModel}
			        >
			        <Input 
			        	value={this.props.updateName}
			        	onChange={(e)=>{
			        		console.log(e.target.value)
			        		this.props.handelChangeName(e.target.value)
			        	}}
			        />
			        </Modal>
			</Mylayout>

		)
	}

}
//第一个参数是store里面的state映射到组件的props上
const mapStateToProps=(state)=>{
  return {
    isPageFetching:state.get('category').get('isPageFetching'),
    current:state.get('category').get('current'),
    pageSize:state.get('category').get('pageSize'),
    total:state.get('category').get('total'),
    list:state.get('category').get('list'),
    updateModelVisible:state.get('category').get('updateModelVisible'),
    updateName:state.get('category').get('updateName'),
    updateId:state.get('category').get('updateId')
  }
}
//把方法映射到组件的props上,这个函数要把dispatch方法穿进去
const mapDispatchToProps=(dispatch)=>{
  return {
    handlePage(pid,page){
      const action=actionCreater.getPageAction(pid,page)
      dispatch(action)
    },
    showUpdateModal:(updateId,updateName)=>{
		dispatch(actionCreater.getShowUpdateModalAction(updateId,updateName));
	},
	handelChangeName:(newName)=>{
		dispatch(actionCreater.getChangeNameAction(newName));
	},
	handleUpdateName:(pid)=>{
		dispatch(actionCreater.getUpdateNameAction(pid));
	},
	handleCloseUpdateModel:()=>{
		dispatch(actionCreater.CloseUpdateModelAction());
	},
	handleOrder:(pid,id,newOrder)=>{
		dispatch(actionCreater.UpdateOrderAction(pid,id,newOrder));
	}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(List);