import { combineReducers, createStore , compose} from 'redux';
import reducers from './reducers';
import rootSaga from './rootSaga';
import middleware, { sagaMiddleware } from './middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducers), composeEnhancers(middleware));

sagaMiddleware.run(rootSaga);

export default store;
