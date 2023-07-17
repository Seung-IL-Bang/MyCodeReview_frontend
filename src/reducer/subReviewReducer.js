const initialState = {
  data: "",
  content: ""
};

const subReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_SUB_CONTENT":
      return {
        ...state,
        content: action.payload,
      }
    default:
      return state;
  }
};

export const setData = (data) => {
  return {
    type: "SET_DATA",
    payload: data,
  };
};

export const setSubContent = (content) => {
  return {
    type: "SET_SUB_CONTENT",
    payload: content
  }
}

export default subReviewReducer;
