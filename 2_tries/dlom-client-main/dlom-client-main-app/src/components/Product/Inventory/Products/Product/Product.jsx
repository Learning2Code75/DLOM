import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../../redux/actions/products";
const Product = ({
  p,
  setCurProdId,
  setProdLog,
  setAddQtyDialog,
  setSubQtyDialog,
  setUpdateQtyDialog,
  setDamagedQtyDialog,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
      // style={{
      //   padding: "1em",
      //   borderRadius: "1rem",
      //   background: "rgba(0,0,0,0.89)",
      //   color: "#f0f0f0",
      // }}
      >
        {p.damaged === "normal" && (
          <>
            <div className="FlexBetween">
              <div
                className="css1Btn"
                onClick={() => {
                  setCurProdId(p._id);
                  setProdLog("addQty");
                  setAddQtyDialog(true);
                }}
              >
                Add Qty
              </div>
              <div
                className="css1Btn"
                onClick={() => {
                  setCurProdId(p._id);
                  setProdLog("subQty");
                  setSubQtyDialog(true);
                }}
              >
                Reduce Qty
              </div>
            </div>
            <div
              className="FlexBetween"
              style={{
                margin: "1em 0",
              }}
            >
              <div
                className="css1Btn"
                onClick={() => {
                  setCurProdId(p._id);
                  setProdLog("updateQty");
                  setUpdateQtyDialog(true);
                }}
              >
                Update Qty
              </div>
              <div
                className="css1Btn"
                onClick={() => {
                  setCurProdId(p._id);
                  setProdLog("markDamaged");
                  setDamagedQtyDialog(true);
                }}
              >
                Mark Damaged
              </div>
            </div>
          </>
        )}
        <div className="css1ContentBx">
          <div className="css1ImgBx">
            <img
              style={{
                borderRadius: ".5em",
              }}
              src={p.prodImgUrl}
            />
          </div>
          <div className="tag">SKU</div>
          <div className="info">{p.prodSKU}</div>

          <div className="tag">Name</div>
          <div className="info">{p.prodName}</div>
          <div className="tag">Unit Rate</div>
          <div className="info">{p.productUnitRate}</div>
          <div className="tag">Tax</div>
          <div className="info">{p.prodTax}%</div>
          <div className="tag">Qty</div>
          <div className="info">{p.qty}</div>

          <div className="tag">Category</div>
          <div className="info">{p.category}</div>
          <div className="tag">Discount</div>
          <div className="info">{p.discount}</div>

          <div className="tag">Description</div>
          <div className="info">
            {p.prodDesc.map((pd) => (
              <div>
                <h6>{pd.title}</h6>
                <p>{pd.desc}</p>
              </div>
            ))}
          </div>
          <div className="tag">Created</div>
          <div className="info">{moment(p.createdAt).fromNow()}</div>
        </div>

        {/* <button onClick={() => setCurProdId(p._id)}>Update</button> */}
        {p.damaged === "damaged" && (
          <>
            <div className="tag">Damaged Description</div>
            <div className="info">{p.damagedDescription}</div>
            <div
              className="btn3"
              onClick={() => dispatch(deleteProduct(p._id))}
            >
              Delete
            </div>
          </>
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
