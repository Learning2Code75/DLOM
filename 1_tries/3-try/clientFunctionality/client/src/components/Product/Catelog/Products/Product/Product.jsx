import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../../redux/actions/products";
const Product = ({ p, setCurProdId, prodsForCatelog, setProdsForCatelog }) => {
  const dispatch = useDispatch();
  const [customDetails, setCustomDetails] = useState({
    discountDisplay: p.discount,
    qtyDisplay: p.qty,
    unitPrice: p.productUnitRate,
  });
  const [displayCustom, setDisplayCustom] = useState(false);
  return (
    <>
      <div
        style={{
          padding: "1em",
          borderRadius: "1rem",
          background: displayCustom ? "white" : "rgba(0,0,0,0.89)",
          color: displayCustom ? "black" : "#f0f0f0",
        }}
      >
        <div>SKU:{p.prodSKU}</div>
        <div
          style={{
            overflow: "contain",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={p.prodImgUrl} />
        </div>
        <div>Name : {p.prodName}</div>
        <div>Unit Rate : {p.productUnitRate}</div>
        <div>Tax : {p.prodTax}</div>
        <div>Qty : {p.qty}</div>
        <div>Category : {p.category}</div>
        <div>Discount : {p.discount}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {p.prodDesc.map((pd) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                borderBottom: "1px solid lightgrey",
              }}
            >
              <h6>{pd.title}</h6>
              <p>{pd.desc}</p>
            </div>
          ))}
        </div>
        <div>Created at : {moment(p.createdAt).fromNow()}</div>
        {/* <div
          style={{
            display: "flex",
          }}
        >
          <button onClick={() => setCurProdId(p._id)}>Update</button>
          <button onClick={() => dispatch(deleteProduct(p._id))}>Delete</button>
        </div> */}
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              let dc = displayCustom;
              let new_prd = p;
              new_prd.display = customDetails;
              console.log(new_prd);
              // let new_prds_display = prodsForCatelog;
              // new_prds_display.push(new_prd);
              // setProdsForCatelog(new_prds_display);
              let nps = [...prodsForCatelog];
              console.log(nps);
              if (!dc) {
                nps.push(new_prd);
              } else {
                nps = nps.filter((n) => n._id !== new_prd._id);
              }
              console.log(nps);
              setProdsForCatelog(nps);
              setDisplayCustom(!displayCustom);
            }}
          >
            {displayCustom ? "Selected" : "Select"}
          </button>
        </div>
        <pre>{JSON.stringify(customDetails, null, 2)}</pre>
        {!displayCustom && (
          <div>
            <div>
              Discount Display:
              <input
                value={customDetails.discountDisplay}
                onChange={(e) =>
                  setCustomDetails({
                    ...customDetails,
                    discountDisplay: e.target.value,
                  })
                }
              />
            </div>
            <div>
              Qty Display:
              <input
                value={customDetails.qtyDisplay}
                onChange={(e) =>
                  setCustomDetails({
                    ...customDetails,
                    qtyDisplay: e.target.value,
                  })
                }
              />
            </div>
            <div>
              Unit Price Display:
              <input
                value={customDetails.unitPrice}
                onChange={(e) =>
                  setCustomDetails({
                    ...customDetails,
                    unitPrice: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}
      </div>

      <pre
        style={{
          overflow: "hidden",
        }}
      >
        {JSON.stringify(p, null, 2)}
      </pre>
    </>
  );
};

export default Product;
