import { combineReducers } from 'redux';
import metaDataReducer from './metaDataReducer';

const rootReducer = combineReducers({
  metaData: metaDataReducer
});

export default rootReducer;
