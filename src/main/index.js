import  "./index.css"
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';


function MainPage(){
  const [products, setProducts] = React.useState([]);

  React.useEffect(function(){
    const promiseObj = axios.get('https://316eeb27-2347-438e-aaf5-0e104e18aea5.mock.pstmn.io/products');
    promiseObj.then(function(response){
    const products = response.data.products;
    setProducts(products);
  }).catch(function(error){
    console.error(error);
  });
  }, []);
  return (
    <div>
      <div id="banner">
        <img src="/images/banners/banner1.png" alt="배너 이미지1" id="banner__img"/>
      </div>

      <h1 id="product__title">판매되는 상품들</h1>
      
      <ul id="product__list">
            {
              products.map(function(product, index){
                return (
                  <li className = "product__card">
                    <Link className = "Product__link" to = {`/products/${product.id}`}>
                      <div className = "product__img">
                        <img src = {product.imageUrl} alt = "키보드"/>
                      </div>
                      <div className = "product__contents">
                        <span className = "product__name">{product.name}</span>
                        <span className = "product__price">{product.price}</span>
                        <div className = "product__seller">
                          <img className = "seller__avatar" src = "images/icons/avatar.png" alt ="아바타이미지"/>
                          <span className = "seller__name">{product.seller}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })
            } 
      </ul>
    </div>
  )
};

export default MainPage;