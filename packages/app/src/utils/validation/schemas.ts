import * as yup from 'yup';

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const registerSchema = yup.object().shape({
  name: yup.string().min(2).required('Please enter a your name'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Please enter an email'),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      passwordRegex,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Please enter an email'),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      passwordRegex,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
});

export const passwordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Please enter an email'),
});
