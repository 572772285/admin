import React,{ Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom'
import ProductList from './list.js'
import ProductAdd from './add.js'
class Product extends Component{

	render(){
		return(
			<Switch>
				<Route path="/product/add" component={ ProductAdd } />
				<Route path="/product/:pid?" component={ ProductList } />
			</Switch>
		)
	}

}


export default Product;