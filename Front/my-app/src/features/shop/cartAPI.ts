import axios from 'axios'
import { SERVER } from '../../server';
import Cart from '../../model/Cart';

export function addOrder(order:Cart) {
    return new Promise<{ data: Cart }>((resolve) =>
        axios.post(SERVER+"cart/", order).then(res => resolve({ data: res.data }))
    );
}
