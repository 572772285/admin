import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './index.css';
import { connect } from 'react-redux';
//引入Ajax插件

import { actionCreater } from './store/index.js'
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
	constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
    this.state={
      isFetching:false
    }
	}
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if (!err) {
          this.props.handleInit(values)
        }
      })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
    <div className="login-forms">
      <Form className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' },{ pattern:/^[a-z|\d]{3,6}$/,message:'用户名为3-6个字符' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' },{ pattern:/^[a-z|\d]{3,6}$/,message:'密码为3-6个字符' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" 
          onClick={this.handleSubmit}
           className="login-form-button"
           loading={this.props.isFetching}
            >
            登陆
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    isFetching:state.get('login').get('isFetching')
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    handleInit(values){
      const action=actionCreater.getLoginaction(values)
      dispatch(action)
    }
  }
}
const login=Form.create()(NormalLoginForm)
export default connect(mapStateToProps,mapDispatchToProps)(login);