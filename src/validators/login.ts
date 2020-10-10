import * as Yup from 'yup';

export const validations = Yup.object().shape({
  email: Yup.string()
    .email('Precisa ser um e-mail valido')
    .required('O e-mail é obrigatório'),

  password: Yup.string().required('A senha é obrigatória'),
});

export type IRequest = Yup.InferType<typeof validations>;
