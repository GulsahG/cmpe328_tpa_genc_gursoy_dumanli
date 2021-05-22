/* eslint-disable import/no-anonymous-default-export */
import { CREATE_COMMENT } from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
      case CREATE_COMMENT:
        return { ...state, [action.payload.id]: action.payload };
      default:
        return state;
    }
};