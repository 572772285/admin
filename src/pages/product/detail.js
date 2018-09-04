import React,{ Component } from 'react';
import Mylayout from '../../common/layout/layout.js'
import { Breadcrumb ,Form, Input,Button,InputNumber} from 'antd';
import { connect } from 'react-redux';
import { actionCreater } from './store/index.js';
import CategorySelector from './category-selector.js';
import UploadImg from '../../common/updateImg/index.js';
import MySimditor from '../../common/rich-eiditor/index.js';
import '../../common/rich-eiditor/index.css'
import './detail.css'
const FormItem = Form.Item;
class ProductDatil extends Component{
	constructor(props){
		super(props)
		this.state={
			productId:this.props.match.params.id
		}
		console.log(this.state.productId)
	}
	componentDidMount(){
	    if(this.state.productId){
	    	this.props.handleProductDetail(this.state.productId)
	    }
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
		let imgBox=''
		if(FileList){
			imgBox=FileList.split(',').map((img,index)=>(
				<li key={index}>
					<img src={img} />
				</li>))
		}

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
							商品详情
						</Breadcrumb.Item>
					</Breadcrumb>
					<Form>
						<FormItem
				          {...formItemLayout}
				          label="商品名称"
				        >
				            <Input style={{ width: 600 }}
				            disabled={true}
				            defaultValue={name}
				            />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="所属分类"
				        >
				        	<CategorySelector
				        		parentCategoryId={parentCategoryId}
				        		categoryId={categoryId}
				        		disabled={true}
				        	 />

				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
				            <InputNumber 
				            	disabled={true}
				            	style={{width:300}}
				            	value={stock}
								formatter={value => `${value}件`}
      							parser={value => value.replace('件', '')}					            	
				            />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品价格"
				        >
				            <InputNumber 
				            	style={{width:300}}
				            	value={ price }
				            	disabled={true}
								formatter={value => `${value}元`}
      							parser={value => value.replace('元', '')}					            	
				            />
				        </FormItem>		
				        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				            <Input 
				            	disabled={true}
				            	defaultValue={description}
				            />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品图片"
				        >
				        	<ul className="imgBox">
				        		{imgBox}
				        	</ul>
				        </FormItem>	
				        <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >
				          <div dangerouslySetInnerHTML={{ __html:value }}></div>
				        </FormItem>
					</Form>

				</div>
			</Mylayout>

		)
	}

}
const ProductDATIL=Form.create()(ProductDatil);
const mapStateToProps=(state)=>{
  return {
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
    handleProductDetail(productId){
    	dispatch(actionCreater.getProductDetailAction(productId))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ProductDATIL);