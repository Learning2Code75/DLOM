import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../../redux/actions/products";
import CatelogDisplay from "./CatelogDisplay/CatelogDisplay";
import Products from "./Products/Products";
import { TiArrowLeftThick } from "react-icons/ti";

const Catelog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [prodsForCatelog, setProdsForCatelog] = useState([]);

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
          className="dashboardLink"
          style={{
            marginRight: "1rem",
            fontSize: "2em",
            color: "white",
            boxShadow:
              " inset 5px 5px 5px rgba(0,0,0,0.2),inset -5px -5px 15px rgba(255,255,255,0.1), 5px 5px 15px rgba(0,0,0,0.3),  -5px -5px 15px rgba(255,255,255,0.2)",
            borderRadius: ".64rem",
            padding: ".4rem .6rem",
            cursor: "pointer",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h1>Catelog</h1>
      </div>
      <div>
        {/* <pre>{JSON.stringify(prodsForCatelog, null, 2)}</pre> */}
        <CatelogDisplay
          prodsForCatelog={prodsForCatelog}
          setProdsForCatelog={setProdsForCatelog}
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
