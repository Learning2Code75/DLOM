import { useQuery } from "@apollo/client";
import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import React, { useRef } from "react";
import { useContext } from "react";
import { GrClose } from "react-icons/gr";
import { useReactToPrint } from "react-to-print";
import { ThemeContext } from "../../../../App";
import { GET_DISTRIBUTOR_DETAILS } from "../../../../queries/distributorQueries";

const CatelogDisplay = ({
  prodsForCatelog,
  setProdsForCatelog,
  openDialog,
  setOpenDialog,
}) => {
  const { loading, error, data } = useQuery(GET_DISTRIBUTOR_DETAILS);

  const catelogRef = useRef();
  const tc = useContext(ThemeContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePrint = useReactToPrint({
    content: () => catelogRef.current,
    documentTitle: `prodCatelog`,
    onAfterPrint: () => alert("Product Catelog printed"),
  });
  return (
    <>
      <h2>Catelog Display</h2>
      <div className="dialogOpenContainer">
        <div className="openStylesButton1" onClick={() => setOpenDialog(true)}>
          View Catelog
        </div>
      </div>

      <Dialog
        open={openDialog}
        fullWidth={true}
        fullScreen={fullScreen}
        // maxWidth={}
        onClose={(e, r) => {
          if (r === "backdropClick") {
            setOpenDialog(!openDialog);
          } else {
            setOpenDialog(!openDialog);
          }
        }}
        // PaperComponent={<PaperC />}
        PaperProps={{
          sx: {
            borderRadius: "1rem",
            background: tc.theme === "light" ? "#ebecf0" : "#232427",
            color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
          },
        }}
        scroll={"body"}
        id={tc.theme}
      >
        <div className="css5Form">
          <div className="FlexBetween">
            <button className="btn2" onClick={handlePrint}>
              Print Catelog
            </button>

            <IconButton
              onClick={() => {
                setOpenDialog(false);
              }}
              style={{
                background: tc.theme === "dark" ? "lightgrey" : "transparent",
                padding: ".25rem",
              }}
            >
              <GrClose />
            </IconButton>
          </div>

          <div
            ref={catelogRef}
            style={{
              width: "100%",
              // height: window.innerHeight,
              margin: ".5rem",
              marginBottom: "5rem",
              padding: "1rem",
            }}
          >
            {!loading && !error && (
              <div>
                {data.distributor.map((d) => (
                  <div className="css1Card">
                    <div className="css1ContentBx">
                      <div className="css9BasicGrid1">
                        <div className="css9BasicGrid">
                          <div className="css1Card">
                            <div className="tag">Company Name</div>
                            <div
                              className="info"
                              style={{ fontWeight: "bold" }}
                            >
                              {d.companyName}
                            </div>
                            <div className="tag">Address</div>
                            <div
                              className="info"
                              style={{ fontWeight: "bold" }}
                            >
                              {d.address}
                            </div>
                            <div className="tag">GST</div>
                            <div
                              className="info"
                              style={{ fontWeight: "bold" }}
                            >
                              {d.gst}
                            </div>
                            <div className="tag">Account Number</div>
                            <div
                              className="info"
                              style={{ fontWeight: "bold" }}
                            >
                              {d.accountNumber}
                            </div>
                            <div className="tag">Bank IFSC</div>
                            <div
                              className="info"
                              style={{ fontWeight: "bold" }}
                            >
                              {d.bankIfsc}
                            </div>
                          </div>
                          <div className="css1Card">
                            <div className="tag">Phone Number</div>
                            <div
                              className="info"
                              style={{ fontWeight: "bold" }}
                            >
                              {d.phoneNumber}
                            </div>

                            <div className="tag">Social Media</div>
                            <div className="info">
                              {d.socialMedia.map((sm) => (
                                <div>
                                  <h4>{sm.title}</h4>
                                  <p>{sm.link}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="css9BasicGrid">
              {prodsForCatelog.map((p) => (
                <div
                  className="css1Card"
                  style={{
                    border: "1px solid black",
                    borderRadius: ".5rem",
                    padding: ".5rem",
                  }}
                >
                  {/* <div>Product</div> */}
                  <div className="css1ContentBx">
                    <div className="css9BasicGrid1">
                      <div
                        className="tag"
                        style={{
                          borderRadius: ".5rem",
                          background: "#1c1c1c",
                          color: "white",
                          padding: ".5rem",
                          fontWeight: "bold",
                          width: "max-content",
                          fontSize: ".8em",
                        }}
                      >
                        SKU
                      </div>
                      <div
                        className="info"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {p.prodSKU}
                      </div>

                      <div
                        className="css1ImgBx"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: ".5rem 0",
                        }}
                      >
                        <img src={p.prodImgUrl} height={150} width={150} />
                      </div>

                      <div
                        className="tag"
                        style={{
                          borderRadius: ".5rem",
                          background: "#1c1c1c",
                          color: "white",
                          padding: ".5rem",
                          fontWeight: "bold",
                          width: "max-content",
                          fontSize: ".8em",
                        }}
                      >
                        Name
                      </div>
                      <div
                        className="info"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {p.prodName}
                      </div>

                      <div
                        className="tag"
                        style={{
                          borderRadius: ".5rem",
                          background: "#1c1c1c",
                          color: "white",
                          padding: ".5rem",
                          fontWeight: "bold",
                          width: "max-content",
                          fontSize: ".8em",
                        }}
                      >
                        Unit Rate
                      </div>
                      <div
                        className="info"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        ₹{p.display.unitPrice}
                      </div>

                      <div
                        className="tag"
                        style={{
                          borderRadius: ".5rem",
                          background: "#1c1c1c",
                          color: "white",
                          padding: ".5rem",
                          fontWeight: "bold",
                          width: "max-content",
                          fontSize: ".8em",
                        }}
                      >
                        Tax
                      </div>
                      <div
                        className="info"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {p.prodTax}%
                      </div>

                      <div
                        className="tag"
                        style={{
                          borderRadius: ".5rem",
                          background: "#1c1c1c",
                          color: "white",
                          padding: ".5rem",
                          fontWeight: "bold",
                          width: "max-content",
                          fontSize: ".8em",
                        }}
                      >
                        Qty
                      </div>
                      <div
                        className="info"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {p.display.qtyDisplay}
                      </div>

                      <div
                        className="tag"
                        style={{
                          borderRadius: ".5rem",
                          background: "#1c1c1c",
                          color: "white",
                          padding: ".5rem",
                          fontWeight: "bold",
                          width: "max-content",
                          fontSize: ".8em",
                        }}
                      >
                        Category
                      </div>
                      <div
                        className="info"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {p.category}
                      </div>

                      <div
                        className="tag"
                        style={{
                          borderRadius: ".5rem",
                          background: "#1c1c1c",
                          color: "white",
                          padding: ".5rem",
                          fontWeight: "bold",
                          width: "max-content",
                          fontSize: ".8em",
                        }}
                      >
                        Discount
                      </div>
                      <div
                        className="info"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {p.display.discountDisplay}%
                      </div>

                      <div
                        className="tag"
                        style={{
                          borderRadius: ".5rem",
                          background: "#1c1c1c",
                          color: "white",
                          padding: ".5rem",
                          fontWeight: "bold",
                          width: "max-content",
                          fontSize: ".8em",
                        }}
                      >
                        Description
                      </div>
                      <div
                        className="info"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {p.prodDesc.map((pd) => (
                          <div>
                            <h6 className="tag">{pd.title}</h6>
                            <p className="info">{pd.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* <pre>{JSON.stringify(p, null, 2)}</pre> */}
                </div>
              ))}
            </div>
          </div>
          <button className="btn2" onClick={handlePrint}>
            Print Catelog
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default CatelogDisplay;
