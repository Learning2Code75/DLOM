import {FETCH_ALL,CREATE,UPDATE,DELETE} from '../constants/actionTypes'

const reducers =(products=[],action)=>{
  switch(action.type){
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...products,action.payload];

    case UPDATE:
      return products.map((prod)=> prod._id === action.payload._id ? action.payload: prod )

    case DELETE:
      return products.filter((prod)=>prod._id!== action.payload)
    default:
      return products;
  }
}
export default reducers;
