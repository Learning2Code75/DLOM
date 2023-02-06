import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../../redux/actions/products";
import CatelogDisplay from "./CatelogDisplay/CatelogDisplay";
import Products from "./Products/Products";
const Catelog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [prodsForCatelog, setProdsForCatelog] = useState([]);

  return (
    <>
      <div>
        Catelog
        <Link to="/product">Product</Link>
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
