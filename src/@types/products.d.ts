declare namespace ProductsType {
  type ProductsList = {
    total: number;
    data: ProductsItemAPI[];
  };

  type ProductsAPI = {
    code: number;
    name: string;
    costPrice: string;
    salesPrice: string;
  };

  type FormValues = {};
}
