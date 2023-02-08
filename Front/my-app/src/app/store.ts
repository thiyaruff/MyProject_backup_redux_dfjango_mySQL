import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productsReducer from '../features/adminProducts/productsSlice';
import loginReducer from '../features/Login/loginSlice';
import cartReducer from '../features/shop/cartSlice';
import categoryReducer from '../features/category/categorySlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products:productsReducer,
    login:loginReducer,
    cart:cartReducer,
    category:categoryReducer,
    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
