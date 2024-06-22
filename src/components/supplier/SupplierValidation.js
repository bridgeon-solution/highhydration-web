import * as Yup from 'yup';

const SupplierValidation = Yup.object({
    first_name: Yup.string().min(3, 'Please enter a name').required('First name is required'),
    last_name: Yup.string().min(2, 'Please enter a name').required('last name is required'),
    email: Yup.string().email('Please enter a valid email').required('email  is required'),
    phone_number: Yup.string().max(10, 'Phone number must be at least 10 characters').required('Phone number is required'),
  });

export { SupplierValidation };
