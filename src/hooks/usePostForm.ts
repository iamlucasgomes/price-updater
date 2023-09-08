import { useState } from 'react';
import axios from 'axios';
import { notification } from 'antd';

const usePostForm = ({
  route,
  payload,
  isUpdate,
}: {
  route?: string;
  payload: object;
  isUpdate?: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const fetchUrl = `/api/${route}`;

  const openErrorNotification = () => {
    notification.open({
      type: 'error',
      message: `Ocorreu um erro inesperado ao salvar o formulário.`,
      description:
        'Tente novamente mais tarde ou entre em contato com o suporte.',
    });
  };

  const send = async () => {
    setLoading(true);
    const res = await axios[isUpdate ? 'put' : 'post'](fetchUrl, payload);
    setLoading(false);

    if (res.status > 299) {
      openErrorNotification();
    }

    return res;
  };

  return {
    send,
    loading,
  };
};

export default usePostForm;
