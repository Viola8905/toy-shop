import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import BackBtn from '../../components/backBtn/BackBtn';

const ProductPage = () => {
	const products = useSelector((state) => state.products.Products);
	const location = useLocation();
	let query = location.state;
	console.log(query)
	return (
		<div>{products.filter(product => product.id == query).map((product) => {
			return (
        <div>
          <BackBtn />
          <div className="">{product.name}</div>
        </div>
      );
		})}
		</div>
	)
}

export default ProductPage