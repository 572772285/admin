import React from 'react';
//定义根组件
import './App.css';
import 'antd/dist/antd.css';
import Login from './pages/login/index.js'

class App extends React.Component{
	
  render(){
    return(
    	<Login />
    )
  }
}

// 导出组件 ==  module.exports = App
export default App;
