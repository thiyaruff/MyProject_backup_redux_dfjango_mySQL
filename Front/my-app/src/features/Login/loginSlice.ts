import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { login, newLogin } from './loginAPI';
import IloginState from '../../model/Ilogin'
import jwt_decode from "jwt-decode";
import Ilogin from '../../model/Ilogin';




const initialState: IloginState = {
  userName: '',
  password:'',
  email:'',
  logged: false,
  access: '',
  refresh: '',
};


export const loginAsync = createAsyncThunk(
  'login/login',
    async (cred: any) => {
        const response = await login(cred);
        console.log(response)
        return response.data;
  }
  );

export const newLoginAsync = createAsyncThunk(
    'login/newLogin',
      async (cred: any) => {
          const response = await newLogin(cred);
          console.log(response)
          return response.data;
    }
);
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
logout: (state) => {
  state.logged=false
  state.userName=""
  state.access=""
  state.refresh=""
},
},
// The `extraReducers` field lets the slice handle actions defined elsewhere,
// including actions generated by createAsyncThunk or in other slices.
extraReducers: (builder) => {
builder
  .addCase(loginAsync.fulfilled, (state, action) => {
  const decoded:any = jwt_decode(action.payload.access);
  state.logged=true
  state.userName=decoded.username
  state.access=action.payload.access
  state.refresh=action.payload.refresh
})
  .addCase(newLoginAsync.fulfilled, (state, action) => {
  console.log(action.payload)
  state.logged=true
  state.userName=action.payload.username
  state.email=action.payload.email
  state.password=action.payload.password
})
}
});

export const {logout } = loginSlice.actions;
export const selectUserName = (state: RootState) => state.login.userName;
export const selectLogged = (state: RootState) => state.login.logged;
export const selectAccess = (state: RootState) => state.login.access;


export default loginSlice.reducer;