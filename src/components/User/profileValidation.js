import * as Yup from 'yup';

const profileValidation = Yup.object({
    image: Yup.string().required('Please enter a name'),
    first_name: Yup.string().min(3, 'Please enter a name'),
    last_name: Yup.string().min(2, 'Please enter a name'),
    email: Yup.string().email('Please enter a valid email'),
     phone_number: Yup.string().required().min(10, 'Phone number must be at least 10 characters'),
    address_line1: Yup.string().required(),
    address_line2: Yup.string().required('Please enter your landmark'),
    city: Yup.string().required(),
    pin_number: Yup.number().required().min(7, 'Pin number must be at least 7 digits'),
});

export { profileValidation };
