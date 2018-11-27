import React from 'react';
//定义根组件
import './App.css';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Login from './pages/login/index.js'
import Home from './pages/home/index.js'
import User from './pages/user/index.js'
import Product from './pages/product/index.js'
import Order from './pages/order/index.js'
import Category from './pages/category/index.js'
import { getUserName } from './until/index.js'
import  ErrorPage from './pages/errorPage/index.js'
class App extends React.Component{
  render(){
  const ProtectedRouter = ({component:Component,...rest})=>(
      <Route 
        {...rest}
        render = {props=>(
          getUserName()
          ? <Component {...props} />
          : <Redirect to="/login" />
        )}
      />
    )
    const LoginRouter =({component:Component,...rest})=>{
      if(getUserName()){
        return <Redirect to="/" />
      }else{
        return <Route {...rest} component={Component} />
      }
    }
    return(
    	<Router forceRefresh={true}>
    		<div className='App'>
        <Switch>
          <ProtectedRouter exact path="/" component={ Home }/>
          <ProtectedRouter path="/user" component={ User }/>
          <ProtectedRouter path="/product" component={ Product }/>
          <ProtectedRouter path="/category" component={ Category }/>
          <ProtectedRouter path="/order" component={ Order }/>
          <LoginRouter path="/login" component={ Login }/>
          <Route component={ ErrorPage } />
    		</Switch>
    		</div>
    	</Router>
     )
  }
}

// 导出组件 ==  module.exports = App
export default App;
