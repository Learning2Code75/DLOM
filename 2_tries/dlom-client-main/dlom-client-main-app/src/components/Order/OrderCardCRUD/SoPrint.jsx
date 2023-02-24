import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import { useContext } from "react";
import { GrClose } from "react-icons/gr";
import { useReactToPrint } from "react-to-print";
import { ThemeContext } from "../../../App";

const SoPrint = ({ data }) => {
  const soRef = useRef();
  const tc = useContext(ThemeContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDialog, setOpenDialog] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => soRef.current,
    documentTitle: `${data.invoiceTo}_sales_order`,
    onAfterPrint: () => alert("SO printed"),
  });
  const {
    distributorName,
    distributorDetails,
    voucherNo,
    dated,
    modeTermsOfPayment,
    buyerRefOrderNo,
    otherRef,
    invoiceTo,
    despatchThrough,
    destination,
    termsOfDelivery,
    soTable,
    totalQty,
    totalAmt,
    amtInWords,
  } = data;
  return (
    <>
      <div
        style={{
          margin: "1rem 0",
        }}
      >
        <h5
          style={{
            marginBottom: ".5rem",
          }}
        >
          Print SO
        </h5>

        <div>
          <div className="css1Btn" onClick={() => setOpenDialog(true)}>
            View SO
          </div>
        </div>

        <Dialog
          open={openDialog}
          fullWidth={true}
          fullScreen={fullScreen}
          // maxWidth={}
          onClose={(e, r) => {
            if (r === "backdropClick") {
              setOpenDialog(false);
            } else {
              setOpenDialog(false);
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
          <IconButton
            onClick={() => {
              setOpenDialog(false);
            }}
            style={{
              background: tc.theme === "dark" ? "lightgrey" : "transparent",
              padding: ".25rem",
              position: "absolute",
              top: "0",
              right: "0",
              margin: ".25rem",
            }}
          >
            <GrClose />
          </IconButton>
          <div className="dialogOpenContainer">
            <div className="openStylesButton1" onClick={handlePrint}>
              Print SO
            </div>
          </div>
          <div
            ref={soRef}
            style={{
              width: "100%",
              height: window.innerHeight,
              padding: "1rem",
            }}
          >
            <div
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              SALES ORDER
            </div>
            <div
              style={{
                border: "1px solid black",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  border: "1px solid black",
                  width: "50%",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    padding: ".5rem",
                  }}
                >
                  {distributorName}
                  <div>{distributorDetails}</div>
                </div>
                <div
                  style={{
                    borderTop: "2px solid black",
                    padding: ".5rem",
                  }}
                >
                  <div>Invoice to</div>
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {invoiceTo}
                  </div>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid black",
                  width: "50%",
                }}
              >
                <div
                  style={{
                    borderBottom: "2px solid black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      borderRight: "2px solid black",
                      padding: ".1rem",
                    }}
                  >
                    <div>Voucher No.</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {voucherNo}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      padding: ".1rem",
                    }}
                  >
                    <div>Dated</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {dated}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: "2px solid black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      borderRight: "2px solid black",
                    }}
                  >
                    {/* <div>Voucher No.</div> */}
                    {/* {voucherNo} */}
                  </div>
                  <div
                    style={{
                      width: "50%",
                      padding: ".1rem",
                    }}
                  >
                    <div>Mode/Terms Of Payment</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {modeTermsOfPayment}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: "2px solid black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      borderRight: "2px solid black",
                      padding: ".1rem",
                    }}
                  >
                    <div>Buyer's Ref /Order No.</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {buyerRefOrderNo}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      padding: ".1rem",
                    }}
                  >
                    <div>Other Reference(s)</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {otherRef}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: "2px solid black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      borderRight: "2px solid black",
                      padding: ".1rem",
                    }}
                  >
                    <div>Despatch through</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {despatchThrough}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      padding: ".1rem",
                    }}
                  >
                    <div>Destination</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {destination}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    padding: ".1rem",
                  }}
                >
                  <div>Terms of Delivery</div>
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {termsOfDelivery}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                border: "1px solid black",
                borderTop: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid black",
                }}
              >
                <div
                  style={{
                    borderRight: "2px solid black",
                    borderLeft: "1px solid black",
                    width: "5%",
                    textAlign: "center",
                  }}
                >
                  SI No.
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    width: "45%",
                    textAlign: "center",
                    fontSize: ".85em",
                  }}
                >
                  Description of Goods
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                  }}
                >
                  Due On
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                  }}
                >
                  Quantity
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                  }}
                >
                  Rate
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "5%",
                    fontSize: ".85em",
                  }}
                >
                  per
                </div>
                <div
                  style={{
                    borderRight: "1px solid black",
                    textAlign: "center",
                    width: "12%",
                    fontSize: ".85em",
                  }}
                >
                  Amount
                </div>
              </div>
              {soTable.map((entry, idx) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      border: "1px solid black",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    <div
                      style={{
                        borderRight: "1px solid black",
                        borderLeft: "1px solid black",
                        width: "5%",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div
                      style={{
                        borderRight: "1px solid black",
                        width: "45%",
                        textAlign: "center",
                        fontSize: ".85em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.descriptionOfGoods}
                    </div>
                    <div
                      style={{
                        borderRight: "1px solid black",
                        textAlign: "center",
                        width: "11%",
                        fontSize: ".7em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.dueOn}
                    </div>
                    <div
                      style={{
                        borderRight: "1px solid black",
                        textAlign: "center",
                        width: "11%",
                        fontSize: ".85em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.qty}
                    </div>
                    <div
                      style={{
                        borderRight: "1px solid black",
                        textAlign: "center",
                        width: "11%",
                        fontSize: ".85em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.rate}
                    </div>
                    <div
                      style={{
                        borderRight: "1px solid black",
                        textAlign: "center",
                        width: "5%",
                        fontSize: ".8em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.per}
                    </div>
                    <div
                      style={{
                        borderRight: "1px solid black",
                        textAlign: "center",
                        width: "12%",
                        fontSize: ".85em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.amount}
                    </div>
                  </div>
                </>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid black",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                <div
                  style={{
                    borderRight: "1px solid black",
                    borderLeft: "1px solid black",
                    width: "5%",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "1px solid black",
                    width: "45%",
                    textAlign: "center",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                >
                  Total
                </div>
                <div
                  style={{
                    borderRight: "1px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".7em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "1px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                >
                  {totalQty}
                </div>
                <div
                  style={{
                    borderRight: "1px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "1px solid black",
                    textAlign: "center",
                    width: "5%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "1px solid black",
                    textAlign: "center",
                    width: "12%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                >
                  ₹{totalAmt}
                </div>
              </div>
            </div>
            <div
              style={{
                border: "2px solid black",
                borderTop: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: ".5rem",
                  }}
                >
                  <div>Amount Chargeable (in words)</div>
                  <div>E. & O.E</div>
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    padding: "0 .5rem .5rem .5rem",
                    textTransform: "capitalize",
                  }}
                >
                  INR {amtInWords}
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  flexGrow: "1",
                }}
              >
                <div
                  style={{
                    border: "2px solid black",
                    borderRight: "none",
                    borderBottom: "none",
                    fontWeight: "bold",
                    width: "50%",
                    textAlign: "right",
                  }}
                >
                  <div>for {distributorName}</div>
                  <div
                    style={{
                      marginTop: "3rem",
                      fontWeight: "500",
                    }}
                  >
                    Authorized Signatory
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "2rem",
            }}
          ></div>
        </Dialog>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </>
  );
};

export default SoPrint;
