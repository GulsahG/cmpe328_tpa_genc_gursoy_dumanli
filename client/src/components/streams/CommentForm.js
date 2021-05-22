import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormControl, FormLabel, FormErrorMessage, Input, Button } from "@chakra-ui/react";

class CommentForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }
  
  renderInput({ input, label, meta }) {
    const className = meta.touched && !meta.active;
    return (
      <FormControl 
        w={{base: "50vw", md:"35vw"}}
        isInvalid={(className && meta.error) ? true : false}
      >
        <FormLabel 
          p={{base: "1vw", lg:"0.5vw"}}
        >
          {label}
        </FormLabel>
        <Input 
          p={{base: "1vw", lg:"0.5vw"}} 
          autoComplete="off"
          {...input} 
          size="md" 
          w="30vw"
        />
        <FormErrorMessage 
          p={{base: "1vw", lg:"0.5vw"}}
        >
          {className ? meta.error : ''}
        </FormErrorMessage>
      </FormControl>
    );
  }

  renderDisabledInput({ input, label, meta }) {
    const className = meta.touched && !meta.active;
    return (
      <FormControl 
        w={{base: "50vw", md:"35vw"}}
        isInvalid={(className && meta.error) ? true : false}
      >
        <FormLabel 
          p={{base: "1vw", lg:"0.5vw"}}
        >
          {label}
        </FormLabel>
        <Input 
          p={{base: "1vw", lg:"0.5vw"}} 
          autoComplete="off"
          {...input} 
          size="md" 
          w="30vw"
          isDisabled
        />
        <FormErrorMessage 
          p={{base: "1vw", lg:"0.5vw"}}
        >
          {className ? meta.error : ''}
        </FormErrorMessage>
      </FormControl>
    );
  }

  render() {
    return (
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        style={{margin: "2.5vw"}}
      >
        <Field 
          name="text" 
          component={this.renderInput} 
          label="Enter Comment" 
        />
        <Field 
          name="streamId" 
          component={this.renderDisabledInput} 
          label="Stream Id"
          disabled
        />
        <Button 
          background="#b19dd8"
          _hover={{background: "#6441a4", color: "white"}}
          color="#17141f" 
          size="md" 
          m= {{sm: "4vw 0 0 15vw", md: "3vw 0 0 22.5vw", lg: "2vw 0 0 22.5vw"}}
          type="submit"
        >
          Submit
        </Button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {}

  if (!formValues.text)
    errors.text = 'You must enter a comment.';
  
  return errors;
};

export default reduxForm({
  form: 'commentForm',
  validate
})(CommentForm);