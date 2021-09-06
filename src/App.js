import './App.css';
import MainPageComponent from "./main/index";
import {Switch, Route} from 'react-router-dom';
import UploadPage from "./upload/index.js";
import ProductPage from "./product/index.js";

function App() {
  return (
    <div>
      <header id="header">
        <div id="header__area">
          <img src="/images/icons/logo.png" alt="마켓 이미지" id="header__logo" />
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
