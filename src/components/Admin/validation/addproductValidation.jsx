import * as Yup from 'yup';

export const addproductValidation = Yup.object({
  productname: Yup.string().min(4).required('Please enter product name'),
  productDescription: Yup.string().min(10).required('Please enter product description'),
  image: Yup.mixed().required('Image is required'),
  category: Yup.string().min(5).required('Please enter category'),
  stock:Yup.number().required('Please enter Stock'),
  price: Yup.number().required('Please enter price'),
});
