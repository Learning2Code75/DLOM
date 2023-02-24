import React, { useContext, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../../redux/actions/products";
import { ThemeContext } from "../../../../../App";
const Product = ({ p, setCurProdId, prodsForCatelog, setProdsForCatelog }) => {
  const dispatch = useDispatch();
  const tc = useContext(ThemeContext);
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
          background: displayCustom
            ? tc.theme === "dark"
              ? "white"
              : "#1c1c1c"
            : "white",
          color: displayCustom
            ? tc.theme === "dark"
              ? "black"
              : "#f0f0f0"
            : "black",

          background:
            displayCustom && tc.theme === "dark"
              ? "white"
              : displayCustom && tc.theme === "light"
              ? "white"
              : "#1c1c1c",
          color: displayCustom && tc.theme === "dark" ? "white" : "grey",
        }}
        className="css1Card"
      >
        <div
          className="FlexBetween"
          style={{
            marginBottom: ".5em",
          }}
        >
          <div
            onClick={(e) => {
              e.preventDefault();
              let dc = displayCustom;
              let new_prd = p;
              new_prd.display = customDetails;
              // console.log(new_prd);
              // let new_prds_display = prodsForCatelog;
              // new_prds_display.push(new_prd);
              // setProdsForCatelog(new_prds_display);
              let nps = [...prodsForCatelog];
              // console.log(nps);
              if (!dc) {
                nps.push(new_prd);
              } else {
                nps = nps.filter((n) => n._id !== new_prd._id);
              }
              // console.log(nps);
              setProdsForCatelog(nps);
              setDisplayCustom(!displayCustom);
            }}
            className="css1Btn"
          >
            {displayCustom ? "Selected" : "Select"}
          </div>
        </div>
        <div className="css1ContentBx">
          <div className="css9BasicGrid1">
            <div className="tag">SKU</div>
            <div className="info">{p.prodSKU}</div>

            <div className="css1ImgBx">
              <img src={p.prodImgUrl} />
            </div>

            <div className="tag">Name</div>
            <div className="info">{p.prodName}</div>

            <div className="tag">Unit Rate</div>
            <div className="info">₹{p.productUnitRate}</div>

            <div className="tag">Tax</div>
            <div className="info">{p.prodTax}%</div>

            <div className="tag">Qty</div>
            <div className="info">{p.qty}</div>

            <div className="tag">Category</div>
            <div className="info">{p.category}</div>

            <div className="tag">Discount</div>
            <div className="info">{p.discount}%</div>

            <div className="tag">Description</div>
            <div className="info">
              {p.prodDesc.map((pd) => (
                <div>
                  <h6 className="tag">{pd.title}</h6>
                  <p className="info">{pd.desc}</p>
                </div>
              ))}
            </div>
            <div className="tag">Created</div>
            <div className="info">{moment(p.createdAt).fromNow()}</div>

            {/* <div
          style={{
            display: "flex",
          }}
        >
          <button onClick={() => setCurProdId(p._id)}>Update</button>
          <button onClick={() => dispatch(deleteProduct(p._id))}>Delete</button>
        </div> */}
          </div>
        </div>

        {/* <pre>{JSON.stringify(customDetails, null, 2)}</pre> */}
        {!displayCustom && (
          <div className="css5Form">
            <div className="formLabel">
              Discount Display:
              <input
                value={customDetails.discountDisplay}
                onChange={(e) =>
                  setCustomDetails({
                    ...customDetails,
                    discountDisplay: e.target.value,
                  })
                }
                style={{
                  color: "cyan",
                }}
                className="formControl"
              />
            </div>
            <div className="formLabel">
              Qty Display:
              <input
                value={customDetails.qtyDisplay}
                onChange={(e) =>
                  setCustomDetails({
                    ...customDetails,
                    qtyDisplay: e.target.value,
                  })
                }
                style={{
                  color: "cyan",
                }}
                className="formControl"
              />
            </div>
            <div className="formLabel">
              Unit Price Display:
              <input
                value={customDetails.unitPrice}
                onChange={(e) =>
                  setCustomDetails({
                    ...customDetails,
                    unitPrice: e.target.value,
                  })
                }
                style={{
                  color: "cyan",
                }}
                className="formControl"
              />
            </div>
          </div>
        )}
      </div>

      {/* <pre
        style={{
          overflow: "hidden",
        }}
      >
        {JSON.stringify(p, null, 2)}
      </pre> */}
    </>
  );
};

export default Product;
