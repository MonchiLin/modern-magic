/* eslint-disable no-const-assign */
import React, { Component, Fragment } from 'react';
import { Upload, message, Button, Icon, Modal, Progress } from 'antd';
import SparkMD5 from 'spark-md5'
import axios from 'axios'
import request from 'superagent'

export default class WeUpload2 extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      percent: 0,
      visible: false,
      fileMd5: '',
      chunks: []
    }
  }

  // 文件分片
  beforeUpload = (file) => {
    const { size, chunkSize = 4 } = this.props;
    const bytes = file.size / 1024 / 1024 < Number(size) // 最大5g
    if (!bytes) {
      message.error(`文件必须小于 ${size}MB!`);
      return false
    }

    this.setState({
      percent: 0,
      visible: true,
    })
    // eslint-disable-next-line no-underscore-dangle
    const _this = this
    return new Promise((resolve, reject)=> {
      // 整个文件的md5
      if(file.size / 1024 / 1024 < 1024) {
        // 如果文件太大，不进行md5校验，否则chrome会崩溃
        const totalFileReader = new FileReader() // 用于计算出总文件的fileMd5
        const fileSpark = new SparkMD5.ArrayBuffer()
        totalFileReader.onload = (e)=> {
          fileSpark.append(e.target.result)
          _this.setState({fileMd5: fileSpark.end()})
          // resolve('ok')
        }
        totalFileReader.readAsArrayBuffer(file)
        totalFileReader.onerror = ()=> {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('something went wrong')
        }
      }
      const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice; // 兼容性的处理
      const chunkSizeM = 1024 * 1024 * chunkSize;    // 切片每次xM
      const chunkCount = Math.ceil(file.size / chunkSizeM); // 总切片数
      let currentChunk = 0; // 当前上传的chunk
      // const chunkSpark = new SparkMD5.ArrayBuffer()
      const chunkFileReader = new FileReader()  // 用于计算出每个chunkMd5
      const dealChunks = [] // 已经上传的分片数
      chunkFileReader.onload = (e)=> {
        if(currentChunk < chunkCount) {
          // 当前切片总数没有达到总数时
          // chunkSpark.append(e.target.result)
          dealChunks.push({
            chunk: currentChunk,
            data: e.target.result
            // start: currentChunk * chunkSizeM, // 计算分片的起始位置
            // end: ((currentChunk * chunkSizeM + chunkSizeM) >= file.size) ? file.size : currentChunk * chunkSizeM + chunkSizeM, // 计算分片的结束位置
            // chunkMd5: chunkSpark.end(),
          })
          // eslint-disable-next-line no-plusplus
          currentChunk++
          loadNext()
        } else {
          _this.setState({
            chunks: dealChunks
          })
          resolve('ok')
        }
      }
      loadNext()
      function loadNext() {
        const start = currentChunk * chunkSizeM;
        const end = ((start + chunkSizeM) >= file.size) ? file.size : start + chunkSizeM;
        chunkFileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }
      
      chunkFileReader.onerror = ()=> {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('something went wrong')
      }
    })
  }

  // 自定义上传逻辑
  customRequest = ({ action, file })=> {
    const { handleChange, threads = 3 } = this.props;
    const { fileMd5, chunks } = this.state;
    // eslint-disable-next-line no-underscore-dangle
    const _this = this
    const uploadChunks = [] // 已经上传的分片数
    const chunkCount = chunks.length
    let currentCount = 0 // 当前并发数量

    function uploadChunk(chunk) {
       // eslint-disable-next-line no-plusplus
      currentCount++
      _this.setState({
        percent: Number((chunk.chunk / chunkCount * 100).toFixed(2)),
        visible: true,
      })
      // todo 控制同时上传的数量
      let blob = new Blob([chunk.data], {type: 'application/octet-stream'})
      // eslint-disable-next-line no-shadow
      let dataForm = new FormData();
      dataForm.append('chunk', chunk.chunk) // 当前分片
      dataForm.append('file', blob, file.name) // 分片文件

      request
        .post(action)
        .send(dataForm)
        .retry(3)
        // .withCredentials()
        // .set('Accept', 'application/json')
        // .timeout({
        //   response: 5000,  // Wait 5 seconds for the server to start sending,
        //   deadline: 60000, // but allow 1 minute for the file to finish loading.
        // })
        .end((err, res)=> {
          // eslint-disable-next-line no-plusplus
          currentCount--
          if(err) {
            // uploadChunk(chunk)
          }
          else if(res.body.code == 1) {
            uploadChunks.push(res.body.chunk)
          }else {
            // eslint-disable-next-line no-console
            console.log(res.body.msg)
          }
        })
      // axios.post(action, dataForm, {
      //   headers: { "Content-Type": "multipart/form-data" },
      //   timeout: 15000 // 5秒超时
      // })
      // .then(({ data })=> {
      //     // eslint-disable-next-line no-plusplus
      //     currentCount--
      //     if(data.code == 1) {
      //       uploadChunks.push(data.chunk)
      //     }else {
      //       // eslint-disable-next-line no-console
      //       console.log(data.msg)
      //     }
      // })
      // .catch(e=> {
      //    // eslint-disable-next-line no-plusplus
      //   currentCount--
      //   uploadChunk(chunk)
      // })
      blob = null
      dataForm = null
    }
    // uploadChunk(chunks.shift())
    // return 


    // 定时获取文件是否上传完毕
    const itId = setInterval(() => {
      if(uploadChunks.length === chunkCount) {
        clearInterval(itId)
        const data = new FormData();
        data.append('fileMd5', fileMd5) // 整个文件md5
        data.append('done', 1) // 已完成
        data.append('filename', file.name) // 文件名
        data.append('chunks', chunkCount) // 总片数
        axios.post(action, data, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        // eslint-disable-next-line no-shadow
        .then(({ data })=> {
          _this.setState({
            percent: 100,
            visible: false              
          })
          if(data.code == 1) {
            if(!data.continue) {
              if(handleChange) {
                handleChange({...data, file_name: file.name})
              }
            }
          }else if(data.code == -1) {
            // 系统错误
            // eslint-disable-next-line no-console
            console.log(data.msg)
          }else if(data.code == -2) {
            // 某个切片不存
            // eslint-disable-next-line no-console
            console.log(data.msg)
          }else if(data.code == -3) {
            // 文件合并部分缺失
            // eslint-disable-next-line no-console
            console.log(data.msg)
          }else {
            // eslint-disable-next-line no-console
            console.log(data.msg)
          }
      })
      }
      if(currentCount < threads) {
        let currentChunk = chunks.shift()
        if(currentChunk) {
          uploadChunk(currentChunk)
        }
        currentChunk = null
      }
    }, 200);
  }

  render() {
    const {
      listType,
      btnText,
      accept,
      multiple,
      headers,
      // fileList,
      showUploadList,
      action,
      data,
      disabled,
      btnType,
    } = this.props;
    const { percent, visible } = this.state;
    const type = listType === 'pic' ? 'picture-card' : null;
    const children = () => {
      if (listType === 'pic') {
        return (
          <Fragment>
            <Icon type="upload" />
            {btnText}
          </Fragment>
        );
      }
      if (listType === 'text') {
        return (
          <Fragment>
            <a>{btnText}</a>
          </Fragment>
        );
      }
      return (
        <Fragment>
          <Button type={btnType}>
            <Icon type="upload" />
            {btnText}
          </Button>
        </Fragment>
      );
    };
    return (
      <Fragment>
        <Upload
          name="file"
          accept={accept}
          action={action}
          headers={headers}
          listType={type}
          multiple={multiple}
          customRequest={this.customRequest}
          showUploadList={showUploadList}
          beforeUpload={this.beforeUpload}
          data={data}
          supportServerRender
          disabled={disabled} // 上传禁用
        >
          {children()}
        </Upload>
        <Modal visible={visible} width={125} footer={null} closable={false}>
          <Progress type="circle" percent={percent} width={80} />
        </Modal>
      </Fragment>
    );
  }
}
