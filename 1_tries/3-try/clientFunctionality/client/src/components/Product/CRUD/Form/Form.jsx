import React, { useState } from "react";
import { useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
} from "../../../../redux/actions/products";

const Form = ({ curProdId, setCurProdId }) => {
  const dispatch = useDispatch();
  const prodToUpdate = useSelector((state) =>
    curProdId ? state.products.find((p) => p._id === curProdId) : null
  );

  const [productData, setProductData] = useState({
    prodSKU: "",
    prodName: "",
    productUnitRate: "",
    prodTax: "",
    prodDesc: [],
    prodImgUrl: "",
    qty: 0,
    category: "",
    discount: "",
  });

  const [tempProdDesc, setTempProdDesc] = useState({
    title: "",
    desc: "",
  });
  const [tempProdIdx, setTempProdIdx] = useState(0);
  const [tempProdDescArr, setTempProdDescArr] = useState([]);

  useEffect(() => {
    let pDA = tempProdDescArr;
    pDA[tempProdIdx] = tempProdDesc;
    setTempProdDescArr(pDA);

    setProductData({
      ...productData,
      prodDesc: pDA,
    });
  }, [tempProdDesc]);

  useEffect(() => {
    if (prodToUpdate) {
      setProductData(prodToUpdate);
    }
  }, [prodToUpdate]);
  const clear = () => {
    setCurProdId(null);
    setProductData({
      prodSKU: "",
      prodName: "",
      productUnitRate: "",
      prodTax: "",
      prodDesc: [],
      prodImgUrl: "",
      qty: 0,
      category: "",
      discount: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(curProdId);
    if (curProdId) {
      dispatch(updateProduct(curProdId, productData));
    } else {
      dispatch(createProduct(productData));
    }
    clear();
  };

  return (
    <>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h2>{curProdId ? "Update" : "Create"} a Product</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            margin: "0 auto",
            maxWidth: "85vw",
            gridGap: ".5rem",
          }}
        >
          <div>ProdSKU</div>
          <input
            name="prodSKU"
            value={productData.prodSKU}
            onChange={(e) =>
              setProductData({ ...productData, prodSKU: e.target.value })
            }
          />
          <div>Product Name</div>
          <input
            name="prodName"
            value={productData.prodName}
            onChange={(e) =>
              setProductData({ ...productData, prodName: e.target.value })
            }
          />

          <div>productUnitRate</div>
          <input
            name="productUnitRate"
            value={productData.productUnitRate}
            onChange={(e) =>
              setProductData({
                ...productData,
                productUnitRate: e.target.value,
              })
            }
          />
          <div>prodTax</div>
          <input
            name="prodTax"
            value={productData.prodTax}
            onChange={(e) =>
              setProductData({ ...productData, prodTax: e.target.value })
            }
          />
          <div>prodDesc</div>
          <div>
            <input
              name="prodDescTitle"
              value={tempProdDesc.title}
              onChange={(e) => {
                setTempProdDesc({
                  ...tempProdDesc,
                  title: e.target.value,
                });
              }}
            />
            <input
              name="prodDescDescription"
              value={tempProdDesc.desc}
              onChange={(e) => {
                setTempProdDesc({
                  ...tempProdDesc,
                  desc: e.target.value,
                });
              }}
            />
            <span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setTempProdIdx(tempProdIdx + 1);
                }}
              >
                +
              </button>
            </span>
          </div>
          <div>prodImgUrl</div>
          <div>
            <FileBase
              type="File"
              multiple={false}
              onDone={({ base64 }) =>
                setProductData({ ...productData, prodImgUrl: base64 })
              }
            />
          </div>

          <div>qty</div>
          <input
            name="qty"
            type="number"
            value={productData.qty}
            onChange={(e) =>
              setProductData({ ...productData, qty: e.target.value })
            }
          />
          <div>category</div>
          <input
            name="category"
            value={productData.category}
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
          />
          <div>discount</div>
          <input
            name="discount"
            value={productData.discount}
            onChange={(e) =>
              setProductData({ ...productData, discount: e.target.value })
            }
          />
        </div>

        <button type="submit">Submit</button>
        <button onClick={clear}>Clear</button>
      </form>
      <pre
        style={{
          overflow: "hidden",
        }}
      >
        {JSON.stringify(productData, null, 4)}
      </pre>
      <pre>{JSON.stringify(tempProdDesc, null, 4)}</pre>
      <pre>{JSON.stringify(curProdId, null, 2)}</pre>
    </>
  );
};

export default Form;
