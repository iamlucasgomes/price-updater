import { useState, useEffect } from 'react';
import type { SWRResponse } from 'swr';
import useIntegration from '~/hooks/useIntegration';

const firstPage = 1;

export type Sort = {
  field: string | undefined;
  order: string | undefined;
};

type Props = {
  route: string;
  formatter(item: any): () => JSX.Element;
  filter: object;
};

const useTable = ({ route, formatter, filter }: Props) => {
  const [rows, setRows] = useState<Array<unknown>>([]);
  const [currentPage, setCurrentPage] = useState(firstPage);
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState<Sort>({
    field: undefined,
    order: undefined,
  });

  const resetPage = () => {
    setCurrentPage(firstPage);
  };

  const sortCallback = ({ field, order }: Sort) => {
    setSort({
      field,
      order,
    });
  };

  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  }: SWRResponse<ProductsType.ProductsList, any, boolean> = useIntegration({
    route,
    page: currentPage,
    perPage,
    sort,
    filter,
  });

  useEffect(() => {
    if (data?.data) {
      setRows((data?.data ?? []).map((item: any) => formatter(item)));
    }
  }, [data, formatter]);

  return {
    page: currentPage,
    setPage: setCurrentPage,
    resetPage,
    perPage,
    setPerPage,
    sort,
    sortCallback,
    rows,
    error,
    isLoading,
    isValidating,
    total: data?.total,
    mutate,
  };
};

export default useTable;
