const initialState = {
  data: "",
  content: "",
  title: ""
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
    case "SET_SUB_TITLE":
      return {
        ...state,
        title: action.payload
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

export const setSubTitle = (title) => {
  return {
    type: "SET_SUB_TITLE",
    payload: title
  }
}

export default subReviewReducer;
