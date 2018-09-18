import { createStore } from 'redux';
import rootReducer from './Reducers/rootReducer';
const store = createStore(rootReducer);
console.log(store.getState());

export default store; 