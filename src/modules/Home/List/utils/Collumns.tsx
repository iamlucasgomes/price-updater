const columns = [
  {
    title: 'Codigo',
    dataIndex: 'code',
    key: 'code',
    sortDirections: ['descend', 'ascend'],
    sorter: true,
  },
  {
    title: 'Nome do Produto',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Preço de custo',
    dataIndex: 'costPrice',
    key: 'costPrice',
  },
  {
    title: 'Preço de venda',
    dataIndex: 'salesPrice',
    key: 'salesPrice',
  },
];

export default columns;