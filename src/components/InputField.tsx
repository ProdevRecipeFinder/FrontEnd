import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import React, { InputHTMLAttributes } from 'react'
import { useField }                   from 'formik'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  label?: string
  name: string
}

const InputField: React.FC<InputFieldProps> = ({ label, size: _, ...props }) => {
  const [field, { error }] = useField(props) //Name in type needs to be required

  return (
    //!! converts empty text to falsy 
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}

export default InputField