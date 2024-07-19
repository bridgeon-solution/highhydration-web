import * as Yup from 'yup'

export const registerValidation=Yup.object({
    first_name:Yup.string().min(3).required('please enter name'),
    last_name:Yup.string().required('please enter name') ,
    email:Yup.string().email('Please Enter Valid email').required('Please Enter Email'),
    password:Yup.string().min(6).required('please enter password'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
})