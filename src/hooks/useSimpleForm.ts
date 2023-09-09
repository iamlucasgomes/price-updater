import React from 'react';
import {
  FieldValues,
  useForm,
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
  UseFormSetError,
  UseFormClearErrors,
  UseFormReset,
} from 'react-hook-form';

import dynamic from 'next/dynamic';
import usePostForm from './usePostForm';


export type FormCommonType = {
  control: Control<FieldValues, any>;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  trigger: UseFormTrigger<any>;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<FieldValues>;
  reset: UseFormReset<FieldValues>;
};

const useSimpleForm = (props: {
  defaultValues?: object;
  validation?: object;
  integration?: {
    route: string;
    isUpdate?: boolean;
    formatter: (props: FieldValues) => object;
  };
}) => {
  const basicConfig: FieldValues = {
    mode: 'all',
  };

  if (props?.defaultValues) {
    basicConfig.defaultValues = props?.defaultValues;
  }


  const {
    control,
    register,
    trigger,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors, ...otherFormStateProps },
    ...otherProps
  } = useForm(basicConfig);

  const content = watch();

  const { send, loading } = usePostForm({
    route: props?.integration?.route,
    isUpdate: props?.integration?.isUpdate,
    payload: props?.integration?.formatter
      ? props?.integration?.formatter(content)
      : content,
  });

  
  const formCommon: FormCommonType = {
    control,
    errors,
    register,
    trigger,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
    reset,
  };

  const enhancedReturn = {
    ...otherProps,
    ...formCommon,
    formCommon,
    formState: { errors, ...otherFormStateProps },
    integration: {
      send,
      loading,
    },
    hasError: Boolean(Object.keys(errors).length),
    messageSuggestions: {
      title:
        'Atenção: ' +
        Object.keys(errors).length +
        ' campos precisam ser verificados.',
      full: Object.keys(errors)
        .map((errorKey) => errors?.[errorKey]?.message)
        .join('; '),
    },
  };

  return enhancedReturn;
};

export default useSimpleForm;
