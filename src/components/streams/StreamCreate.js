import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormControl, FormLabel, FormErrorMessage, Input, Button } from "@chakra-ui/react"
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  renderInput({ input, label, meta }) {
    const className = meta.touched && !meta.active;
    return (
      <FormControl 
       p={{base: "1vw", lg:"0.5vw"}} m="1vw 0 0 20vw" w="60vw"
       isInvalid={(className && meta.error) ? true : false}
      >
        <FormLabel p={{base: "1vw", lg:"0.5vw"}}>{label}</FormLabel>
        <Input p={{base: "1vw", lg:"0.5vw"}} autoComplete="off"
          {...input} size="md" w={{sm: "100%", md: "75%"}}
        />
        <FormErrorMessage p={{base: "1vw", lg:"0.5vw"}}>{className ? meta.error : ''}</FormErrorMessage>
      </FormControl>
    );
  }

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  }

  render() {
    return (
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        style={{marginTop: "5vw"}}
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
          colorScheme="purple" 
          size="md" 
          m= {{sm: "4vw 0 0 22vw", md: "3vw 0 0 22vw", lg: "2vw 0 0 22vw"}}
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

const formWrapped = reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);