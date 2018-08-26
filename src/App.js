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
import Shop from './pages/shop/index.js'
import Class from './pages/class/index.js'
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
    	<Router>
    		<div className='App'>
        <Switch>
          <ProtectedRouter exact path="/" component={ Home }/>
          <ProtectedRouter path="/user" component={ User }/>
          <ProtectedRouter path="/shop" component={ Shop }/>
          <ProtectedRouter path="/class" component={ Class }/>
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
