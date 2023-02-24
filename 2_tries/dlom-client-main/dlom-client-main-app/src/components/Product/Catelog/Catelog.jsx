import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../../redux/actions/products";
import CatelogDisplay from "./CatelogDisplay/CatelogDisplay";
import Products from "./Products/Products";
import { TiArrowLeftThick } from "react-icons/ti";
import { ThemeContext } from "../../../App";

const Catelog = () => {
  const tc = useContext(ThemeContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [prodsForCatelog, setProdsForCatelog] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to="/product"
          className="openStylesButton1"
          style={{
            marginRight: "1rem",
            borderRadius: ".64rem",
            padding: ".6rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: tc.theme === "light" ? "#232427" : "#ebecf0",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h2>Catelog</h2>
      </div>
      <div>
        {/* <pre>{JSON.stringify(prodsForCatelog, null, 2)}</pre> */}
        <CatelogDisplay
          prodsForCatelog={prodsForCatelog}
          setProdsForCatelog={setProdsForCatelog}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>
      <div>
        <Products
          prodsForCatelog={prodsForCatelog}
          setProdsForCatelog={setProdsForCatelog}
        />
      </div>
    </>
  );
};

export default Catelog;
