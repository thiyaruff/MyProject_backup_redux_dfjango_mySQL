import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Products from '../../model/Products';
import { addProduct, getAllProducts,  delProduct, updProduct} from './productsAPI';

interface ProductsState {
  status: 'idle' | 'loading' | 'failed';
  products: Products[]
}
const initialState: ProductsState = {
  status: 'idle',
  products: []
};


export const addProductAsync = createAsyncThunk(
  'products/addProduct',
  async (newProduct: Products) => {

      const response = await  addProduct(newProduct);
      return response.data;
  }
);

export const getAllProductsAsync = createAsyncThunk(
  'products/getAllProducts',
  async () => {
      const response = await getAllProducts();
      return response.data;
  }
);
export const delProductAsync = createAsyncThunk(
  'products/delProduct',
  async (id:number ) => {
      const response = await delProduct(id);
      return response.data;
  }
);

export const updProductAsync = createAsyncThunk(
  'products/updProduct',
  async (pro:Products ) => {
      const response = await updProduct(pro);
      return response.data;
  }
);
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
      increment: (state) => {
      },
  },
  extraReducers: (builder) => {
      builder.addCase(addProductAsync.fulfilled, (state, action) => {
          console.log(action.payload)
          state.products.push(action.payload)
      }).addCase(getAllProductsAsync.fulfilled, (state, action) => {
          // console.log(action.payload)
          state.products = action.payload
      }).addCase(delProductAsync.fulfilled, (state, action) => {
          // console.log(action.payload)
          state.products =state.products.filter(pro => pro.id !== action.payload)
      }).addCase(updProductAsync.fulfilled, (state, action) => {
          // console.log(action.payload.id)
          const temp= state.products.filter(pro => pro.id === action.payload.id)[0]
          temp.price=action.payload.price
          temp.desc =action.payload.desc
          temp.image =action.payload.image
          temp.category =action.payload.category
      });
  },
});

export const { } = productsSlice.actions;
export const selectProduct = (state: RootState) => state.products.products;
export default productsSlice.reducer;




