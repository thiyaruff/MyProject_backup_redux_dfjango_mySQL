import React, { useEffect, useState } from 'react'
import { selectCart,initCart,selectupdCartFlag ,addProd, addOrderAsync} from '../shop/cartSlice'
import { useSelector} from 'react-redux';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';

const Cart = () => {
    const myCart = useSelector(selectCart);
    const myCartUpd = useSelector(selectupdCartFlag);
    const [total, settotal] = useState(0)
    const dispatch = useAppDispatch();
    useEffect(() => {dispatch(initCart())}, [dispatch])
    useEffect(() => {
        let tempTotal=0
        myCart.forEach((item: { amount: number; price: number; }) => (tempTotal+= (item.amount * item.price))   ); 
        settotal(tempTotal)
    }, [myCartUpd])
    console.log(myCart)
    return (
        <div style={{padding:"20px"}}>
            Cart
                {myCart.map((p:any,i:Number)=><div key={`key-${i}`}>
                <button onClick={()=>dispatch(addProd({item:p,amount:+1}))}>+</button>
                 {p.desc} {p.price}  Amount:{p.amount}
                <button onClick={()=>dispatch(addProd({item:p,amount:-1}))}>-</button>
                </div>)}
                Total: {total}
                <Button  onClick={()=>dispatch(addOrderAsync(myCart))}>add order</Button>
        </div>
    )
}

export default Cart