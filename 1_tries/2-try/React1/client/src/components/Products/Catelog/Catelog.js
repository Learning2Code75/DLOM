import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const Catelog = () => {
  const handleChange = () => {};
  const createAndDownloadPdf = ()=>{};
  return (
    <>
      <h1>Catelog</h1>
      <div>
        <ul>
          <li>view product with checkbox option to select in pdf</li>
          <li>select product to print pdf</li>
        </ul>
      </div>

      <div className="products-printing">
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="receipt id"
          name="receiptId"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="price1"
          name="price1"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="price2"
          name="price2"
          onChange={handleChange}
        />
        <button onClick={createAndDownloadPdf}>Download PDF</button>
      </div>
    </>
  );
};

export default Catelog;
