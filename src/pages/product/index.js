import React,{ Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom'
import ProductList from './list.js'
import ProductAdd from './add.js'
import Productchakan from './detail.js'
class Product extends Component{

	render(){
		return(
			<Switch>
				<Route path="/product/add/:id?" component={ ProductAdd } />
				<Route path="/product/detail/:id" component={ Productchakan } />
				<Route path="/product/" component={ ProductList } />
			</Switch>
		)
	}

}


export default Product;