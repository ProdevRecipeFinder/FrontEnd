import { FieldError } from "../generated/graphql"

// Converts error message recieved from server to displayable formik error object
export const convertErrorMsg = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {}
  errors.forEach(({ field, message }) => {
    errorMap[field] = message
  })

  return errorMap
}
