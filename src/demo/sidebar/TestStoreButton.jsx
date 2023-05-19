import React, { useEffect } from 'react';
import { Button } from "react-bootstrap";

import ActionTypes from "../store/ActionTypes";
import { connect } from "react-redux";

const TestStoreButton = (props) => {
  const store = props

  // 想控制第一次打开页面不刷新，可以写一个标志变量
  useEffect(() => {
    console.log("更新后的值", store.testStore)
    console.log(store.testArray)
  }, [store.testStore])


  // todo getItem Sidebar里面的方法，拿到此处用来测试，后面将此方法提取出去
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  return (
      <div>
        <Button onClick={() => {
          store.dispatch({ type: ActionTypes.SET_TEST_STORE, testStore: 456 })
          store.dispatch({ type: ActionTypes.SET_TEST_ARRAY, testArray: [
              getItem('TestOption 1', '1'),
              getItem('TestOption 2', '2')
            ] })
        }}>TestSoreButton</Button>
      </div>
  );
};

export default connect(store => store)(TestStoreButton);