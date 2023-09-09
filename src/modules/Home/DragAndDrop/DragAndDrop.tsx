import { FC, SetStateAction, useMemo, useState } from "react";
import { Spin } from "antd";
import useSimpleForm from "~/hooks/useSimpleForm";
import { Wrapper } from "./styles";
import DefaultFooter from "~/components/DrawerForm/DefaultFooter";
import DragAndDrop from "~/components/DragAndDrop";
import Card from "~/components/Card";
import { on } from "events";

type Props = {
  id?: string;
  onSuccess(): void;
};

const Drag: FC<Props> = ({ id, onSuccess }) => {
  const [droppedData, setDroppedData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [messageSuggestions, setMessageSuggestions] = useState<
    {
      title: string;
      full: string;
    }[]
  >([{ title: "", full: "" }]);
  const [products, setProducts] = useState<
    {
      code: number;
      name: string;
      costPrice: string;
      salesPrice: string;
      newPrice: string;
    }[]
  >([]);
  const {
    formCommon,
    handleSubmit,
    integration: { send, loading },
  } = useSimpleForm({
    defaultValues: {},
    integration: {
      route: "products",
      isUpdate: update,
      formatter: () => ({
        droppedData,
      }),
    },
  });

  const handleFileUploadSuccess = (fileContents: SetStateAction<null>) => {
    setDroppedData(fileContents);
  };

  const onSubmit = async () => {
    const { data } = await send();
    setProducts(data.products);
    if (data.error) {
      setHasError(data.error);
      setIsValidating(true);
      return setMessageSuggestions(data.messages);
    }

    if (update) {
      onSuccess();
      setUpdate(false);
    }
    setIsValidating(true);
    setHasError(data.error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Spin tip="Loading..." spinning={loading}>
        <Wrapper>
          {!isValidating && (
            <DragAndDrop onFileUploadSuccess={handleFileUploadSuccess} />
          )}
          {products &&
            products.map((product, key) => (
              <Card
                key={key}
                title={`Codigo ${product.code}`}
                content={product}
              />
            ))}
        </Wrapper>
      </Spin>
      <DefaultFooter
        saveLoading={loading}
        isValidating={isValidating}
        setIsValidating={setIsValidating}
        setProducts={setProducts}
        hasError={hasError}
        setHasError={setHasError}
        messageSuggestions={messageSuggestions}
        setUpdate={setUpdate}
        text="Validar"
      />
    </form>
  );
};

export default Drag;
