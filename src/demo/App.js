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
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import UiApp from './ui/UiApp';

import './App.css';

import Test from "./Test";
import Test2 from "./Test2";

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <div style={{ display: "flex" , minHeight: "100vh" }}>
            <Test/>
            <Routes>
              <Route path={"/"} element={<UiApp/>}/>
              <Route path={'/test'} element={<Test2/>} />
            </Routes>
          </div>
        </BrowserRouter>
        // <BrowserRouter>
        //   <div style={{ display: "flex" , minHeight: "100vh" }}>
        //     <Test />
        //     <UiApp />
        //   </div>
        // </BrowserRouter>
    )

  }
}
export default connect(store => store)(App);