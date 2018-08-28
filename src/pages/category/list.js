import React,{ Component } from 'react';
import Mylayout from '../../common/layout/layout.js'
import { Breadcrumb ,Button,Table,Divider,InputNumber } from 'antd';
import { connect } from 'react-redux';
import { actionCreater } from './store/index.js'
import {
  Link
} from 'react-router-dom';

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
  
},
{
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a>更改分类 {record.name}</a>
      <Divider type="vertical" />
      <Link to={'/category/'+record.id}>查看子分类</Link>
    </span>
  ),
}
];
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
		console.log(preProps)
		console.log(this.props)
		let oldPath=preProps.location.pathname
		let newPath=this.props.location.pathname
		if(oldPath!==newPath){
			let newParams=this.props.match.params.pid
			this.setState({
				pid:newParams
			})
		}
	}
	render(){
		const data=this.props.list.map((category)=>{
	      return {
	        key:category.get('_id'),
	        id:category.get('_id'),
	        name:category.get('name'),
	        order:<InputNumber min={1} max={10} defaultValue={category.get('order')} />
	      }
	    }).toJS()
		const pid=this.state.pid
		return(
			<Mylayout>
				<Breadcrumb.Item>分类管理</Breadcrumb.Item>
				<Breadcrumb.Item>添加分类</Breadcrumb.Item>
				<div className="clearfix">
					<h4 style={{ float:"left" }}>父类id:{ pid}</h4>
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
        	this.props.handlePage(pagination.current)
        }}
        loading={
        	{
        		spinning:this.props.isPageFetching,
        		tip:'小阳正在努力为你加载中'
	       	}
        }
        />
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
    list:state.get('category').get('list')
  }
}
//把方法映射到组件的props上,这个函数要把dispatch方法穿进去
const mapDispatchToProps=(dispatch)=>{
  return {
    handlePage(pid,page){
      const action=actionCreater.getPageAction(pid,page)
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(List);