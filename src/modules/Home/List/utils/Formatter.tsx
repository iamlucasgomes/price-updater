import { handleBRLNumberFormatter } from "~/utils/currency";

const formatter = () => (listItem: ProductsType.ProductsAPI) => {
  return {
    code: listItem.code,
    key: listItem.code,
    name: listItem.name,
    costPrice: handleBRLNumberFormatter(listItem.costPrice),
    salesPrice: handleBRLNumberFormatter(listItem.salesPrice),
  };
};

export default formatter;
