/* eslint-disable import/no-anonymous-default-export */
import { CREATE_COMMENT, FETCH_COMMENTS } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type) {
      case CREATE_COMMENT:
        return { ...state, [action.payload.id]: action.payload };
    case FETCH_COMMENTS:
        return { ...state, ..._.mapKeys(action.payload, 'id') };
      default:
        return state;
    }
};