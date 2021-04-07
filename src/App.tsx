import React from 'react';
import './App.css';
import {Layout} from "antd";
import BlockDetail from "./BlockDetail";
import {BrowserRouter, Route} from "react-router-dom";
import SearchBox from "./SearchBox";
const { Content } = Layout;


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Layout>
          <header style={{ display: 'flex', justifyContent: "center" }}>
            <SearchBox/>
          </header>
          <Content>
            <Route path="/hash/:hash" component={BlockDetail}/>
          </Content>
      </Layout>
    </BrowserRouter>

    </div>
  );
}

export default App;
