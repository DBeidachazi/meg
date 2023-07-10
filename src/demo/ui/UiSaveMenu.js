/**
 * @fileOverview UiSaveMenu
 * @author Epam
 * @version 1.0.0
 */

// ********************************************************
// Imports
// ********************************************************

import React from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { NavDropdown } from 'react-bootstrap';

// eslint-disable-next-line no-unused-vars
import UiModalSaveNifti from './UiModalSaveNifti';
import { Button } from "antd"
import { SaveOutlined } from "@ant-design/icons";
import SaverNifti from "../engine/savers/SaverNifti";

// ********************************************************
// Const
// ********************************************************

// ********************************************************
// Class
// ********************************************************

/**
 * Class UiSaveMenu some text later...
 */
class UiSaveMenu extends React.Component {
  /**
   * @param {object} props - props from up level object
   */
  constructor(props) {
    super(props);

    this.onModalSaveNiftiShow = this.onModalSaveNiftiShow.bind(this);
    this.onModalSaveNiftiHide = this.onModalSaveNiftiHide.bind(this);

    this.state = {
      showModalSaveNifti: false,
    };

  }

  testSaveMenuStore() {
    const store = this.props;
    if (store.isLoaded) console.log("-----------", store.fileName)
  }

  // invoked after render
  componentDidMount() {
  }

  onModalSaveNiftiShow() {
    this.setState({ showModalSaveNifti: true });
  }

  onModalSaveNiftiHide() {
    this.state.showModalSaveNifti = false;
    this.setState({ showModalSaveNifti: false });
    console.log(this.state.showModalSaveNifti)
    console.log('onModalSaveNiftiHide...');
  }

  // invoked on save nifti file format
  onSaveNifti( name ) {
    const store = this.props;

    const volSet = store.volumeSet;
    const volIndex = store.volumeIndex;
    const vol = volSet.getVolume(volIndex);

    const xDim = vol.m_xDim;
    const yDim = vol.m_yDim;
    const zDim = vol.m_zDim;
    const xBox = vol.m_boxSize.x;
    const yBox = vol.m_boxSize.y;
    const zBox = vol.m_boxSize.z;
    const volSize = {
      x: xDim,
      y: yDim,
      z: zDim,
      pixdim1: xBox / xDim,
      pixdim2: yBox / yDim,
      pixdim3: zBox / zDim,
    };
    let volData = vol.m_dataArray;
    const vR = store.volumeRenderer; 
    if ( vR !== null ) {
      volData = vR.volumeUpdater.bufferR;
    };

    const niiArr = SaverNifti.writeBuffer(volData, volSize);
    const textToSaveAsBlob = new Blob([niiArr], { type: 'application/octet-stream' });
    const textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    let fileName = name;
    const goodSuffix = fileName.endsWith('.nii');
    if (!goodSuffix) {
      fileName = fileName.concat('.nii');
    }
    // console.log(`Save to file ${fileName}`);

    const downloadLink = document.createElement('a');
    downloadLink.download = fileName;
    downloadLink.innerHTML = 'Download File';
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = event => document.body.removeChild(event.target);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);

    downloadLink.click();
  }


  render() {
    const store = this.props;
    const isLoaded = store.isLoaded;
    // eslint-disable-next-line no-unused-vars
    const strDisabled = (isLoaded) ? false : true;

    const jsxSaveMenu =
        // <NavDropdown id="save-nav-dropdown"
        //   disabled={strDisabled}
        //   title={
        //     <div style={{ display: 'inline-block' }}>
        //       <i className="fas fa-save"></i>
        //       保存
        //     </div>
        //   } >
        // <Button type="text" icon={<SaveOutlined/>} style={{ height: "3rem" }} onClick={evt => this.onModalSaveNiftiShow(evt)} >
        <Button type="text" icon={<SaveOutlined/>} style={{ height: "3rem" }} onClick={ () => this.onSaveNifti(store.fileName)} >
          保存到Nifti
        </Button>
    // </NavDropdown>;


    return jsxSaveMenu;
  }
}

export default connect(store => store)(UiSaveMenu);

