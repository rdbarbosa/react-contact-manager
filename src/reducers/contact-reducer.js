const defaultState = {
    contacts: [],
    contact: { nome: null },
    loading: false,
    errors: {}
  }
  
  export default (state=defaultState, action={}) => {
    switch (action.type) {
      case 'FETCH_CONTACTS': {
        return {
          ...state,
          contacts: action.payload.result
        }
      }
      case "FETCH_CONTACTS_FULFILLED": {
        return {
          ...state,
          contacts: action.payload.data.result
        }
      }
      case 'FETCH_CONTACT_PENDING': {
        return {
          ...state,
          loading: true,
          contact: { nome:{} }
        }
      }
      case 'FETCH_CONTACT_FULFILLED': {
        return {
          ...state,
          contact: action.payload.data.data.result,
          errors: {},
          loading: false
        }
      }
      case 'NEW_CONTACT': {
        return {
          ...state,
          contact: {nome: null}
        }
      }
      case 'SAVE_CONTACT_PENDING': {
        return {
          ...state,
          loading: true
        }
      }
      case 'SAVE_CONTACT_FULFILLED': {
        const contact = action.payload.data.data;
        return {
          ...state,
          // contacts: [...state.contacts, action.payload.data.result],
          contacts: state.contacts.map(item => item._id === contact._id ? contact : item),
          errors: {},
          loading: false
        }
      }
      case 'SAVE_CONTACT_REJECTED': {
        const data = action.payload.response.data.data;
        // convert feathers error formatting to match client-side error formatting
        const { nome, telefone, email } = data.errors;
        const errors = { global: data.message, nome, telefone, email };
        return {
          ...state,
          errors: errors,
          loading: false
        }
      }
      case 'UPDATE_CONTACT_PENDING': {
        return {
          ...state,
          loading: true
        }
      }
      case 'UPDATE_CONTACT_FULFILLED': {
        const contact = action.payload.data.data;
        return {
          ...state,
          contacts: state.contacts.map(item => item._id === contact._id ? contact : item),
          errors: {},
          loading: false
        }
      }
      case 'UPDATE_CONTACT_REJECTED': {
        const data = action.payload.response.data.data;
        const { nome, telefone, email } = data.errors;
        const errors = { global: data.message, nome, telefone, email };
        return {
          ...state,
          errors: errors,
          loading: false
        }
      }
      case 'DELETE_CONTACT_FULFILLED': {
        const _id = action.payload.data.data._id;
        return {
          ...state,
          contacts: state.contacts.filter(item => item._id !== _id)
        }
      }
      default:
        return state;
    }
  }