import { FC, useMemo } from "react";
import { Spin, Tooltip, Typography } from "antd";
import useSimpleForm from "~/hooks/useSimpleForm";
import { Wrapper } from "./styles";
import DefaultFooter from "~/components/DrawerForm/DefaultFooter";
import { QuestionCircleOutlined } from "@ant-design/icons";
import DragAndDrop from "~/components/DragAndDrop";

type Props = {
  id?: string;
  onSuccess(): void;
  // initialValue: ProductionAdjustmentType.FormValues | undefined;
};

const Drag: FC<Props> = ({ id, onSuccess }) => {
  const {
    formCommon,
    handleSubmit,
    integration: { send, loading },
    messageSuggestions,
    hasError,
  } = useSimpleForm({
    defaultValues: {},
    integration: {
      route: "products",
      formatter: (data: any) => {
        console.log(data);
        return {
          ...data,
        };
      },
    },
  });

  const { Title } = Typography;

  const onSubmit = async () => {
    await send();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Spin tip="Loading..." spinning={loading}>
        <Wrapper>
          <DragAndDrop />
        </Wrapper>
      </Spin>
      <DefaultFooter
        isShowDeleteButton={Boolean(id)}
        saveLoading={loading}
        hasError={hasError}
        messageSuggestions={messageSuggestions}
      />
    </form>
  );
};

export default Drag;
