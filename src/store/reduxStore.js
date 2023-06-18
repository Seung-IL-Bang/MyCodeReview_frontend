import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer/rootReducer';

const reduxStore = configureStore({reducer : rootReducer});

export default reduxStore;
