import * as yup from 'yup'

const loginValidationSchema = yup.object({
  username: yup
    .string()
    .email('Invalid Email')
    .required('Username is required.'),
  password: yup.string().required('Password is required.'),
})

export const loginInitialValues = {
  username: '',
  password: '',
}

export const OtpSchema = yup.object().shape({
  otp: yup
    .number()
    .required('OTP is required.')
    .test((val) => val && val.toString().length === 6),
})

export const otpInitialValues = {
  otp: '',
}

export const ForgotPasswordSchema = yup.object().shape({
  username: yup
    .string()
    .email('Invalid Email')
    .required('Username / Email is required'),
})

export const forgotInitialValues = {
  username: '',
}

export const ResetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'The New Password should consist of Minimum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    )
    .required('New Password is required'),
  confirmPassword: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{10,}$/,
      'The New Password should consist of Minimum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    )
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

export const resetPasswordInitialValues = {
  newPassword: '',
  confirmPassword: '',
}

export default loginValidationSchema
