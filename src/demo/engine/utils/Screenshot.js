/*
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/
/**
* Screen shot take from app
* @module demo/engine/utils/screenshot
*/
// absolute imports
import axios from "axios";
import { notification } from "antd"
// eslint-disable-next-line no-unused-vars
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";

/**
* Class Screenshot to take screen copy
* @class Screenshot
*/


const copyToClipboard = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  notification.open({
    message: "圖片地址已複製到剪貼簿",
    description: "請直接在診斷書中粘貼",
    icon: <CheckOutlined />,
  })
};

class Screenshot {
  /**
  * Convert string into byte array
  */
  static bytesFromBase64(str) {
    const binary = window.atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; ++i) {
      bytes[i] = binary[i].charCodeAt(0);
    }
    return bytes.buffer;
  }

  /**
  * Encode byte buffer into base64
  */
  static bytesToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  /**
  * Convert data URI to blob (for further save)
  */
  static dataUriToBlob(uri) {
    const parts = uri.split(/[:;,]/);
    const partsCount = parts.length;
    const MAX_PARTS = 3;
    const PART_OFFSET = 2;
    if (partsCount >= MAX_PARTS && parts[partsCount - PART_OFFSET] === 'base64') {
      return new Blob([Screenshot.bytesFromBase64(parts[partsCount - 1])]);
    }
    return null;
  }

  /**
  * Open new browser window and display screenshot in it
  */
  static showScreenshotInNewWindow(imageUri) {
    // show image on screen
    // console.log(`imageUri = ${imageUri}`);
    const win = window.open('about:blank', 'Screenshot', 'width=800,height=600');
    win.document.write(`<body style="margin:0"><img src="${imageUri}" alt="from canvas" /></body>`);
  }

  /**
  * Save screenshot in file
  */
  static saveScreenShotToFile(imageUri, fileName) {
    // save image to file
    const blob = Screenshot.dataUriToBlob(imageUri);
    // window.saveAs(blob, fileName);
    if (typeof window !== 'undefined' && window.navigator && window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fileName);
    } else if (typeof document !== 'undefined') {
      const lnk = document.createElement('a');
      lnk.download = fileName;
      lnk.innerHTML = 'download';
      lnk.href = window.URL.createObjectURL(blob);
      document.body.appendChild(lnk);
      lnk.click();
      document.body.removeChild(lnk);
    }
  }

  /**
  * Format value as a text with 2 digits. '2' -> '02', '34' -> '34'
  */
  static formatTwoDigits(val) {
    const TEN = 10;
    if (val >= TEN) {
      return val;
    }
    return `0${val}`;
  }

  /**
  * Get current date + time in format YYMMDD-HHMMSS
  */
  static getFormattedDateString() {
    const date = new Date();
    const yy = date.getUTCFullYear();
    const mn = Screenshot.formatTwoDigits(1 + date.getUTCMonth());
    const dd = Screenshot.formatTwoDigits(date.getUTCDate());
    const hh = Screenshot.formatTwoDigits(date.getHours());
    const mi = Screenshot.formatTwoDigits(date.getMinutes());
    const ss = Screenshot.formatTwoDigits(date.getSeconds());
    const strDate = `${yy}${mn}${dd}-${hh}${mi}${ss}`;
    return strDate;
  }

  /**
  * Get screenshot
  */



  static async makeScreenshot(engineRender, shotW, shotH) {
    const imageUri = engineRender.screenshot(shotW, shotH);
    const blob = Screenshot.dataUriToBlob(imageUri);
    const formData = new FormData();
    const strFmtDate = Screenshot.getFormattedDateString();
    const fileName = `screenshot-${strFmtDate}.png`;
    const file = new File([blob], fileName)
    console.log(file)
    formData.append('smfile', file)
    console.log(formData)
    notification.open({
      message: "正在上傳圖片",
      description: "請稍等",
      icon: <LoadingOutlined />,
    })
    axios.post("http://localhost:8009/sm_upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then( ({ data: { data: { url } } })=> {
        // todo 修改url to md
        console.log(url)
        copyToClipboard("![](" + url + ")")
      })
    // let { data } = await smUpload(formData)
    // console.log(data)
    // const imageUri = engineRender3d.screenshot();

    // show screen shot
    // Screenshot.showScreenshotInNewWindow(imageUri);
    // TODO: create save as dialog instead of automatic save screen shot to file

    // if (imageUri !== null) {
    //   // save screen shot
    //   const strFmtDate = Screenshot.getFormattedDateString();
    //   const fileName = `screenshot-${strFmtDate}.png`;
    //   Screenshot.saveScreenShotToFile(imageUri, fileName);
    // }
  }
}

export default Screenshot;
