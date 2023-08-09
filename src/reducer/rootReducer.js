import { combineReducers } from "redux";
import metaDataReducer from "./metaDataReducer";
import subReviewReducer from "./subReviewReducer";

const rootReducer = combineReducers({
  metaData: metaDataReducer,
  subReview: subReviewReducer
});

export default rootReducer;
