import React from "react";
import { Upload, Row, Col, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Http from "./../../api/http";
import { getBase64 } from "../../utils/utils";

const http = new Http();

class UploadFile extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    image: "",
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = (data) => {
    /*Este try-catch fue necesario dado que el onChange se comporta de forma extraña,
    ya que cuando un archivo se sube deberia esperar hasta que el argumento fileList este
    con valor del archivo, pero no es haci, se ejecuta antes de subir el archivo y provoca 2 erroes
    y luego en un tercer intento funciona, no se a que debe, probablemente un error de la libreria.
   */

    try {
      const url = data.file.response.image;

      console.log(url);
      this.setState({
        fileList: data.fileList,
      });

      this.props.setImage(url);
    } catch (error) {
      console.error(error);
    }
  };

  uploadButton() {
    return (
      <div>
        <PlusOutlined />
        <div className="">Subir</div>
      </div>
    );
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;

    return (
      <div>
        <Row>
          <Col span={24}>
            <Upload
              action={http.uploadImage("event/uploadPost")}
              listType="picture-card"
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              name="photo"
            >
              {fileList.length === 0 ? this.uploadButton() : null}
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="photo-facebook"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Upload>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UploadFile;
