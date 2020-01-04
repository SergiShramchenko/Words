import {
  SET_WORDS,
  LOADING_DATA,
  LIKE_WORD,
  UNLIKE_WORD,
  DELETE_WORD,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_WORD,
  SET_WORD,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';

import axios from 'axios';

// Get all words
export const getWords = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/words')
    .then(res => {
      dispatch({ type: SET_WORDS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SET_WORDS, payload: [] });
    });
};

export const getWord = wordId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/word/${wordId}`)
    .then(res => {
      dispatch({
        type: SET_WORD,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

// Post one word
export const postWord = newWord => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/word', newWord)
    .then(res => {
      dispatch({
        type: POST_WORD,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

// Like a word
export const likeWord = wordId => dispatch => {
  axios
    .get(`/word/${wordId}/like`)
    .then(res => {
      dispatch({ type: LIKE_WORD, payload: res.data });
    })
    .catch(err => console.log(err));
};

// Unlike a word
export const unlikeWord = wordId => dispatch => {
  axios
    .get(`/word/${wordId}/unlike`)
    .then(res => {
      dispatch({ type: UNLIKE_WORD, payload: res.data });
    })
    .catch(err => console.log(err));
};

// Submit comment
export const submitComment = (wordId, commentData) => dispatch => {
  axios
    .post(`/word/${wordId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const deleteWord = wordId => dispatch => {
  axios
    .delete(`/word/${wordId}`)
    .then(() => {
      dispatch({ type: DELETE_WORD, payload: wordId });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({ type: SET_WORDS, payload: res.data.words });
    })
    .catch(() => {
      dispatch({ type: SET_WORDS, payload: null });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
