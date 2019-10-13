import React from 'react';
import TextField from 'react-md/lib/TextFields';
import { Field } from 'redux-form';

const config = {
  text: {
    type: 'text',
    format: (value) => value,
    parse: (value) => value,
    validation: undefined
    
  },
  password: {
    type: 'password',
    format: (value) => value,
    parse: (value) => value,
    validation: undefined
  },
  number: {
    type: 'number',
    parse: (value) => value && value.replace(',', '.'),
    validation: (value) => { return value && isNaN(Number(value)) ? 'Apenas números permitidos' : undefined },
    normalize: (value) => {
      
      if (!value) {
        return value
      }
      const onlyNums = value.replace(/^\d+\.\d{4}/, '')
      if (onlyNums) {
        return onlyNums
      }
    }
  }
}

Campo.defaultProps = {
  required: true,
  rows: 1,
  id: Math.random().toString(),
  disabled: false
}

const Input = (props) => {

  const { meta: { error } } = props;

  const { input } = props;
  return (
    <div className='md-grid'>
      <TextField
        id={props.id}
        label={props.label}
        disabled={props.disabled}
        type={props.type}
        onChange={props.onChange}
        error={error ? true : false}
        errorText={error}
        rows={props.rows}
        required={props.required}
        placeholder={props.placeholder}
        {...input}
      />
    </div>
  )
}

function Campo(props) {

  return (
    <Field
      name={props.name}
      disabled={props.disabled}
      component={Input}
      parse={config[props.type || 'text'].parse}
      validate={config[props.type || 'text'].validation}
      type={config[props.type || 'text'].type}
      normalize={config[props.type || 'text'].normalize}
      {...props}
    />
  )
}

export { Campo }