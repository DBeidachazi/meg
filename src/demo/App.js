// import React from 'react';
// import { connect } from 'react-redux';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
//
// import UiApp from './ui/UiApp';
// // import Sidebar from './Sidebar';
// // import Test from "./Test";
// import './App.css';
//
// class App extends React.Component {
//     render() {
//         return (
//             <BrowserRouter>
//                 <Routes>
//                     <Route>
//                         <div>
//                             {/*<Sidebar />*/}
//                             {/*<Test />*/}
//                             <Route path="/" component={<UiApp />}/>
//                         </div>
//                     </Route>
//                 </Routes>
//             </BrowserRouter>
//         );
//     }
// }
//
// export default connect(store => store)(App);
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UiApp from './ui/UiApp';
import './App.css';
// eslint-disable-next-line no-unused-vars
import Sidebar from "./sidebar/Sidebar";
import Upload from "./upload/Upload";


class App extends React.Component {

  render() {
    return (
        <BrowserRouter>
          {/* todo main路径下设置可变路由*/}
          <div style={{ display: "flex" , minHeight: "100vh" }}>
            {/*<Sidebar/>*/}
            <Routes>
              <Route path={'/'} element={<Upload/>} />
              <Route path={"/main"} element={<UiApp/>}/>
              <Route path={"/getpiderror"} />
            </Routes>
          </div>
        </BrowserRouter>
    )

  }
}
export default connect(store => store)(App);