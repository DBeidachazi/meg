import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import "../../static/upload.css"
const Upload = ()=> {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
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

  const fileList = files.map(file => (
      <li key={file.path} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm mb-2">
        <span className="text-gray-800 font-medium">{file.path}</span>
        <span className="text-gray-600 text-sm">{file.size} bytes</span>
      </li>
  ));

  const uploadedFileList = uploadedFiles.map(file => (
      <li key={file.path} className="flex items-center justify-between bg-green-100 p-2 rounded-lg shadow-sm mb-2">
        <span className="text-green-800 font-medium">{file.path}</span>
        <span className="text-green-600 text-sm">{file.size} bytes</span>
      </li>
  ));

  const uploadFiles = () => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('myFile', file);
    });
    axios.post('http://127.0.0.1:8888/upload', formData, {
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
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p className="text-lg text-blue-600 font-semibold">
            拖动文件到这里，或者点击选择文件
          </p>
          <p className="text-sm text-gray-400">支持多种格式和大小</p>
        </div>
        <aside className="mt-4">
          <h4 className="text-gray-800 font-bold">已选择的文件</h4>
          <ul className="list-none">{fileList}</ul>
        </aside>
        <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:bg-blue-800"
            onClick={uploadFiles}
        >
          上传
        </button>
        <aside className="mt-4">
          <h4 className="text-gray-800 font-bold">已上传的文件</h4>
          <ul className="list-none">{uploadedFileList}</ul>
        </aside>
      </div>
  );
}

export default Upload;