import React, { useRef, useState } from "react";
import DrawerForm, { DrawerFormRefType } from "~/components/DrawerForm";
import { DataTableRefType } from "~/components/DataTable";

import List from "./List";
import DragAndDrop from "~/modules/Home/DragAndDrop";

const Home: React.FC = () => {
  const [editId, setEditId] = useState<string>();
  const drawerFormRef = useRef<DrawerFormRefType>(null);
  const dataTableRef = useRef<DataTableRefType>(null);

  const onSuccess = () => {
    drawerFormRef.current?.onClose();
    dataTableRef.current?.refresh();
  };

  const onBeforeCreate = () => {
    setEditId(undefined);
  };

  return (
    <main>
      <List
        dataTableRef={dataTableRef}
        drawerFormRef={drawerFormRef}
        onEdit={setEditId}
        onBeforeCreate={onBeforeCreate}
        onDeleteSuccess={onSuccess}
      />
      <DrawerForm ref={drawerFormRef} title="Atualizar Preços" size="xl">
        <DragAndDrop onSuccess={onSuccess} />
      </DrawerForm>
    </main>
  );
};

export default Home;
