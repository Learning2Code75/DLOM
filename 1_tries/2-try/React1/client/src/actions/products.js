import {FETCH_ALL,CREATE,UPDATE,DELETE} from '../constants/actionTypes'
import * as api from '../api'

// action creators : functions that return actions

export const getProducts = ()=> async (dispatch)=>{
  try{
    const {data} = await api.fetchProducts();
    const action = {type:FETCH_ALL,payload:data}
    dispatch(action);
  }catch(err){
      console.log(err);
  }
}

export const createProduct = (prod)=> async (dispatch)=>{
  try{
    const {data} = await api.createProduct(prod)
    dispatch({type:CREATE,payload:data})
  }catch(err){
    console.log(err)
  }
}


export const updateProduct =(currId, prod)=> async (dispatch)=>{
  try{
    const {data} = await api.updateProduct(currId,prod);

    dispatch({type:UPDATE,payload:data})
  }catch(err){
    console.log(err)
  }
}

export const deleteProduct = (id) => async(dispatch) =>{
  try{
    const response = await api.deleteProduct(id);
    dispatch({type:DELETE,payload:id})
  }catch(err){
    console.log(err)
  }
}
