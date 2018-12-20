import { contacts } from '../contacts-data';
import { pessoa } from './';

const url = '/pessoa';

export function fetchContacts(){
  return dispatch => {
    dispatch({
      type: 'FETCH_CONTACTS',
      // payload: contacts
      payload: pessoa.get(url)
    })
  }
}

export function newContact() {
  return dispatch => {
    dispatch({
      type: 'NEW_CONTACT'
    })
  }
}

export function saveContact(contact) {
  return dispatch => {
    return dispatch({
      type: 'SAVE_CONTACT',
      payload: pessoa.post(url, contact)
    })
  }
}

export function fetchContact(_id) {
  return dispatch => {
    return dispatch({
      type: 'FETCH_CONTACT',
      payload: pessoa.get(`${url}/${_id}`)
    })
  }
}

export function updateContact(contact) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_CONTACT',
      payload: pessoa.put(`${url}/${contact._id}`, contact)
    })
  }
}

export function deleteContact(_id) {
  return dispatch => {
    return dispatch({
      type: 'DELETE_CONTACT',
      payload: pessoa.delete(`${url}/${_id}`)
    })
  }
}