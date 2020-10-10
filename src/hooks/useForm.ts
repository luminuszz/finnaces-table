import {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';
import * as Yup from 'yup';

interface IField {
  [key: string]: string;
}
interface IErrors {
  [key: string]: string;
}

interface HookReturn {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent) => void;
  handleErrors: (error: any) => void;
  errors: IErrors;
  loading: boolean;
}

interface Params {
  onSuccess: <T>(data: T) => void;
  defaultValues?: IField;
  validations?: Yup.ObjectSchema;
}

export type HandleSubmit<T> = (data: T) => void;

export default function useForm({
  validations,
  onSuccess,
  defaultValues,
}: Params): HookReturn {
  const [values, setValues] = useState<IField>({});
  const [errors, setErrors] = useState<IErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const success = useCallback(onSuccess, []);

  useEffect(() => {
    if (defaultValues) {
      setValues(defaultValues);
    }
  }, [defaultValues]);

  const handleErrors = useCallback(error => {
    if (error instanceof Yup.ValidationError) {
      const newErrors: IErrors = {};
      error.inner.forEach(currentError => {
        newErrors[currentError.path] = currentError.message;
      });

      setErrors(newErrors);
    }
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...values };

      newValues[e.target.name] = e.target.value;

      setValues(newValues);
    },
    [values],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setErrors({});
      setLoading(true);
      try {
        const validated = await validations?.validate(values, {
          abortEarly: false,
        });

        success(validated);
      } catch (error) {
        handleErrors(error);
      } finally {
        setLoading(false);
      }
    },
    [success, validations, values, handleErrors],
  );

  return {
    handleChange,
    errors,
    handleSubmit,
    handleErrors,
    loading,
  };
}
