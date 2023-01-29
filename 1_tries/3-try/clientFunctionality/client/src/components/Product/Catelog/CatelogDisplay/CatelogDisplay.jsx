import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const CatelogDisplay = ({ prodsForCatelog, setProdsForCatelog }) => {
  const catelogRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => catelogRef.current,
    documentTitle: `prodCatelog`,
    onAfterPrint: () => alert("Product Catelog printed"),
  });
  return (
    <>
      <div>CatelogDisplay</div>
      <button onClick={handlePrint}>Print Catelog</button>
      <div
        ref={catelogRef}
        style={{
          width: "100%",
          height: window.innerHeight,
          padding: "1rem",
        }}
      >
        {prodsForCatelog.map((p) => (
          <>
            <div>Product</div>
            <img height={500} width={500} src={p.prodImgUrl} />

            <pre>{JSON.stringify(p, null, 2)}</pre>
          </>
        ))}
      </div>
    </>
  );
};

export default CatelogDisplay;
