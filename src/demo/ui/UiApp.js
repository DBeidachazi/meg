import React from 'react';
import { connect } from 'react-redux';

import { Nav, Navbar, Container, ProgressBar, Row, Col } from 'react-bootstrap';
import StoreActionType from '../store/ActionTypes';

import UiMain from './UiMain';
import UiOpenMenu from './UiOpenMenu';
import UiViewMode from './UiViewMode';
// eslint-disable-next-line no-unused-vars
import UiAbout from './UiAbout';
import UiSaveMenu from './UiSaveMenu';
import UiReportMenu from './UiReportMenu';
import UiFilterMenu from './UiFilterMenu';
import UiModalText from './UiModalText';
import UiModalAlert from './UiModalAlert';
import UiErrConsole from './UiErrConsole';
import ModeView from '../store/ModeView';

import BrowserDetector from '../engine/utils/BrowserDetector';
import UiBackup from "./UiBackup";

class UiApp extends React.Component {
  constructor(props) {
    super(props);

    this.onShowModalText = this.onShowModalText.bind(this);
    this.onHideModalText = this.onHideModalText.bind(this);

    this.onShowModalAlert = this.onShowModalAlert.bind(this);
    this.onHideModalAlert = this.onHideModalAlert.bind(this);

    this.doShowProgressBar = this.doShowProgressBar.bind(this);
    this.doHideProgressBar = this.doHideProgressBar.bind(this);
    this.doSetProgressBarRatio = this.doSetProgressBarRatio.bind(this);

    this.m_modalText = null;
    this.m_store = null;
    this.m_fileNameOnLoad = '';

    this.state = {
      showModalText: false,
      showProgressBar: false,
      progressBarRatio: 55,
      showModalAlert: false,
      strAlertTitle: '???',
      strAlertText: '???',
      strProgressMessage: 'Loading...',
    };
    this.testLogCurrentFile()
  }

  testLogCurrentFile() {
    const store = this.props
    if (store.loadUrl === null) {
      // 如果为null回到root
      window.location.href = "/";
    }
    console.log(store.currentFile)
    console.log(store.loadUrl)
  }

  UNSAFE_componentWillMount() {
    let fileNameOnLoad = '';
    const strSearch = window.location.search;
    if (strSearch.length > 0) {
      const strReg = /\\?url=(\S+)/;
      const arr = strSearch.match(strReg);
      if (arr === null) {
        console.log('arguments should be in form: ?url=www.xxx.yy/zz/ww');
        return;
      }
      fileNameOnLoad = arr[1];
      const regA = /^((ftp|http|https):\/\/)?(([\S]+)\.)?([\S]+)\.([A-z]{2,})(:\d{1,6})?\/[\S]+/;
      const regB = /(ftp|http|https):\/\/([\d]+)\.([\d]+)\.([\d]+)\.([\d]+)(:([\d]+))?\/([\S]+)/;
      const isValidA = fileNameOnLoad.match(regA);
      const isValidB = fileNameOnLoad.match(regB);
      if ((isValidA === null) && (isValidB === null)) {
        console.log(`Not valid URL = ${fileNameOnLoad}`);
        return;
      }
      this.m_fileNameOnLoad = fileNameOnLoad;
    }
  }

  componentDidMount() {
    const store = this.m_store;
    if (store === null) {
      console.log('UiApp. componentDidMount. store is NULL');
    }
    store.dispatch({ type: StoreActionType.SET_UI_APP, uiApp: this });

    // browser detector
    const browserDetector = new BrowserDetector();
    this.isWebGl20supported = browserDetector.checkWebGlSupported();

    // 设置禁止弹窗 注释下面六行

    if (!this.isWebGl20supported) {
      // this.setState({ strAlertTitle: 'Browser compatibility problem detected' });
      // this.setState({ strAlertText: 'This browser not supported WebGL 2.0. Application functinality is decreased and app can be unstable' });
      // this.onShowModalAlert();
    } else {
      const isValidBro = browserDetector.checkValidBrowser();
      if (!isValidBro) {
        // this.setState({ strAlertTitle: 'Browser compatibility problem detected' });
        // this.setState({ strAlertText: 'App is specially designed for Chrome/Firefox/Opera/Safari browsers' });
        // this.onShowModalAlert();
      }
    }
  }

  onShowModalText() {
    this.setState({ showModalText: true });
  }

  onHideModalText() {
    this.setState({ showModalText: false });
  }

  onShowModalAlert() {
    this.setState({ showModalAlert: true });
  }

  onHideModalAlert() {
    this.setState({ showModalAlert: false });
  }

  doShowProgressBar(strProgressMsg) {
    if ((strProgressMsg === undefined) || (strProgressMsg === null)) {
      console.log('doShowProgressBar: need argument - strProgressMsg');
      return;
    }
    this.setState({ strProgressMessage: strProgressMsg });
    this.setState({ showProgressBar: true });
  }

