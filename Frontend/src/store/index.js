import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './Reducers/rootReducer';

const middleware = applyMiddleware(promise(), thunk, logger);
const store = createStore(rootReducer, middleware);

// store.dispatch({
//     type: CHECK_IF_USER,
// })
export default store; 