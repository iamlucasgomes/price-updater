import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { on } from "events";

const { Dragger } = Upload;

const DragAndDrop: React.FC<{
  onFileUploadSuccess: (fileContents: any) => void;
}> = ({ onFileUploadSuccess }) => {
  const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: ".csv",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;

      if (status === "done") {
        message.success(`${info.file.name} arquivo carregado com sucesso.`);

        if (info.file.originFileObj) {
          const file = info.file.originFileObj;
          onFileUploadSuccess(file);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} falha no upload do arquivo.`);
      }
    },
    onDrop(e) {
      onFileUploadSuccess(e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Clique ou arraste o arquivo para esta área para fazer upload
      </p>
      <p className="ant-upload-hint">Suporte para upload único.</p>
    </Dragger>
  );
};

export default DragAndDrop;
