import { Button, Col, Row, Tooltip, Typography } from 'antd';
import { StyledFooter } from './styles';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

type FooterProps = {
  onClickDelete?(): void;
  isShowDeleteButton?: boolean;
  deleteLoading?: boolean;
  saveLoading?: boolean;
  hasError: boolean;
  text?: string;
  disabled?: boolean;
  disabledMessage?: {
    title: string;
    full: string;
  };
  messageSuggestions: {
    title: string;
    full: string;
  };
};

const DefaultFooter: React.FC<FooterProps> = ({
  onClickDelete,
  isShowDeleteButton,
  deleteLoading,
  saveLoading,
  hasError,
  messageSuggestions,
  text,
  disabled,
  disabledMessage,
}) => {
  return (
    <StyledFooter>
      <Row justify="end">
        <Col style={{ marginTop: 4, marginRight: 16 }}>
          {hasError && (
            <Tooltip title={messageSuggestions.full}>
              <Text type="danger">
                <QuestionCircleOutlined />
                &nbsp;
                {messageSuggestions.title}
              </Text>
            </Tooltip>
          )}
        </Col>
        {isShowDeleteButton && (
          <Col span={4} style={{ marginRight: 16 }}>
            <Button
              loading={deleteLoading}
              onClick={onClickDelete}
              htmlType="button"
              block
              type="text"
              icon={<DeleteOutlined />}>
              Excluir
            </Button>
          </Col>
        )}
        <Col style={{ marginTop: 4, marginRight: 16 }}>
          {disabled && (
            <Tooltip title={disabledMessage?.full}>
              <Text type="warning">
                <QuestionCircleOutlined />
                &nbsp;
                {disabledMessage?.title}
              </Text>
            </Tooltip>
          )}
        </Col>
        <Col style={{marginRight: '20px'}} span={4}>
          <Button
            htmlType="submit"
            loading={saveLoading}
            disabled={disabled}
            block
            type="primary">
            {text ? text : 'Salvar'}
          </Button>
        </Col>
      </Row>
    </StyledFooter>
  );
};

export default DefaultFooter;
