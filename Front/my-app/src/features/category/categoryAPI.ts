import axios from 'axios'
import Category from '../../model/Category';
import { SERVER } from '../../server';


export function addCategory(cat: Category) {
    return new Promise<{ data:Category }>((resolve) =>
        axios.post(SERVER+"categoty/", cat).then(res => resolve({ data: res.data }))
    );
}

export function getAllCategory() {
    return new Promise<{ data: Category[] }>((resolve) =>
        axios.get(SERVER+"category/").then(res => resolve({ data: res.data }))
    );
}