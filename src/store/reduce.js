//合并reducer
import { combineReducers } from 'redux-immutable';
import { reducer as todulistReducer} from '../pages/todolist/store'
export default combineReducers({
	todolist:todulistReducer
})
