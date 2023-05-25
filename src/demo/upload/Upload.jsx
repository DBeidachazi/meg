import React, { useEffect, useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import "../../static/upload.css"
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import ActionTypes from "../store/ActionTypes";

const getFiles = async() => {
  let res = null;
  // todo vue和react无法通信 实现方法：Vue点击进入react页面后，向flask发送一个用户名，存储到全局变量中，react进入页面直接调用接口获取用户名
  await axios.get(`http://127.0.0.1:8009/getnumber`).then( async( { data : { data : { current_number } } }) => {
    console.log("当前手机号 ", current_number)
    await axios.get(`http://127.0.0.1:8009/getAllFileName?mobile=${current_number}`).then( ({ data }) => {
      console.log(data)
      res = data
    })
  })
  return res;
}

const Upload = ( store ) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    getFiles().then( data => {
      setUploadedFiles(data)
    })
  },[])


  // eslint-disable-next-line no-unused-vars
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        // Check if the file is already selected or uploaded
        if (!files.some((f) => f.path === file.path) && !uploadedFiles.some((f) => f.path === file.path)) {
          setFiles((prev) => [...prev, file]);
        } else {
          alert("File already selected or uploaded: " + file.path);
        }
      });
    },
  });

  // eslint-disable-next-line no-unused-vars
  const fileList = files.map(file => (
      <li key={file.path} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm mb-2">
        <span className="text-gray-800 font-medium">{file.path}</span>
        <span className="text-gray-600 text-sm">{file.size} bytes</span>
      </li>
  ));

  const uploadedFileList = uploadedFiles.map(file => (
      <li key={file.key} className="flex items-center justify-between bg-green-100 p-2 rounded-lg shadow-sm mb-2" onClick={() => {
        const fileName = file.file_name.replace(/_0000/g, "").replace(/\.gz$/, "");
        console.log(fileName)
        store.dispatch({ type: ActionTypes.SET_LOAD_URL, loadUrl: 'http://127.0.0.1:8009/' + fileName })
        navigate('/main');
      }}>
          <span className="text-green-800 font-medium">{file.file_name}</span>
      </li>
  ));

  // const uploadedFileList = uploadedFiles.map(file => (
  //     <li key={file.key} className="flex items-center justify-between bg-green-100 p-2 rounded-lg shadow-sm mb-2" onClick={() => {
  //       axios.get(`http://127.0.0.1:8009/getOnePath?file_name=${file.file_name}`, {}, { responseType: 'blob' }).then(async(resp) => {
  //         // 构造fileList
  //         console.log(resp)
  //         // let files = new File([resp.data], "test.nii.gz", { type: "text/plain;charset=utf-8" });
  //         // let files = new File([resp.data], "0f593c1e-4bb8-470f-a87b-fee3dbd.nii", { type: "application/gzip" });
  //         const fileName = file.file_name.replace(/_0000/g, "").replace(/\.gz$/, "");
  //         console.log(fileName)
  //         let files = new File([resp.data], fileName , { type: "" });
  //         console.log(files)
  //         setTimeout(async() => {
  //           let dt = new DataTransfer()
  //           dt.items.add(files)
  //           console.log(dt.files)
  //           await store.dispatch({ type: ActionTypes.SET_CURRENT_FILE , currentFile: dt.files })
  //           await navigate('/main');
  //         }, 1000)
  //
  //       })
  //     }}>
  //       {/*<li key={file.key} className="flex items-center justify-between bg-green-100 p-2 rounded-lg shadow-sm mb-2">*/}
  //         <span className="text-green-800 font-medium">{file.file_name}</span>
  //       {/*</li>*/}
  //     </li>
  // ));

  // eslint-disable-next-line no-unused-vars
  const uploadFiles = () => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('myFile', file);
    });
    axios.post('http://127.0.0.1:8009/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response.data);
      setUploadedFiles(prev => [...prev, ...files]);
      setFiles([]);
    }).catch(error => {
      console.log(error);
      alert('上传失败');
    });
  };

  return (
      <div className="container">
        {/*<div {...getRootProps({ className: "dropzone" })}>*/}
        {/*  <input {...getInputProps()} />*/}
        {/*  <p className="text-lg text-blue-600 font-semibold">*/}
        {/*    拖动文件到这里，或者点击选择文件*/}
        {/*  </p>*/}
        {/*  <p className="text-sm text-gray-400">支持多种格式和大小</p>*/}
        {/*</div>*/}
        {/*<aside className="mt-4">*/}
        {/*  <h4 className="text-gray-800 font-bold">已选择的文件</h4>*/}
        {/*  <ul className="list-none">{fileList}</ul>*/}
        {/*</aside>*/}
        {/*<button*/}
        {/*    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:bg-blue-800"*/}
        {/*    onClick={uploadFiles}*/}
        {/*>*/}
        {/*  上传*/}
        {/*</button>*/}
        <aside className="mt-4">
          <h4 className="text-gray-800 font-bold">已上传的文件</h4>
          <ul className="list-none">{uploadedFileList}</ul>
        </aside>
      </div>
  );
}

export default connect(store => store)(Upload);
