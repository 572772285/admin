import React,{ Component } from 'react';
import { Select } from 'antd';

import {Request} from '../../until/index.js';

const Option = Select.Option;

class CategorySelector extends Component{
	constructor(props){
		super(props);
		this.state = {
			levelOneCategories:[],
			levelOneCategoryId:'',
			levelTwoCategories:[],
			levelTwoCategoryId:'',	
			needLoadLevelTwo:false,
			isChanged:false		
		}
		this.handleLevelOneChange = this.handleLevelOneChange.bind(this)
		this.handleLevelTwoChange = this.handleLevelTwoChange.bind(this)
	}

	componentDidMount(){
		this.loadLevelOneCategory();
	}
	static getDerivedStateFromProps(props, state){
		const levelOneCategoryIdChanged=props.parentCategoryId!==state.levelOneCategoryId
		const levelTwoCategoryIdChanged=props.CategoryId!==state.levelTwoCategoryId
		//新建时不更新state
		if(state.levelOneCategoryId && !props.parentCategoryId && !props.CategoryId){
			return null
		}
		//如果分类ID没有发生改变，就不更新state
		if(!levelOneCategoryIdChanged&&levelTwoCategoryIdChanged){
			return null
		}
		//编辑时已经更新过就不更新
		if(state.isChanged){
			return null
		}
		if(props.parentCategoryId===0){//只有一级分类
			return {
				levelOneCategoryId:props.categoryId,
				levelTwoCategoryId:'',
				isChanged:true
			}
		}else{//有一级分类和二级分类
				return{
					levelOneCategoryId:props.parentCategoryId,
					levelTwoCategoryId:props.categoryId,
					needLoadLevelTwo:true,
					isChanged:true
				}
			}
		return null 
	}
	componentDidUpdate(){
		if(this.state.needLoadLevelTwo){
			this.loadLevelTwoCategory()
			this.setState({
				needLoadLevelTwo:false
			})
		}
	}
	loadLevelOneCategory(){
		Request({
			method:'get',
			url:'http://127.0.0.1:3001/category',
			data:{
				pid:0
			}
		})
		.then(result=>{
			if(result.code === 0){
				this.setState({
					levelOneCategories:result.data
				})
			}
		})
	}
	//选择一级分类处理事件
	handleLevelOneChange(value){
		this.setState({
			levelOneCategoryId:value,
			levelTwoCategories:[],
			levelTwoCategoryId:''			
		},()=>{
			this.loadLevelTwoCategory();
			this.onValueChange()
		})
	}
	//选择二级分类处理事件
	handleLevelTwoChange(value){
		this.setState({
			levelTwoCategoryId:value
		},()=>{
			this.onValueChange()
		})
	}
	loadLevelTwoCategory(){
		Request({
			method:'get',
			url:'http://127.0.0.1:3001/category',
			data:{
				pid:this.state.levelOneCategoryId
			}
		})
		.then(result=>{
			if(result.code === 0){
				this.setState({
					levelTwoCategories:result.data
				})
			}
		})		
	}
	onValueChange(){//这个方法就是把id传给父组件
		const {levelOneCategoryId,levelTwoCategoryId} = this.state;
		
		//如果选择了二级分类
		if(levelTwoCategoryId){
			this.props.getCategoryId(levelOneCategoryId,levelTwoCategoryId)
		}else{
			this.props.getCategoryId(0,levelOneCategoryId)
		}
		
	}
	render(){
		const {levelOneCategories,levelOneCategoryId,levelTwoCategories,levelTwoCategoryId} = this.state;
    	const levelOneOptions = levelOneCategories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
    	const levelTwoOptions = levelTwoCategories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
		return(
			<div>
				<Select 
				disabled={this.props.disabled}
				defaultValue={levelOneCategoryId}
				value={levelOneCategoryId}
				style={{ width: 300,marginRight:10 }} 
				onChange={this.handleLevelOneChange}>
					{levelOneOptions}
				</Select>
				{	//如果二级分类有length
					levelTwoOptions.length
					? <Select
					disabled={this.props.disabled}
						defaultValue={levelTwoCategoryId}
						value={levelTwoCategoryId}
						style={{ width: 300 }} 
						onChange={this.handleLevelTwoChange}>
							{levelTwoOptions}
					</Select>
					: null
				}

			</div>			
		)
	}
}

export default CategorySelector