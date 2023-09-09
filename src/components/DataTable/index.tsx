import React, { forwardRef, useImperativeHandle } from 'react';
import Table from '~/components/Table';
import useTable from '~/hooks/useTable';

export type DataTableRefType = {
  refresh(): void;
};

export type DataTablePropsType = {
  route: string;
  columns: any[];
  formatter: (item: any) => any;
  filter: object;
  rowSelection?: object;
};

const DataTable = forwardRef<DataTableRefType, DataTablePropsType>(
  function DataTable({ route, columns, formatter, filter, rowSelection }, ref) {
    const {
      error,
      rows,
      isLoading,
      page,
      setPage,
      perPage,
      setPerPage,
      sortCallback,
      total,
      mutate,
    } = useTable({
      route,
      formatter,
      filter,
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          refresh: () => {
            mutate();
          },
        };
      },
      [mutate],
    );

    if (error) return <div>Ocorreu um erro inesperado.</div>;

    return (
      <Table
        loading={isLoading}
        columns={columns}
        data={rows}
        total={total}
        scroll={{ x: '150% ' }}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        sortCallback={sortCallback}
        rowSelection={rowSelection}
      />
    );
  },
);

export default DataTable;
