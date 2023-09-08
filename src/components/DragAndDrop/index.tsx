import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,
  maxCount: 1,
  accept: ".csv",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} arquivo carregado com sucesso.`);

      if (info.file.originFileObj) {
        const file = info.file.originFileObj;
        const reader = new FileReader();

        reader.onload = (event) => {
          const fileContents = event.target?.result;
          console.log("Conteúdo do arquivo:", fileContents);
        };

        reader.readAsText(file);
      }
    } else if (status === "error") {
      message.error(`${info.file.name} falha no upload do arquivo.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const DragAndDrop: React.FC = () => (
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

export default DragAndDrop;
