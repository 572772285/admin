import React,{Component} from 'react';
import {Table} from 'antd';
import { actionCreater } from './store';
import { connect } from 'react-redux';
import Layout from '../../common/layout/layout.js';
import moment from 'moment'
const columns = [
{
  title: '用户名',
  dataIndex: 'username',
  key: 'username'
}, 
{
  title: '是否是管理员',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
  //这个render方法
  render:isAdmin=>( isAdmin ? '是' : '否')
},
{
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
},
{
  title: '手机',
  dataIndex: 'phone',
  key: 'phone',
},
{
  title: '注册时间',
  dataIndex: 'createAt',
  key: 'createAt',
}
];


class User extends Component{
	componentDidMount(){
	    this.props.handlePage(1)
	}
	render(){
    const data=this.props.list.map((user)=>{
      return {
        key:user.get('_id'),
        username:user.get('username'),
        isAdmin:user.get('isAdmin'),
        phone:user.get('phone'),
        email:user.get('email'),
        createAt: moment(user.get('createAt')).format('YYYY-MM-DD HH:mm:ss')
      }
    }).toJS()
		return(
			<Layout>
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
        		spinning:this.props.isFetching,
        		tip:'小阳正在努力为你加载中'
	       	}
        }
        />
			</Layout>
		)
	}
}
//第一个参数是store里面的state映射到组件的props上
const mapStateToProps=(state)=>{
  return {
    isFetching:state.get('user').get('isFetching'),
    current:state.get('user').get('current'),
    pageSize:state.get('user').get('pageSize'),
    total:state.get('user').get('total'),
    list:state.get('user').get('list')
  }
}
//把方法映射到组件的props上,这个函数要把dispatch方法穿进去
const mapDispatchToProps=(dispatch)=>{
  return {
    handlePage(page){
      const action=actionCreater.getPageAction(page)
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(User);
// export default User