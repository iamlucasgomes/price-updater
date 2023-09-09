import { FC, useState } from "react";
import DragAndDrop from "~/modules/Home/DragAndDrop/DragAndDrop";

type Props = {
  onSuccess(): void;
};

const FormContainer: FC<Props> = ({ onSuccess }) => {

  return (
      <DragAndDrop onSuccess={onSuccess} />
  );
};

export default FormContainer;
