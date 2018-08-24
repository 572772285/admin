
import { createStore,applyMiddleware  } from 'redux';
import reduce from './reduce.js';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
//引入调试中间件，用来清晰的看到调试信息
//logger 必须是链中的最后一个中间件，否则它将记录thunk和promise，而不是实际操作
const middleware=[thunk]
if(process.env.NODE_ENV !== 'production'){
	const logger = createLogger({});
	middleware.push(logger)
}



//整个页面只有一个store
//使用redux中间件要先引用applyMiddleware(),使用中间件可以是dispatch接受函数
let store = createStore(reduce,applyMiddleware(...middleware))

export default store;