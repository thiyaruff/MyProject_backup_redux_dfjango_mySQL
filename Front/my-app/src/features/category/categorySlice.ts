import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Category from '../../model/Category';
import { getAllCategory } from './categoryAPI';


interface CategoryState {
  category:Category[]
}
const initialState: CategoryState = {
 category: []
};


export const getCatsAsync = createAsyncThunk(
    'category/getAllCategory',
    async () => {
      const response = await getAllCategory();
      return response.data;
    }
  );

  


export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
      increment: (state) => {
      },
  },
      extraReducers: (builder) => {
         builder.addCase(getCatsAsync.fulfilled, (state,action) => {
            state.category=action.payload
          })}

});


export const { } = categorySlice.actions;
export const selectCategory = (state: RootState) => state.category.category;
export default categorySlice.reducer;




