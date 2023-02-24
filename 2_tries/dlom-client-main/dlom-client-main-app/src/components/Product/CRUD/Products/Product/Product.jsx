import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../../redux/actions/products";
const Product = ({ p, setCurProdId, setOpenDialog }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <div className="FlexBetween">
          {p.damaged !== "damaged" && (
            <div
              onClick={() => {
                setCurProdId(p._id);
                setOpenDialog(true);
              }}
              className="css1Btn"
            >
              Update
            </div>
          )}

          <div
            className="css1Btn"
            onClick={() => dispatch(deleteProduct(p._id))}
          >
            Delete
          </div>
        </div>
        <div
          className="css1ImgBx"
          // style={{
          //   overflow: "contain",
          //   display: "flex",
          //   justifyContent: "center",
          // }}
          style={{
            margin: ".5em 0",
          }}
        >
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
        <div
          className="info"
          style={{
            fontWeight: "bold",
          }}
        >
          ₹{p.productUnitRate}
        </div>

        <div className="tag">Tax</div>
        <div className="info">{p.prodTax}%</div>

        <div className="tag">Qty</div>
        <div className="info">{p.qty}</div>

        <div className="tag">Category</div>
        <div className="info">{p.category}</div>

        <div className="tag">Discount</div>
        <div className="info">{p.discount}%</div>

        <div className="tag">Created</div>
        <div className="info">{moment(p.createdAt).fromNow()}</div>

        <div className="tag">Description</div>
        <div className="info">
          {p.prodDesc.map((pd) => (
            <div>
              <h6 className="tag">{pd.title}</h6>
              <p className="info">{pd.desc}</p>
            </div>
          ))}
        </div>

        {p.damaged === "damaged" && (
          <>
            <div className="tag">Damage Details</div>
            <div className="info">{p.damagedDescription}</div>
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
