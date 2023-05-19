import { AppstoreOutlined, MailOutlined, CalendarOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom'

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Jump = ({ to, context }) => {
  return (
      <NavLink to={ to } style={() => ({ textDecoration: 'none' })}>{ context }</NavLink>
  )
}

const items = ( ShowChildren ) => [
  getItem(<Jump to={'/'} context={'Input File'}/>, '1', <CalendarOutlined />),
  getItem(<Jump to={'/main'} context={'Show'}/>, '2', <MailOutlined />, ShowChildren ),
  getItem('Navigation Two', 'sub1', <AppstoreOutlined />, [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
  ]),
  getItem('Navigation Three', 'sub2', <SettingOutlined />, [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
  // getItem(<a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Ant Design
  //     </a>,
  //     'link',
  //     <LinkOutlined />,),
];

const Sidebar = ( store ) => {
  const [mode, ] = useState('inline');
  const [theme, ] = useState('light');
  const [ShowChildren, SetShowChildren ] = useState([]);
  useEffect(() => {
    SetShowChildren(store.testArray)
  }, [store.testArray])
  // const [mode, setMode] = useState('inline');
  // const [theme, setTheme] = useState('light');
  // const changeMode = (value) => {
  //   setMode(value ? 'vertical' : 'inline');
  // };
  // const changeTheme = (value) => {
  //   setTheme(value ? 'dark' : 'light');
  // };
  return (
      <>
        {/*<Switch onChange={changeMode} /> Change Mode*/}
        {/*<Divider type="vertical" />*/}
        {/*<Switch onChange={changeTheme} /> Change Style*/}
        {/*<br />*/}
        {/*<br />*/}
        <Menu
            style={{
              width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={mode}
            theme={theme}
            items={items(ShowChildren)}
        />
      </>
  );
};

export default connect(store => store)(Sidebar);