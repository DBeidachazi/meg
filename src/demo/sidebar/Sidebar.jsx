// eslint-disable-next-line no-unused-vars
import { MailOutlined, CalendarOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import { useState } from 'react';
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

const items = () => [
  getItem(<Jump to={'/'} context={'Input File'}/>, '1', <CalendarOutlined />),
  // getItem(<Jump to={'/main'} context={'Show'}/>, '2', <MailOutlined />),
];

const Sidebar = () => {
  const [mode, ] = useState('inline');
  const [theme, ] = useState('light');
  // const [ShowChildren, SetShowChildren ] = useState([]);
  // useEffect(() => {
  //   SetShowChildren(store.testArray)
  // }, [store.testArray])

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
            // items={items(ShowChildren)}
            items={items()}
        />
      </>
  );
};

// export default connect(store => store)(Sidebar);
export default connect(store => store)(Sidebar)