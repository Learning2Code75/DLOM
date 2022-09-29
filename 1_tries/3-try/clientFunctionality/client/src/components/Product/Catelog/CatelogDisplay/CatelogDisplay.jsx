import React from "react";

const CatelogDisplay = ({ prodsForCatelog, setProdsForCatelog }) => {
  return (
    <>
      <div>CatelogDisplay</div>
      <button>Print</button>
      <div>
        {prodsForCatelog.map((p) => (
          <>
            <div>Product</div>
            <pre>{JSON.stringify(p, null, 2)}</pre>
          </>
        ))}
      </div>
    </>
  );
};

export default CatelogDisplay;
