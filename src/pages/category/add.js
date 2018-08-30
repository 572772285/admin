import React,{ Component } from 'react';
import Mylayout from '../../common/layout/layout.js'
import { Breadcrumb ,Form, Input,Select,Button} from 'antd';
import { connect } from 'react-redux';
import { actionCreater } from './store/index.js'
const FormItem = Form.Item;
const Option = Select.Option;
class CategoryAdd extends Component{
	constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
	}
	componentDidMount(){
	    this.props.getOneCategory()
	}
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if (!err) {
          this.props.handleAdd(values)
        }
      })
  }
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      	labelCol: {
	       		xs: { span: 24 },
	      	  	sm: { span: 8 },
	    	},
	    	wrapperCol: {
	     	   	xs: { span: 24 },
	     	   	sm: { span: 16 },
	    	},
	    };
	    const tailFormItemLayout = {
		    wrapperCol: {
		        xs: {
		          span: 24,
		          offset: 0,
		        },
		        sm: {
		          span: 16,
		          offset: 8,
		       	},
		    },
	    };
		return(
			
			<Mylayout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>分类管理</Breadcrumb.Item>
						<Breadcrumb.Item>添加分类</Breadcrumb.Item>
					</Breadcrumb>
					<Form>
						<FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '填写分类名称!',
				            }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('pid', {
				            rules: [{
				              required: true, message: '请选择父级分类!',
				            }],
				          })(
				            <Select initialValue="0" style={{ width: 300 }}>
				            {
				            	//这个value值就是pid
				            }
						      <Option value="0">根分类</Option>
						      {
						      	this.props.setOneCategory.map((category)=>{
						      		console.log(category)
						      		return <Option key={category.get('_id')} value={category.get('_id')}>根分类/{category.get('name')}</Option>
						      	})
						      }
    						</Select>
				          )}
				        </FormItem>
				        <FormItem {...tailFormItemLayout}>
				          <Button 
				          	type="primary" 
				          	onClick={ this.handleSubmit }
				          	loading = {this.props.isAddFetching}
				          >提交</Button>
				        </FormItem>
					</Form>

				</div>
			</Mylayout>

		)
	}

}
const CategoryADD=Form.create()(CategoryAdd);
const mapStateToProps=(state)=>{
  return {
    isAddFetching:state.get('category').get('isAddFetching'),
    setOneCategory:state.get('category').get('setOneCategory')
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    handleAdd(values){
      const action=actionCreater.getAddcatogoryAction(values)
      dispatch(action)
    },
    getOneCategory(){
    	dispatch(actionCreater.getOneCategoryAction())
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(CategoryADD);