  doHideProgressBar() {
    // console.log('doHideProgressBar');
    this.setState({ showProgressBar: false });
  }

  /**
   *
   * @param {number} ratio - in [0..99] range
   */
  doSetProgressBarRatio(ratio) {
    // console.log(`doSetProgressBarRatio: ${ratio}`);

    // show progress bar if it was hidden but need to show some non-0, non-100 progress
    if ((ratio >= 0) && (ratio <= 99)) {
      if (this.state.showProgressBar === false) {
        this.setState({ showProgressBar: true });
      }
    }
    this.setState({ progressBarRatio: ratio });
  }

  /**
   * Main component render func callback
   */
  render() {
    const store = this.props;
    this.m_store = store;
    const isLoaded = store.isLoaded;
    const fileName = store.fileName;
    const arrErrorsLoadedd = store.arrErrors;

    // eslint-disable-next-line no-unused-vars
    const strMessageOnMenu = (isLoaded) ? 'File: ' + fileName : '';    // Press Open button to load scene


    const strProgressMsg = this.state.strProgressMessage;

    const objPrgBarVis =
      <Row>
        <Col xs xl sm md lg="12" style={{ width: '100%' } }>
          {strProgressMsg}
          <ProgressBar animated variant="success"
            now={this.state.progressBarRatio} label={`${this.state.progressBarRatio}%`}  />
        </Col>
      </Row>
    const objProgressBar = (this.state.showProgressBar) ? objPrgBarVis : <p></p>;

    const jsxNavBarReact =
      <div style={{ display: "flex", height:'100vh', minHeight:'100%', flexGrow: 1 }}>
        <div style={{ width: "12%", background: "#fff", display: "flex", alignItems: "center" ,flexFlow: "column", height: "100%" }}>
          {/* todo sidebar */}
          {/* todo backup */}
          <div style={{ marginTop: "1rem", width: "100%" }}>
            <UiBackup />
          </div>

          {/* todo save */}
          <div style={{ marginTop: "1rem", width: "100%" }}>
            { store.isLoaded ? <UiSaveMenu/> : <p></p> }
          </div>

          {/* todo snapshot */}
          <div style={{ marginTop: "1rem", width: "100%" }}>
            <UiReportMenu />
          </div>

          {/* todo filter */}
          <div style={{ marginTop: "1rem", width: "100%" }}>
            {(store.modeView === ModeView.VIEW_2D) ? <UiFilterMenu /> : <p></p>}
          </div>

          {/* todo view mode */}
          <div style={{ marginTop: "1rem", width: "100%", display: "flex",justifyContent: "center" }}>
            {(isLoaded && this.isWebGl20supported) ? <UiViewMode /> : <p></p>}
          </div>

          {/*  todo sidebar over */}
        </div>
        <div style={{  height:'100%', minHeight:'100%', flexGrow: 1 }}>
          <Container fluid="true" style={{ height:'100%', minHeight:'100%', flexGrow: 1 }}  >
            {/*todo 顶栏*/}
            <Navbar bg="light" variant="light" expand="lg" hidden={true}>
              {/*<Navbar.Brand>*/}
              {/*  <UiBackup />*/}
              {/*  /!*<UiAbout />*!/*/}
              {/*</Navbar.Brand>*/}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                  {/*<Navbar.Text className="d-none d-sm-block">*/}
                  {/*  /!* todo 文件名 *!/*/}
                  {/*  {strMessageOnMenu}*/}
                  {/*</Navbar.Text>*/}

                  {/*<Sidebar></Sidebar>*/}


                  {/* todo 打开文件, 组件内部已删除 */}
                  <UiOpenMenu fileNameOnLoad={this.m_fileNameOnLoad} />
                  {/* todo 保存 */}
                  {/*<UiSaveMenu />*/}
                  {/* todo 报告结果 */}
                  {/*<UiReportMenu />*/}
                </Nav>
              </Navbar.Collapse>
              {/*<div>{ store.testStore }</div>*/}
            </Navbar>
            {/* todo 顶栏结束 */}

            {objProgressBar}  {/* 没用 */}
            {(isLoaded) ? <UiMain /> : <p></p>} {/*中间的加载的部分*/}
            {(arrErrorsLoadedd.length > 0) ? <UiErrConsole /> : <p></p>}
            <UiModalText stateVis={this.state.showModalText}
                         onHide={this.onHideModalText} onShow={this.onShowModalText} />
            <UiModalAlert stateVis={this.state.showModalAlert}
                          onHide={this.onHideModalAlert} onShow={this.onShowModalAlert}
                          title={this.state.strAlertTitle} text={this.state.strAlertText} />
          </Container>
        </div>
      </div>;

    return jsxNavBarReact;
  }
}

export default connect(store => store)(UiApp);
