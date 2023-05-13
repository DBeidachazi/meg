/**
 * @fileOverview UiAbout
 * @author Epam
 * @version 1.0.0
 */


// ********************************************************
// Imports
// ********************************************************

import React from 'react';
import { Button } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Nav, Modal } from 'react-bootstrap'

import packageJson from '../../../package.json';
import UiSkelAni from './UiSkelAni';

// ********************************************************
// Class
// ********************************************************

/**
 * Class UiAbout dialog
 */
export default class UiAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  onShow() {
    this.setState({ modalShow: true });
  }

  onHide() {
    this.setState({ modalShow: false });
  }

  render() {

    const strVer = packageJson.version;
    const strName = packageJson.name;
    const strDescription = packageJson.description;
    const strAuthor = packageJson.author;
    const strYear = packageJson.year;

    const strButtonOnly = 
    <Button onClick={this.onShow} variant="secondary">
      <i className="fa fa-question-circle"></i>
      {/* About  */}
      关于软件
    </Button>;
    const strButtonWithTrigger = 
    <OverlayTrigger 
      key="about"
      placement="bottom"
      overlay = {
        <Tooltip>
          {/* 查看有关此应用程序的详细信息 */}
          {/* See detailed information about this app */}
          查看有关此应用程序的详细信息
        </Tooltip>
      }
    >
      <Button onClick={this.onShow} variant="secondary">
        <i className="fa fa-question-circle"></i>
        关于软件
      </Button>
    </OverlayTrigger>;

    const strBtnDynamic = (this.state.modalShow) ? strButtonOnly : strButtonWithTrigger;


    const strAbout = 
    <Nav.Item>

      {strBtnDynamic}

      <Modal show={this.state.modalShow} onHide={this.onHide} >
        <Modal.Title>
          {strName}
        </Modal.Title>
        <Modal.Header>
          <Modal.Body className="text-center">
            <UiSkelAni />
            <p>
              {strDescription}
            </p>
            <p>
              <b>Version: </b> {strVer}
            </p>
            <p>
              <b>Copyright: </b> {strYear} {strAuthor}
            </p>

          </Modal.Body>
        </Modal.Header>

        <Modal.Footer>
          <Button onClick={this.onHide} variant="secondary">
            {/* Close */}
            关闭
          </Button>
        </Modal.Footer>

      </Modal>
    </Nav.Item>
    return strAbout;

  }
}

