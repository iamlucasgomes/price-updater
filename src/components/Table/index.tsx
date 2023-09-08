import { FC } from 'react';
import { Table as AntTable } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { TableProps } from 'antd/lib/table';
import { Sort } from '~/hooks/useTable';

export type Column = {
  title: string;
  dataIndex: string;
  key: string;
};

type Props = TableProps<any[]> & {
  data: any[];
  total?: number;
  page?: number;
  perPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  sortCallback: ({ field, order }: Sort) => void;
  rowSelection?: object;
};

const Table: FC<Props> = ({
  data,
  total,
  page,
  expandable,
  columns = [],
  loading = false,
  setPage,
  perPage,
  setPerPage,
  sortCallback,
  rowSelection,
}) => {
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    _,
    pageSize,
  ) => {
    setPerPage(pageSize);
  };

  const onPageChange = (curPage: number, pageSize: number) => {
    setPage(curPage);
    setPerPage(pageSize);
  };

  return (
    <AntTable
      columns={columns}
      rowSelection={rowSelection}
      dataSource={data}
      loading={loading}
      pagination={{
        size: 'small',
        current: page,
        pageSize: perPage,
        defaultPageSize: 10,
        showSizeChanger: true,
        total,
        showTotal: (tableTotal, range) =>
          `${range[0]}-${range[1]} de ${tableTotal} itens`,
        onShowSizeChange,
        onChange: onPageChange,
        position: ['bottomRight', 'bottomRight'],
      }}
      expandable={expandable}
      onChange={(_a, _b, sorterResult: any): void => {
        if (sortCallback) {
          sortCallback({
            field: sorterResult?.field ? sorterResult?.field : undefined,
            order: sorterResult?.order,
          });
        }
      }}
    />
  );
};

export default Table;
