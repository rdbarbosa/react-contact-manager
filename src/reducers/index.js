import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ContactReducer from './contact-reducer';

const reducers = {
  form: formReducer,
  contactStore: ContactReducer,
}

const rootReducer = combineReducers(reducers);

export default rootReducer;