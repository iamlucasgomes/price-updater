import { forwardRef, useImperativeHandle, useState } from 'react';
import { Wrapper, ContentWrapper } from './styles';

export type DrawerFormRefType = {
  showDrawer(): void;
  onClose(): void;
  isOpen: boolean;
};

enum DRAWER_SIZE {
  lg = 320,
  xl = 420,
  xxl = 800,
  xxxl = 1200,
}

export type DrawerFormPropsType = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  title: string;
  size?: 'lg' | 'xl' | 'xxl' | 'xxxl';
};

const DrawerForm = forwardRef<DrawerFormRefType, DrawerFormPropsType>(
  function DrawerForm({ children, title, size = 'xxl', footer }, ref) {
    const [open, setOpen] = useState(false);

    useImperativeHandle(
      ref,
      () => {
        return {
          showDrawer,
          onClose,
          isOpen: open,
        };
      },
      [open],
    );

    function showDrawer() {
      setOpen(true);
    }

    function onClose() {
      setOpen(false);
    }

    return (
      <Wrapper
        title={title}
        placement="right"
        width={DRAWER_SIZE[size]}
        destroyOnClose
        closable
        onClose={onClose}
        visible={open}
        footer={footer}>
        <ContentWrapper>{children}</ContentWrapper>
      </Wrapper>
    );
  },
);

export default DrawerForm;
