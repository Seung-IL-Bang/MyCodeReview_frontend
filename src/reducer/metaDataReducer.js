const initialState = {
    title: '',
    content: ''
  };
  
const metaDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TITLE':
        return {
          ...state,
          title: action.payload
        };
      case 'SET_CONTENT':
        return {
            ...state,
            content: action.payload
        }
      default:
        return state;
    }
  };

    // 액션 생성자 함수
export const setTitle = (title) => {
      return {
        type: 'SET_TITLE',
        payload: title
      };
    };
    
export const setContent = (content) => {
      return {
        type: 'SET_CONTENT',
        payload: content
      };
    };
  
export default metaDataReducer;
  