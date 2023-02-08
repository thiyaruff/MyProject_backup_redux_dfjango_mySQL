
import { delProductAsync, getAllProductsAsync, selectProduct, updProductAsync } from './productsSlice';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { getCatsAsync, selectCategory } from '../category/categorySlice';
import { useSelector } from 'react-redux';

const Products = () => {
  const prod = useAppSelector(selectProduct);
  const dispatch = useAppDispatch();
  useEffect(() => { dispatch(getAllProductsAsync()) }, [])
  useEffect(() => {
      
    dispatch(getCatsAsync())
}, [dispatch])
  const categories = useSelector(selectCategory);
  const [desc, setdesc] = useState("")
  const [category, setcategory] = useState(0)
  const [price, setprice] = useState(0)
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | ArrayBuffer | null>(null);
  const MYSERVER = "http://127.0.0.1:8000/products/"

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files![0];
    console.log(file)
    reader.onloadend = () => {
      setImage(file);
      setImagePreviewUrl(reader.result);
    }
    reader.readAsDataURL(file)
  };


  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('desc', desc);
    formData.append('image', image as File);
    formData.append('price', price.toString());
    formData.append('category', category.toString());

    try {
      const res = await axios.post(MYSERVER, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setImagePreviewUrl(res.data.imageUrl);
    } catch (err) {
      console.error(err);
    }
  };
  return (

    <div> Add a new Product<br></br>
    
      <form onSubmit={handleImageUpload}>
        Product desc: <input value={desc} onChange={(e) => setdesc(e.target.value)} />
        price: <input value={price} onChange={(e) => setprice(+e.target.value)} />
        image: <input type="file" onChange={handleImageChange} />
        category:  {categories.length > 0}
            <select onChange={(e) => setcategory(+e.target.value)}>{categories.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
        <Button variant="info" type="submit">Add Product</Button>
      </form>
      {imagePreviewUrl && <img src={imagePreviewUrl as string} alt="product" width="200" height="200" />}
<br></br>
      <Row xs={3} md={4} className="g-4">
        {prod.map((product, index) =>
          <div key={index}>
            <Col>
              <Card border="primary" style={{ width: '18rem' }}>
              <Card.Title>{product.desc}</Card.Title>
              Price:{product.price}
              <Card.Img variant="top" src={'http://127.0.0.1:8000' + product.image} height="200" />
              <Button variant="primary" onClick={() => dispatch(updProductAsync({ price, desc, image,category, id: product.id}))} >upd</Button>
              <Button variant="danger" onClick={() => dispatch(delProductAsync(product.id || -1))} >Del</Button>
             
              </Card>
            </Col>
          </div>)}
      </Row>
    </div>

  );

}

export default Products


