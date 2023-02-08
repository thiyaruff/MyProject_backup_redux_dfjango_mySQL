import React from 'react'
import { getAllProductsAsync,selectProduct } from '../adminProducts/productsSlice';
import  { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { selectLogged,selectAccess } from '../Login/loginSlice';
import { addProd, initCart } from './cartSlice';
import Cart from './Cart';
const Shop = () => {
    const prod = useAppSelector(selectProduct);
  const dispatch = useAppDispatch();
  const logged = useAppSelector(selectLogged);
  const access = useAppSelector(selectAccess);
  useEffect(() => { dispatch(getAllProductsAsync()) }, []) 
  useEffect(() => {dispatch(initCart())}, [dispatch])
  return (
    <div style={{display:"flex"}}>
   
      <div><Cart></Cart></div>
       <div style={{width:"80%"}}> <Row xs={3} md={4} className="g-4">
 {prod.map((product, index) =>
                <div key={index}>
                    {/* <button onClick={() => dispatch(delProductAsync(product.id || -1))} >Del</button>
                    <button onClick={() => dispatch(updProductAsync({price,desc,image,id:product.id}))} >upd</button> */}
  
        <Col> 
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={'http://127.0.0.1:8000' +product.image}height="200"/>
            <Card.Body>
              <Card.Title>{product.desc}</Card.Title>
              <Card.Text>
                {product.price}
              </Card.Text>
            </Card.Body>
            <Button  onClick={()=>dispatch(addProd({item:product,amount:1}))}>+</Button>
            <Button variant="danger" onClick={()=>dispatch(addProd({item:product,amount:-1}))}>-</Button>
            {/* <Button variant="primary">add to cart</Button> */}
          </Card>
        </Col>
                </div>)}
                </Row>


                </div>
    </div>
  )
}

export default Shop