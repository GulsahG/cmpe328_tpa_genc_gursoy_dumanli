import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormControl, FormLabel, FormErrorMessage, Input, Button } from "@chakra-ui/react";

class StreamForm extends React.Component {
  renderInput({ input, label, meta }) {
    const className = meta.touched && !meta.active;
    return (
      <FormControl 
       p={{base: "1vw", md:"0.5vw"}} 
       m={{base: "1vw 0 0 12.5vw", md: "1vw 0 0 20vw"}} 
       w={{base: "75vw", md:"60vw"}}
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
          w="50vw"
        />
        <FormErrorMessage 
          p={{base: "1vw", lg:"0.5vw"}}
        >
          {className ? meta.error : ''}
        </FormErrorMessage>
      </FormControl>
    );
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        style={{margin: "2.5vw"}}
      >
        <Field 
          name="title" 
          component={this.renderInput} 
          label="Enter Title" 
        />
        <Field 
          name="description" 
          component={this.renderInput} 
          label="Enter Description" 
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

  if (!formValues.title)
    errors.title = 'You must enter a title.';
  if(!formValues.description)
    errors.description = 'You must enter a description.';
  
  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);