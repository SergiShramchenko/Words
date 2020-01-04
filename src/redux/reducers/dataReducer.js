import {
  SET_WORDS,
  LIKE_WORD,
  UNLIKE_WORD,
  LOADING_DATA,
  SET_WORD,
  DELETE_WORD,
  POST_WORD,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  words: [],
  word: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_WORDS:
      return {
        ...state,
        words: action.payload,
        loading: false
      };
    case SET_WORD:
      return {
        ...state,
        word: action.payload
      };
    case LIKE_WORD:
    case UNLIKE_WORD:
      let index = state.words.findIndex(
        word => word.wordId === action.payload.wordId
      );
      state.words[index] = action.payload;
      if (state.word.wordId === action.payload.wordId) {
        let temp = state.word.comments;
        state.word = action.payload;
        state.word.comments = temp;
      }
      return {
        ...state
      };
    case DELETE_WORD:
      let indexW = state.words.findIndex(
        word => word.wordId === action.payload
      );
      state.words.splice(indexW, 1);
      return {
        ...state
      };
    case POST_WORD:
      return {
        ...state,
        words: [action.payload, ...state.words]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        word: {
          ...state.word,
          comments: [action.payload, ...state.word.comments]
        }
      };
    default:
      return state;
  }
}
