import React, { RefObject } from 'react';
import { Button, Table } from 'antd';
import Typography from 'antd/lib/typography';
import { PlusOutlined } from '@ant-design/icons';
import DataTable, { DataTableRefType } from '~/components/DataTable';
import useSimpleForm from '~/hooks/useSimpleForm';
import columns from './utils/Collumns';
import formatter from './utils/Formatter';
import { DrawerFormRefType } from '~/components/DrawerForm';

const { Title } = Typography;

type Props = {
  dataTableRef: RefObject<DataTableRefType>;
  drawerFormRef: RefObject<DrawerFormRefType>;
  onEdit: (id: string) => void;
  onBeforeCreate: () => void;
  onDeleteSuccess: () => void;
};

const List: React.FC<Props> = ({
  dataTableRef,
  drawerFormRef,
  onEdit,
  onBeforeCreate,
  onDeleteSuccess,
}: Props) => {
  const { watch, formCommon } = useSimpleForm({});
  const filter = watch();

  const showDrawer = (): void => {
    drawerFormRef.current?.showDrawer();
  };

  return (
    <div className="page">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Title>Produtos</Title>
        <Button
          type="primary"
          onClick={() => {
            showDrawer();
            onBeforeCreate();
          }}>
          <PlusOutlined /> Atualizar Preços
        </Button>
      </div>
      <main>
        <DataTable
          ref={dataTableRef}
          route="products"
          columns={columns}
          formatter={formatter()}
          filter={filter}
        />
      </main>
    </div>
  );
};

export default List;