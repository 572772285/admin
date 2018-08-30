import React from 'react';
import { Upload, Icon, Modal } from 'antd';

class UploadImg extends React.Component {
  constructor(props){
    super(props)
    this.state={
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
    this.handlePreview=this.handlePreview.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleCancel=this.handleCancel.bind(this)
  }

  handleCancel(){
    this.setState({ previewVisible: false })
}

  handlePreview(file){
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ fileList }){
    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={this.props.action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= this.props.max ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadImg