import React,{ Component } from 'react';
import Mylayout from '../../common/layout/layout.js'
import { Breadcrumb ,Form, Input,Button,InputNumber} from 'antd';
import { connect } from 'react-redux';
import { actionCreater } from './store/index.js';
import CategorySelector from './category-selector.js';
import UploadImg from '../../common/updateImg/index.js';
import MySimditor from '../../common/rich-eiditor/index.js';
import '../../common/rich-eiditor/index.css'
const FormItem = Form.Item;
class CategoryAdd extends Component{
	constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
		this.state={
			productId:this.props.match.params.id
		}
		console.log(this.state.productId)
	}
	componentDidMount(){
	    if(this.state.productId){
	    	this.props.handleEditProduct(this.state.productId)
	    }
	}
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      		console.log(values)
      		values.id=this.state.productId
          this.props.handleAdd(err,values)
      })
  }
	render(){
		const {

		name,
		parentCategoryId,
		categoryId,
		FileList,
		value,
		price,
		stock,
		description
		}=this.props
		console.log(FileList)
		let fileLists=[]
		if(FileList){
			fileLists=FileList.split(',').map((img,index)=>({
				uid:index,
				state:'done',
				url:img,
				response:FileList
			}))
		}
		console.log(fileLists)

		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      	labelCol: {
	       		xs: { span: 24 },
	      	  	sm: { span: 2 },
	    	},
	    	wrapperCol: {
	     	   	xs: { span: 24 },
	     	   	sm: { span: 16 },
	    	},
	    };
	    const tailFormItemLayout = {
		    wrapperCol: {
		        xs: {
		          span: 10,
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
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>
							{
								this.state.productId
								? '编辑商品'
								: '添加商品'
							}
						</Breadcrumb.Item>
					</Breadcrumb>
					<Form>
						<FormItem
				          {...formItemLayout}
				          label="商品名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '填写商品名称!',
				            }],
				            initialValue:name
				          })(
				            <Input style={{ width: 600 }}
				            placeholder="请输入商品名称"
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="所属分类"
				          required={true}
				          validateStatus={ this.props.categoryIdValidateStates }
				          help={ this.props.categoryIdHelp }
				        >
				        	<CategorySelector
				        		parentCategoryId={parentCategoryId}
				        		categoryId={categoryId}
				        		getCategoryId={(parentCategoryId,categoryId)=>{
				        			this.props.handleCategory(parentCategoryId,categoryId)
				        		}}
				        	 />

				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
				          {getFieldDecorator('stock', {
				            rules: [
				            {
				              required: true, message: '请输入商品库存',
				            }],
				            initialValue:stock
				          })(
				            <InputNumber 
				            	style={{width:300}}
				            	min={0}
								formatter={value => `${value}件`}
      							parser={value => value.replace('件', '')}					            	
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品价格"
				        >
				          {getFieldDecorator('price', {
				            rules: [
				            {
				              required: true, message: '请输入商品价格',
				            }],
				            initialValue:price
				          })(
				            <InputNumber 
				            	style={{width:300}}
				            	min={0}
								formatter={value => `${value}元`}
      							parser={value => value.replace('元', '')}					            	
				            />
				          )}
				        </FormItem>		
				        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				          {getFieldDecorator('description', {
				            rules: [
				            {
				              required: true, message: '请输入商品描述',
				            }],
				            initialValue:description
				          })(
				            <Input 
				            	placeholder="商品描述"
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品图片"
				          required={true}
				          validateStatus={ this.props.imagesValidateStates }
				          help={ this.props.imagesHelp }
				        >
						<UploadImg 
							action={ "http://127.0.0.1:3001/product/loadimg" }
							max={3}
							fileLists={fileLists}
							getFileList={
								(FileList)=>{
									this.props.handleImgage(FileList)
								}
							}
						/>
				        </FormItem>	
				        <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >
						<MySimditor 
						url={ "http://127.0.0.1:3001/product/upload" }
						value={value}
						getRichEditorValue={
							(value)=>{
								// console.log(value)
								this.props.handleDetailImgage(value)
							}
						}
						/>
				        </FormItem>
				        <FormItem {...tailFormItemLayout}>
				        	<Button 
				          		type="primary"
				          		onClick={this.handleSubmit}
				          		loading={this.props.isAddFetching}
				          	>
				          	提交
				        	</Button>
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
    categoryIdValidateStates:state.get('product').get('categoryIdValidateStates'),
    categoryIdHelp:state.get('product').get('categoryIdHelp'),
    imagesValidateStates:state.get('product').get('imagesValidateStates'),
    imagesHelp:state.get('product').get('imagesHelp'),
    isAddFetching:state.get('product').get('isAddFetching'),
    name:state.get('product').get('name'),
	parentCategoryId:state.get('product').get('parentCategoryId'),
	categoryId:state.get('product').get('categoryId'),
	FileList:state.get('product').get('FileList'),
	value:state.get('product').get('value'),
    price:state.get('product').get('price'),
    stock:state.get('product').get('stock'),
    description:state.get('product').get('description'),
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    handleAdd(err,values){
      const action=actionCreater.getAddcatogoryAction(err,values)
      dispatch(action)
    },
    handleCategory(parentCategoryId,categoryId){
    	dispatch(actionCreater.getSetCategoryAction(parentCategoryId,categoryId))
    },
    handleImgage(FileList){
    	dispatch(actionCreater.getImgageAction(FileList))
    },
    handleDetailImgage(value){
    	dispatch(actionCreater.getDetailImgageAction(value))
    },
    getOneCategory(){
    	dispatch(actionCreater.getOneCategoryAction())
    },
    handleEditProduct(productId){
    	dispatch(actionCreater.getProductDetailAction(productId))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(CategoryADD);