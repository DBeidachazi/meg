/**
 * @fileOverview UiTools2d
 * @author Epam
 * @version 1.0.0
 */


// ********************************************************
// Imports
// ********************************************************

import React from 'react';
import { connect } from 'react-redux';

import StoreActionType from '../store/ActionTypes';
import Tools2dType from '../engine/tools2d/ToolTypes';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// ********************************************************
// Class
// ********************************************************
class UiTools2d extends React.Component {
  constructor(props) {
    super(props);
    this.onClickButtonTools = this.onClickButtonTools.bind(this);
    this.state = {
      data: [
        // images/icon_tools2d_intensity.png
        { img: ' images/icon_tools2d_intensity.png', txt: 'intensity', ke: Tools2dType.INTENSITY, msgTp: '获得体素强度' }, //'Get voxel intensity'
        { img: 'images/icon_tools2d_distance.png', txt: 'distance', ke: Tools2dType.DISTANCE, msgTp: '测量体素之间的距离' }, //'Measure distance between voxels'
        { img: 'images/icon_tools2d_angle.png', txt: 'angle', ke: Tools2dType.ANGLE, msgTp: '测量线与线的夹角' }, //Measure angle between lines
        { img: 'images/icon_tools2d_area.png', txt: 'area', ke: Tools2dType.AREA, msgTp: '计算任意面积' }, //Calculate arbitrary area'
        { img: 'images/icon_tools2d_rect.png', txt: 'rect', ke: Tools2dType.RECT, msgTp: '计算矩形面积' }, //'Calculate rectangular area'
        { img: 'images/icon_tools2d_text.png', txt: 'text', ke: Tools2dType.TEXT, msgTp: '添加注释文本' }, //'Add annotation text' 
        { img: 'images/icon_tools2d_edit.png', txt: 'edit', ke: Tools2dType.EDIT, msgTp: '移动注释文本' }, //'Move annotation text'
        { img: 'images/icon_tools2d_delete.png', txt: 'delete', ke: Tools2dType.DELETE, msgTp: '删除注释对象' }, //'Delete annotation object'
        { img: 'images/icon_tools2d_clear.png', txt: 'clear', ke: Tools2dType.CLEAR, msgTp:  '清除所有对象' }, //'Clear all objects'
        { img: 'images/icon_tools2d_zoom.png', txt: 'zoom', ke: Tools2dType.ZOOM, msgTp: '放大/缩小的' }, //'Zoom in/out'
        { img: 'images/icon_tools2d_default.png', txt: 'default', ke: Tools2dType.DEFAULT, msgTp: '缩放到默认' }, //Zoom to default
        // { img: 'images/icon_tools2d_filter.png', txt: 'filter', ke: Tools2dType.FILTER },
        { img: 'images/icon_tools2d_empty.png', txt: 'none', ke: Tools2dType.NONE, msgTp: '空的欧~' },
      ],
    };
  }

  onClickButtonTools(evt) {
    // console.log('UiTools2d. onClickButtonTools');
    const btn = evt.target;
    const idx = this.state.data.findIndex(obj => (obj.txt === btn.alt) );
    if (idx >= 0) {
      // set new toools 2s index to global store
      const store = this.props;
      store.dispatch({ type: StoreActionType.SET_2D_TOOLS_INDEX, indexTools2d: idx });
      // console.log(`UiTools2d. onClickButton index = ${idx}`);
      if( idx === Tools2dType.DEFAULT) {
        store.dispatch({ type: StoreActionType.SET_2D_ZOOM, render2dZoom: 1.0 });
        store.dispatch({ type: StoreActionType.SET_2D_X_POS, render2dxPos: 0.0 });
        store.dispatch({ type: StoreActionType.SET_2D_Y_POS, render2dyPos: 0.0 });

        const gra = store.graphics2d;
        gra.forceUpdate();
        gra.forceRender();
      }
      if( idx === Tools2dType.CLEAR) {
        const gra2d = store.graphics2d;
        if (gra2d !== null) {
          gra2d.clear();
        }
      }

    } // if button index valid
  } // end of onClickButtonTools

  render() {
    const strTitle = '工具';
    // 'Tools'

    const store = this.props;
    const indexCur = store.indexTools2d;

    const jsx = 
    <div className="card" >
      <div className="card-header">
        {strTitle}
      </div>
      <div className="card-body">
        <div className="btn-group row">

          {this.state.data.map(d => 
          {
            const strAttr = (indexCur === d.ke) ? 'col-2 btn btn-outline-secondary' : 'col-2 btn';

            const jsxBtn = <button type='button' className={strAttr} key={d.ke} id={d.ke} onClick={this.onClickButtonTools} >
              <img className='img-thumbnail' src={d.img} alt={d.txt} />
            </button>
            const msgTooltip = d.msgTp;
            const jsxOverlay = <OverlayTrigger key={d.txt} placement="bottom" overlay={
              <Tooltip>
                {msgTooltip}
              </Tooltip>
            }>
              {jsxBtn} 
            </OverlayTrigger>

            return jsxOverlay; 
          })}

        </div>
      </div>
    </div>
    return jsx;
  }
}

export default connect(store => store)(UiTools2d);

