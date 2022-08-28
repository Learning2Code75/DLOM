import React,{useState,useEffect} from 'react'
import FileBase from 'react-file-base64'
import {useDispatch,useSelector} from 'react-redux'
import {createProduct,updateProduct} from '../../actions/products'



const ProductForm = ({currentId,setCurrentId})=>{
  const dispatch = useDispatch();
  const product = useSelector((state)=>currentId?state.products.find((p)=> p._id === currentId):null)
  const [productData,setProductData] = useState({
                      prodSSN:"",
                      prodName:"",
                      productUnitRate:"",
                      prodTax:"",
                      prodDesc:[""],
                      prodImgUrl:[""]
                    });
  useEffect(()=>{
    if(product){
      setProductData(product);
    }
  },[product])

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(productData)

    if(currentId){
      dispatch(updateProduct(currentId,productData))
      clear();
    }else{
      dispatch(createProduct(productData))
      clear();
    }

    setProductData({prodSSN:"",
    prodName:"",
    productUnitRate:"",
    prodTax:"",
    prodDesc:[""],
    prodImgUrl:[""]});
  }
  const clear = ()=>{
    // e.preventDefault();
    setCurrentId(null)
    setProductData({prodSSN:"",
    prodName:"",
    productUnitRate:"",
    prodTax:"",
    prodDesc:[""],
    prodImgUrl:[""]}
    );
  }


  return(

    <div className="productForm">
      <form autoComplete = "off" noValidate className="form" onSubmit={handleSubmit}>
        {currentId && <button onClick={()=>{setCurrentId(null); setProductData({prodSSN:"",
        prodName:"",
        productUnitRate:"",
        prodTax:"",
        prodDesc:[""],
        prodImgUrl:[""]}); }}>Create Product</button>}
        {currentId && <h2>Update the prouduct</h2>}
        {!currentId && <h2>Create a prouduct</h2>}


        <input value={productData.prodSSN} onChange={(e)=> setProductData({...productData,prodSSN:e.target.value})} name="prodSSN" type="text" placeholder="Enter Product SSN" />
        <input value={productData.prodName} onChange={(e)=> setProductData({...productData,prodName:e.target.value})} name="prodName" type="text" placeholder="Enter Product Name" />

        <input value={productData.productUnitRate} onChange={(e)=> setProductData({...productData,productUnitRate:e.target.value})} name="unitRate" type="number" placeholder="Enter Product Unit Rate" />
        <input value={productData.prodTax} onChange={(e)=> setProductData({...productData,prodTax:e.target.value})} name="prodTax" type="number" placeholder="Enter Product Tax Rate" />

        <div className="formLine">
        <input value={productData.prodDesc} onChange={(e)=> setProductData({...productData,prodDesc:[e.target.value]})} name="prodDesc" type="text" placeholder="Enter Product Description" /><button>+</button>
        </div>
        <div className="formLine">
          {/*<input value={productData.prodImgUrl} onChange={(e)=> setProductData({...productData,prodImgUrl:e.target.value})} name="prodImgUrl" type="text" placeholder="Enter Product Image Url" /><button>+</button>
*/}
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64})=> setProductData({...productData,prodImgUrl:[base64]})}
          />

        </div>

        <div>
          <input value={currentId?`Update Product`:`Create Product`} type="submit" />
          <button  type="clear" onClick={clear}>Clear</button>
        </div>

      </form>
    </div>


  );
}

export default ProductForm;
