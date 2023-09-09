import { Button, Col, Row, Tooltip, Typography } from "antd";
import { StyledFooter } from "./styles";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

type FooterProps = {
  saveLoading?: boolean;
  hasError: boolean;
  text?: string;
  isValidating?: boolean;
  setHasError?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsValidating?: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts?: React.Dispatch<
    React.SetStateAction<
      {
        code: number;
        name: string;
        costPrice: string;
        salesPrice: string;
        newPrice: string;
      }[]
    >
  >;
  messageSuggestions: {
    title: string;
    full: string;
  }[];
};

const DefaultFooter: React.FC<FooterProps> = ({
  saveLoading,
  hasError,
  messageSuggestions,
  text,
  isValidating,
  setIsValidating,
  setProducts,
  setHasError,
}) => {
  return (
    <StyledFooter>
      <Row justify="end">
        {!hasError && isValidating && (
          <Col style={{ marginRight: "5px" }} span={6}>
            <Button
              htmlType="submit"
              loading={saveLoading}
              block
              type="primary"
            >
              Atualizar
            </Button>
          </Col>
        )}
        {isValidating && (
          <Col style={{ marginRight: "5px" }} span={6}>
            <Button
              htmlType="submit"
              loading={saveLoading}
              block
              type="primary"
              onClick={() => {
                if (setIsValidating) setIsValidating(false);
                if (setProducts) setProducts([]);
                if (setHasError) setHasError(false);
              }}
            >
              Cancelar
            </Button>
          </Col>
        )}
        <Col style={{ marginRight: "18px" }} span={6}>
          <Button
            disabled={isValidating}
            htmlType="submit"
            loading={saveLoading}
            block
            type="primary"
          >
            {text ? text : "Salvar"}
          </Button>
        </Col>
      </Row>
      <Row justify="end">
        <Col style={{ marginTop: 4, marginRight: 16 }}>
          {hasError && (
            <Text type="danger" style={{ marginRight: 16 }}>
              {messageSuggestions.map((message, index) => (
                <Tooltip key={index} title={message.title}>
                  <p key={index}>
                    <QuestionCircleOutlined />
                    &nbsp;
                    {message.full}
                  </p>
                </Tooltip>
              ))}
            </Text>
          )}
        </Col>
      </Row>
    </StyledFooter>
  );
};

export default DefaultFooter;
