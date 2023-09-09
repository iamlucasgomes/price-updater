import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { handleBRLNumberFormatter, handleMoneyOnBRL } from "~/utils/currency";
import {CheckCircleTwoTone} from "@ant-design/icons";

const { Text } = Typography;

const CardComponent: React.FC<{
  title: string;
  content: {
    code: number;
    name: string;
    costPrice: string;
    salesPrice: string;
    newPrice: string;
  };
}> = ({ title, content }) => (
  <Row gutter={30}>
    <Col span={24}>
      <Card
        title={
          <span>
            <CheckCircleTwoTone twoToneColor="#52c41a" /> {title}
          </span>
        }
        bordered={true}
      >
        <Text>{content.name}</Text>
        <br />
        <Text>Preço atual: {handleMoneyOnBRL(content.salesPrice)}</Text>
        <br />
        <Text>Novo Preço: {handleMoneyOnBRL(content.newPrice)}</Text>
      </Card>
    </Col>
  </Row>
);

export default CardComponent;
