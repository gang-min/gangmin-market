import 'antd/dist/antd.css';
import './App.css';
import MainPageComponent from "./main/index";
import {Switch, Route, Link, useHistory} from 'react-router-dom';
import UploadPage from "./upload/index.js";
import ProductPage from "./product/index.js";
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons";

function App() {
  const history = useHistory();
  return (
    <div>
      <header id="header">
        <div id="header__area">
          <Link to="/">
            <img id="header__logo"  src="/images/icons/logo.png" alt="마켓 이미지" />
          </Link>
          <Button size="large" onClick={function(){history.push('/upload')}} icon={<DownloadOutlined/>}>
            상품 업로드
          </Button>
        </div>
      </header>
      <main id="main">
      <Switch>
        <Route exact = {true} path = {"/"}>
          <MainPageComponent/>
        </Route>
        <Route exact = {true} path = "/products/:id">
          <ProductPage/>
        </Route>
        <Route exact = {true} path = "/upload">
          <UploadPage/>
        </Route>
      </Switch>
      </main>
      <footer id="footer"></footer>
    </div>
  );
}

export default App;
