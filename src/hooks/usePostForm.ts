import { useState } from "react";
import axios from "axios";
import { notification } from "antd";

interface PayloadType {
  [key: string]: any;
}
const usePostForm = <T extends PayloadType>({
  route,
  payload,
  isUpdate,
  fileFieldName,
}: {
  route?: string;
  payload: T;
  isUpdate?: boolean;
  fileFieldName?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const fetchUrl = `/api/${route}`;

  const openErrorNotification = () => {
    notification.open({
      type: "error",
      message: `Ocorreu um erro inesperado ao salvar o formulário.`,
      description:
        "Tente novamente mais tarde ou entre em contato com o suporte.",
    });
  };

  const send = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      for (const key in payload) {
        formData.append(key, payload[key]);
      }

      if (fileFieldName) {
        if (payload[fileFieldName]) {
          formData.append(fileFieldName, payload[fileFieldName]);
        }
      }

      const res = await axios({
        method: isUpdate ? "put" : "post",
        url: fetchUrl,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);

      if (res.status > 299) {
        openErrorNotification();
      }

      return res;
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
      setLoading(false);
      openErrorNotification();
      throw error;
    }
  };

  return {
    send,
    loading,
  };
};

export default usePostForm;
