import React,{ Component } from 'react';
import Simditor from 'simditor'
import '../../../node_modules/simditor/styles/simditor.css';
import $ from 'jquery'
class MySimditor extends Component{
	constructor(props){
		super(props)
		this.toolbar=[
			  'title',
			  'bold',
			  'italic',
			  'underline',
			  'strikethrough',
			  'fontScale',
			  'color',
			  'ol' ,            
			  'ul',             
			  'blockquote',
			  'code' ,          
			  'table',
			  'link',
			  'image',
			  'hr',             
			  'indent',
			  'outdent',
			  'alignment'
			]
			$.ajaxSetup({
				xhrFields:{
					withCredentials:true
				}
			})
	}
	componentDidMount(){
		this.editor=new Simditor({
		  textarea: $(this.textarea),
		  toolbar:this.toolbar,
		  upload:{
		  	url: this.props.url,
		  	fileKey: 'upload',

		  }
		});
		this.editor.on('valuechanged',()=>{
			// console.log(this.editor.getValue())
			this.props.getRichEditorValue(this.editor.getValue())
		})
	}
	render(){
		console.log($)
		return (
				<div>
					<textarea  ref={(textarea)=>{this.textarea=textarea}}></textarea>
				</div>
			)
	}
}
export default MySimditor