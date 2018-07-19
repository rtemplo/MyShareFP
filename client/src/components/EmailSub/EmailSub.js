import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import Button from '../UI/Button'
import Input from '../UI/Input'
// import Spinner from '../UI/Spinner'
import { checkValidity } from '../../shared/validation'
import fetchEmailSubs from '../../queries/fetchEmailSubs'

class Home extends Component {
  state = {
    emailSubForm: {
      firstname: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'First Name'
        },
        value: '',
        validation: {
          required: true,
          errorMessage: 'Please enter your first name.'
        },
        valid: false,
        touched: false        
      },
      lastname: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Last Name'
        },
        value: '',
        validation: {
          required: true,
          errorMessage: 'Please enter your first name.'
        },
        valid: false,
        touched: false       
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Valid Email Address'
        }
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
        errorMessage: 'Please enter a valid email address.'
      },
      valid: false,
      touched: false
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedEmailSubForm = {
      ...this.state.emailSubForm
    }
    /* 
      Because the spread operator above is a shallow copy referencing sub objects 
      will still point to the original object which violates the immutibility principle.
      To get around this we spread the specific sub object below.
    */
    const updatedFormElement = {
      ...updatedEmailSubForm[inputIdentifier]
    }

    updatedFormElement.value = event.target.value
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true

    updatedEmailSubForm[inputIdentifier] = updatedFormElement

    let formIsValid = true;
    for (let inputIdentifier in updatedEmailSubForm) {
      formIsValid = updatedEmailSubForm[inputIdentifier].valid && formIsValid
    }

    this.setState({emailSubForm: updatedEmailSubForm, formIsValid: formIsValid})
  }

  

  render() {
    console.log(this.props.data)

    const formElementsArray = []
    for (let key in this.state.emailSubForm) {
      formElementsArray.push({
        id: key, 
        config: this.state.emailSubForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler} >
        {formElementsArray.map(formElement => {
          let errorMessage = null;
          if (formElement.config.validation) {
            errorMessage = formElement.config.validation.errorMessage
          }

          return (<Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value} 
            errorMessage={errorMessage} 
            invalid={!formElement.config.valid} 
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
      </form>
    );    


    return (
      <div>
        Home
      </div>
    )
  }
}

export default graphql(fetchEmailSubs)(Home)