import  "./index.css"
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {API_URL} from '../config/constants.js';
import {Carousel} from 'antd';

dayjs.extend(relativeTime);

function MainPage(){
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);

  React.useEffect(function(){
    const productObj = axios.get(`${API_URL}/products`);
    productObj.then(function(response){
    const products = response.data.products;
    setProducts(products);
  }).catch(function(error){
    console.error(error);
  });

    const bannersObj = axios.get(`${API_URL}/banners`);
    bannersObj.then((response) => {
      const banners = response.data.banners;
      setBanners(banners);
    }).catch((error) => {
      console.error(error);
    })
  }, []);
  return (
    <div>
      <Carousel autoplay autoplaySpeed={3000}>
        {
          banners.map((banner, index) => {
            return (
              <Link to ={banner.href}>
                <div id="banner">
                    <img src={`${API_URL}/${banner.imageUrl}`} alt="배너 이미지" id="banner__img"/>
                </div>
              </Link>
            )
          })
        }
      </Carousel>

      <h1>판매되는 상품들</h1>
      
      <ul id="product__list">
            {
              products.map(function(product, index){
                return (
                  <li className = "product__card">
                    {
                      product.soldout === 1 && <div className="product--blur"><div className="blur__comment">Sold Out</div></div>
                    }
                    <Link className = "Product__link" to = {`/products/${product.id}`}>
                      <div className = "product__img">
                        <img id='uploading-image' src = {`${API_URL}/${product.imageUrl}`} alt = "상품이미지"/>
                      </div>
                      <div className = "product__contents">
                        <span className = "product__name">{product.name}</span>
                        <span className = "product__price">{product.price}원</span>
                        <div className="product-footer">
                          <div className = "product__seller">
                            <img className = "seller__avatar" src = "images/icons/avatar.png" alt ="아바타이미지"/>
                            <span className = "seller__name">{product.seller}</span>
                          </div>
                          <span className="product__date">{dayjs(product.createdAt).fromNow()}</span>
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