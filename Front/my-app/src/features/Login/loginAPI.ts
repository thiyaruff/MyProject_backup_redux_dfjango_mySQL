import { SERVER } from '../../server';
import axios from 'axios'

export function login(cred: any) {
    return new Promise<{ data: any }>((resolve) =>
        axios.post(SERVER +"login/", cred).then(res => resolve({ data: res.data }))
    )
}

export function newLogin(cred: any) {
    return new Promise<{ data: any }>((resolve) =>
    axios.post(SERVER + "register", cred).then(res => resolve({ data: res.data }))
    )
}