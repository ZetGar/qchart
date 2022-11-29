import { React } from "react";
import { Routes, Route } from "react-router-dom";

import Message from "./pages/Message";

import Layout from "./pages/SMARTIndex/Layout/Layout";
import Main from "./pages/SMARTIndex/Main";
import Manual from "./pages/SMARTIndex/Manual";
import ChartJs from "./pages/SMARTIndex/ChartJs";

import DBMain from "./pages/DB_HTS/DBMain";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route
          exact
          path="/"
          element={
            <Message
              type="Warning"
              message="회사명_Service를 url에 추가해주세요"
            />
          }
        ></Route> */}

        {/* <Route element={<Layout />}>
          <Route path="/SMART" element={<Main />} />
          <Route path="/SMART/manual" element={<Manual />} />
          <Route path="/SMART/chart" element={<ChartJs />} />
        </Route> */}

        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/smartindex" element={<ChartJs />} />
          <Route path="/manual" element={<Manual />} />
        </Route>

        {/* <Route>
          <Route path="DB_Service" element={<DBMain />} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
