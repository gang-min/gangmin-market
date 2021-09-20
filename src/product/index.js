import './index.css';
import {useParams} from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from 'react';
import {API_URL} from '../config/constants.js';
import dayjs from 'dayjs';
import {Button, message} from 'antd';


function ProductPage(){
  // const params = useParams();
  // console.log(params.id);
  const {id} = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = () => {
    const result = axios(`${API_URL}/products/${id}`)
    result.then(function(response){
      setProduct(response.data.product);
    }).catch(function(error){
      console.error(error)
    });
  }

  useEffect(function(){
    getProduct();
  }, []);
  if(product === null){
    return <h1>상품 정보를 받고 있습니다...</h1>
  };

  const onClickPurchase = () => {
    axios.post(`${API_URL}/purchase/${id}`)
    .then((result) => {
      message.info('구매가 완료되었습니다.');
      getProduct();
    }).catch((error) => {
      console.error(error);
      message.error(`에러가 발생했습니다. ${error.message}`);
    })
  }
  return (
    <div>
      <div className="productImg">
        <img src ={`${API_URL}/${product.imageUrl}`} alt="상품이미지"/>
      </div>
      <div className="profile">
        <img className="profile__avatar" src="/images/icons/avatar.png"/>
        <span className="profile__name">{product.seller}</span>
      </div>
      <div className="contents">
        <span className="contents__name">{product.name}</span>
        <div className="contents__price">{product.price}원</div>
        <div className="contents__createdAt">{dayjs(product.createdAt).format('YYYY년 MM월 DD일')}</div>
        <Button className="contents__purchaseBtn" size='large' type="primary" danger onClick={onClickPurchase} disabled={product.soldout === 1}>
          구매하기
        </Button>
        <pre className="contents__description">{product.description}</pre>
      </div>
    </div>
  )
};

export default ProductPage;