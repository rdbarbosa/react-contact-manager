import React, { Component } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';

class ContactForm extends Component {

  componentWillReceiveProps = (nextProps) => { // Receive Contact data Asynchronously
    const { contact } = nextProps;
    if(contact._id !== this.props.contact._id) { // Initialize form only once
      this.props.initialize(contact)
    }
  }
  

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )
  

  render() {
    const { handleSubmit, pristine, submitting, loading } = this.props;

    const validate = (values) => {
      const errors = {nome: null};
      if(!values.nome) {
        errors.nome.first = {
          message: 'You need to provide First Name'
        }
      }
      if(!values.telefone) {
        errors.telefone = {
          message: 'You need to provide a telefone number'
        }
      } else if(!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(values.telefone)) {
        errors.telefone = {
          message: 'telefone number must be in International format'
        }
      }
      if(!values.email) {
        errors.email = {
          message: 'You need to provide an Email address'
        }
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = {
          message: 'Invalid email address'
        }
      }
      return errors;
    }

    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>{this.props.contact._id ? 'Edit Contact' : 'Add New Contact'}</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Form.Group widths='equal'>
              <Field name="nome" type="text" component={this.renderField} label="Nome"/>
              <Field name="sobrenome" type="text" component={this.renderField} label="Sobrenome"/>
            </Form.Group>
            <Field name="sexo" type="text" component={this.renderField} label="Sexo"/>
            <Field name="telefone" type="text" component={this.renderField} label="Telefone"/>
            <Field name="email" type="text" component={this.renderField} label="Email"/>
            <Button primary type='submit' disabled={pristine || submitting}>Save</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default reduxForm({form: 'contact'})(ContactForm);