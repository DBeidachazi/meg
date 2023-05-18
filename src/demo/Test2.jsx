import React, { useEffect } from 'react';
import { Button } from "react-bootstrap";

import ActionTypes from "./store/ActionTypes";
import { connect } from "react-redux";

const Test2 = (props) => {
  const store = props

  // 想控制第一次打开页面不刷新，可以写一个标志变量
  useEffect(() => {
    console.log("更新后的值", store.testStore)
  }, [store.testStore])

  return (
      <div>
        <Button onClick={() => {
          store.dispatch({ type: ActionTypes.SET_TEST_STORE, testStore: 456 })
        }}>Test2</Button>
      </div>
  );
};

export default connect(store => store)(Test2);