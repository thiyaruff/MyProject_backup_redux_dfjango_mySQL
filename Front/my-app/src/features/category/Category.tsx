import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getCatsAsync, selectCategory } from './categorySlice';
import { useAppDispatch } from '../../app/hooks';

const Category = () => {
    const dispatch = useAppDispatch();
    const categories = useSelector(selectCategory);
    useEffect(() => {
      
        dispatch(getCatsAsync())
    }, [dispatch])
  return (
    <div>
{categories.length}


    </div>
    
  )
}

export default Category