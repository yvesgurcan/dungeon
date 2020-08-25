import { createStore } from 'redux';
import Reducers from './Reducers';

export default createStore(
    Reducers,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
