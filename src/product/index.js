import './index.css';
import {useParams} from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from 'react';


function ProductPage(){
  // const params = useParams();
  // console.log(params.id);
  const {id} = useParams();

  const [product, setProduct] = useState(null);
  useEffect(function(){
    const result = axios(`https://316eeb27-2347-438e-aaf5-0e104e18aea5.mock.pstmn.io/products/${id}`)
    result.then(function(response){
      setProduct(response.data);
    }).catch(function(error){
      console.error(error)
    })
  }, [])

  if(product === null){
    return <h1>상품 정보를 받고 있습니다...</h1>
  };
  return (
    <div>
      <div className="productImg">
        <img src ={`${product.imageUrl}`}/>
      </div>
      <div className="profile">
        <img className="profile__avatar" src="/images/icons/avatar.png"/>
        <span className="profile__name">{product.seller}</span>
      </div>
      <div className="contents">
        <span className="contents__name">{product.name}</span>
        <div className="contents__price">{product.price}원</div>
        <div className="contents__createdAt">2021년 9월 7일</div>
        <div className="contents__description">{product.description}</div>
      </div>
    </div>
  )
};

export default ProductPage;