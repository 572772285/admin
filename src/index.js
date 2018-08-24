import React from 'react'; //等于const React=require('react')
//ReactDOM就是用来把组件挂载到DOM节点上
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index.js';
ReactDOM.render(
	<Provider store={store}>
	<App />
	</Provider>,
	document.getElementById('root'))
