
import axios from 'axios'
import { MY_SERVER, SERVER } from '../../server';
import Products from '../../model/Products';

export function addProduct(pro: Products) {
    return new Promise<{ data: Products }>((resolve) =>
        axios.post(SERVER+"products/", pro).then(res => resolve({ data: res.data }))
    );
}

export function getAllProducts() {
    return new Promise<{ data: Products[] }>((resolve) =>
        axios.get(SERVER+"products/").then(res => resolve({ data: res.data }))
    );
}

export function delProduct(id: number) {
    return new Promise<{ data: number }>((resolve) =>
        axios.delete(SERVER+"products/" + id).then(res => resolve({ data: id }))
    );
}

export function updProduct(pro:Products) {
    return new Promise<{ data: any }>((resolve) =>
        axios.put(SERVER+"products/" + pro.id, pro).then(res => resolve({ data: res.data }))
    );
}