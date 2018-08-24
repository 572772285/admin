import React from 'react';
//定义组件
import './TodoList.css';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Input,Button,Row,Col,List   } from 'antd';
import { actionCreater } from './store';
class TodoList extends React.Component{
  componentDidMount(){
    this.props.handleInit()
  }
  render(){
    return(
      <div className="TodoList">
          <Row>
            <Col span={20}><Input value={this.props.value} onChange={this.props.handleChange} /></Col>
            <Col span={4}><Button type="primary" onClick={this.props.handleAdd}>增加</Button></Col>
          </Row>

          <List
          style={{ marginTop: 16 }}
              bordered
              dataSource={this.props.list}
              renderItem={(item,index) => (<List.Item onClick={()=>{this.props.handleDle(index)}}>{item}</List.Item>)}
            />
      </div>
     
    )
  }
}
//第一个参数是store里面的state映射到组件的props上
const mapStateToProps=(state)=>{
  console.log(state)
  return {
    value:state.get('todolist').get('value'),
    list:state.get('todolist').get('list')
  }
}
//把方法映射到组件的props上,这个函数要把dispatch方法穿进去
const mapDispatchToProps=(dispatch)=>{
  return {
    handleChange(e){
      const action=actionCreater.changeValueAction(e.target.value)
      dispatch(action)
    },
    handleDle(index){
      const action=actionCreater.delItemAction(index)
      dispatch(action)
    },
    handleAdd(){
      const action=actionCreater.addItemAction()
      dispatch(action)
    },
    handleInit(){
      const action=actionCreater.getServerDateAction()
      dispatch(action)
    }
  }
}
// 导出组件 ==  module.exports = TodoList
export default connect(mapStateToProps,mapDispatchToProps)(TodoList)
