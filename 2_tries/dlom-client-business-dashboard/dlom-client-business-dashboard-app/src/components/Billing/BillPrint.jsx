import { Dialog, IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useContext, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useReactToPrint } from "react-to-print";
import { ThemeContext } from "../../App";

const BillPrint = ({ data, bInvMeta }) => {
  const srRef = useRef();
  const tc = useContext(ThemeContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePrint = useReactToPrint({
    content: () => srRef.current,
    documentTitle: `${data?.dlom_client?.companyName}_bill`,
    onAfterPrint: () => alert("Bill printed"),
  });
  const [openDialog, setOpenDialog] = useState(false);
  const { _id, dlom_client, subscription, timestamp, payments } = data;

  return (
    <>
      <div
        className="FlexBetween"
        style={{
          margin: "2rem 0",
        }}
      >
        <h5>Bill</h5>
        <div className="css1Btn" onClick={() => setOpenDialog(true)}>
          View Bill
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
            Print Bill
          </div>
        </div>

        <div
          ref={srRef}
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
            BILL
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
                Neel Choksi
                <div>Mumbai</div>
              </div>
              <div
                style={{
                  borderTop: "2px solid black",
                  padding: ".5rem",
                }}
              >
                <div>Buyer</div>
                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {dlom_client.companyName}

                  <div
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {dlom_client.address}
                  </div>
                  <div
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {dlom_client.state}
                  </div>
                  <div
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {dlom_client.cin}
                  </div>

                  <div
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {dlom_client.locationPin}
                  </div>
                  <div
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {dlom_client.gst}
                  </div>
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
                  <div>Invoice No.</div>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: ".58em",
                    }}
                  >
                    {_id}
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
                    {new Date(timestamp).toDateString()}
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
                  <div>Delivery Note</div>
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {/* {deliveryNote} */}
                  </div>
                </div>
                <div
                  style={{
                    width: "50%",
                    padding: ".1rem",
                  }}
                >
                  {/* <div>Mode/Terms Of Payment</div> */}
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {/* {modeTermsOfPayment} */}
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
                  <div>Supplier's Ref</div>
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {/* {supplierRef} */}
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
                    {/* {otherRef} */}
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
                  <div>Despatch Document No.</div>
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {/* {despatchDocNo} */}
                  </div>
                </div>
                <div
                  style={{
                    width: "50%",
                    padding: ".1rem",
                  }}
                >
                  <div>Delivery Note Date</div>
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {/* {deliveryNoteDate} */}
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
                  <div>Despatched through</div>
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {/* {despatchedThrough} */}
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
                    {/* {destination} */}
                  </div>
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
                  fontSize: ".8em",
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
                HSN /SAC
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "11%",
                  fontSize: ".85em",
                }}
              >
                GST Rate
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "11%",
                  fontSize: ".8em",
                }}
              >
                Quan tity
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "15%",
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
                    borderRight: "2px solid black",
                    borderLeft: "1px solid black",
                    width: "5%",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {1}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    width: "45%",
                    textAlign: "center",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                >
                  {subscription.name}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".7em",
                    fontWeight: "bold",
                  }}
                >
                  {/* {entry.hsnSAC} */}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                >
                  {bInvMeta.taxPercent}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                >
                  {1}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "15%",
                    fontSize: ".8em",
                    fontWeight: "bold",
                  }}
                >
                  {subscription.cost}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "5%",
                    fontSize: ".6em",
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
                  {subscription.cost}
                </div>
              </div>
            </>
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
                  borderRight: "2px solid black",
                  borderLeft: "1px solid black",
                  width: "5%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  width: "45%",
                  textAlign: "right",
                  fontSize: ".85em",
                  fontWeight: "bold",
                  paddingRight: ".2em",
                }}
              >
                Output CGST
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "11%",
                  fontSize: ".7em",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "11%",
                  fontSize: ".85em",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "11%",
                  fontSize: ".85em",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "15%",
                  fontSize: ".8em",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "5%",
                  fontSize: ".6em",
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
                {bInvMeta.taxAmount / 2}
              </div>
            </div>
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
                  borderRight: "2px solid black",
                  borderLeft: "1px solid black",
                  width: "5%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  width: "45%",
                  textAlign: "right",
                  fontSize: ".85em",
                  fontWeight: "bold",
                  paddingRight: ".2em",
                }}
              >
                Output SGST
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "11%",
                  fontSize: ".7em",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "11%",
                  fontSize: ".85em",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "11%",
                  fontSize: ".85em",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "15%",
                  fontSize: ".8em",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "5%",
                  fontSize: ".6em",
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
                {bInvMeta.taxAmount / 2}
              </div>
            </div>
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
                  borderRight: "2px solid black",
                  borderLeft: "1px solid black",
                  width: "5%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  width: "45%",
                  textAlign: "right",
                  fontSize: ".85em",
                  fontWeight: "bold",
                  paddingRight: ".2em",
                }}
              >
                Total
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "11%",
                  fontSize: ".7em",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "11%",
                  fontSize: ".85em",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "11%",
                  fontSize: ".85em",
                  fontWeight: "bold",
                }}
              >
                {1}
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "15%",
                  fontSize: ".8em",
                  fontWeight: "bold",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "5%",
                  fontSize: ".6em",
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
                ₹{bInvMeta.afterTaxAmount}
              </div>
            </div>
          </div>
          <div
            style={{
              border: "2px solid black",
              borderTop: "none",
              // height: "100%",
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
                INR {bInvMeta.afterTaxAmountInWords}
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
                  width: "30%",
                  textAlign: "center",
                }}
              >
                HSN/SAC
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  width: "30%",
                  textAlign: "center",
                  fontSize: ".8em",
                }}
              >
                Taxable Value
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "10%",
                  fontSize: ".8em",
                }}
              >
                Central Tax Rate
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "10%",
                  fontSize: ".8em",
                }}
              >
                Central Tax Amount
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "10%",
                  fontSize: ".8em",
                }}
              >
                State Tax Rate
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "10%",
                  fontSize: ".8em",
                }}
              >
                State Tax Amount
              </div>
            </div>

            <>
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
                    width: "30%",
                    textAlign: "center",
                  }}
                >
                  {/* {entry.hsnSAC} */}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    width: "30%",
                    textAlign: "center",
                    fontSize: ".8em",
                  }}
                >
                  {subscription.cost}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "10%",
                    fontSize: ".8em",
                  }}
                >
                  {bInvMeta.taxPercent / 2}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "10%",
                    fontSize: ".8em",
                  }}
                >
                  {bInvMeta.taxAmount / 2}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "10%",
                    fontSize: ".8em",
                  }}
                >
                  {bInvMeta.taxPercent / 2}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "10%",
                    fontSize: ".8em",
                  }}
                >
                  {bInvMeta.taxAmount / 2}
                </div>
              </div>
            </>
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
                  width: "30%",
                  textAlign: "right",
                  fontWeight: "bold",
                  paddingRight: ".2em",
                }}
              >
                Total
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  width: "30%",
                  textAlign: "center",
                  fontSize: ".8em",
                }}
              >
                {bInvMeta.totAmt}
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "10%",
                  fontSize: ".8em",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "10%",
                  fontSize: ".8em",
                }}
              >
                {bInvMeta.taxAmount / 2}
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "10%",
                  fontSize: ".8em",
                }}
              ></div>
              <div
                style={{
                  borderRight: "2px solid black",
                  textAlign: "center",
                  width: "10%",
                  fontSize: ".8em",
                }}
              >
                {bInvMeta.taxAmount / 2}
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
                <div>
                  Tax Amount (in words) :
                  <span
                    style={{
                      fontWeight: "bold",
                      padding: "0 .5rem .5rem .5rem",
                      textTransform: "capitalize",
                    }}
                  >
                    INR {bInvMeta.taxAmountInWords}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "50%",
                }}
              >
                <div
                  style={{
                    paddingLeft: ".1em",
                  }}
                >
                  Company's PAN :
                  <span
                    style={{
                      fontWeight: "bold",
                      marginLeft: "2em",
                    }}
                  >
                    {/* {companyPAN} */}
                  </span>
                </div>
                <div
                  style={{
                    textDecoration: "underline",
                    paddingLeft: ".1em",
                  }}
                >
                  Declaration
                </div>
                <div
                  style={{
                    fontSize: ".9em",
                    paddingLeft: ".1em",
                  }}
                >
                  We declare that this invoice shows the actual price of the
                  goods described and that all particulars are true and correct.
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  paddingLeft: ".5em",
                }}
              >
                <div>Company's Bank Details</div>
                <div>
                  Bank Name
                  <span style={{ paddingLeft: "2em", fontWeight: "bold" }}>
                    {/* : {companyBankDetails.bankName} */}
                  </span>
                </div>
                <div>
                  A/c No.
                  <span style={{ paddingLeft: "2em", fontWeight: "bold" }}>
                    {/* : {companyBankDetails.acNo} */}
                  </span>
                </div>
                <div>
                  Branch & IFS Code
                  <span style={{ paddingLeft: "2em", fontWeight: "bold" }}>
                    {/* : {companyBankDetails.BranchIFSCode} */}
                  </span>
                </div>
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
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  fontWeight: "bold",
                  width: "50%",
                  textAlign: "left",
                  paddingLeft: ".1em",
                }}
              >
                <div>Customer's Seal and Signature</div>
                <div
                  style={{
                    marginTop: "3rem",
                    fontWeight: "500",
                    color: "white",
                  }}
                >
                  Authorized Signatory
                </div>
              </div>
              <div
                style={{
                  border: "2px solid black",
                  borderRight: "none",
                  borderBottom: "none",
                  fontWeight: "bold",
                  width: "50%",
                  textAlign: "right",
                  paddingRight: ".2em",
                }}
              >
                <div>for Neel Choksi</div>
                <div
                  style={{
                    marginTop: "3rem",
                    fontWeight: "500",
                    paddingRight: ".2em",
                  }}
                >
                  Authorized Signatory
                </div>
              </div>
            </div>
          </div>

          {/* <h3>Seller </h3>
          <div>{"Neel Choksi"}</div>
          <div>{"Addr"}</div>
          <div>{"GYB DLOM"}</div>

          <h3>Buyer</h3>
          <div>{dlom_client?.companyName}</div>
          <div>{dlom_client?.locationPin}</div>
          <div>{dlom_client?.state}</div>
          <div>{dlom_client?.cin}</div>
          <div>{dlom_client?.gst}</div>
          <div>{dlom_client?.address}</div>
          <div>{dlom_client?.phone}</div>
          <div>{dlom_client?.desc}</div>

          <div>{new Date(timestamp).toDateString()}</div>
          <div>Subscription</div>
          <div>
            <div>{subscription?.name}</div>
            <div>{subscription?.description}</div>
            <div>{subscription?.cost}</div>
            <div>{subscription?.costPer}</div>
            <div>{bInvMeta.totAmt}</div>
            <div>{bInvMeta.taxPercent}</div>
            <div>{bInvMeta.taxAmount}</div>
            <div>{bInvMeta.afterTaxAmount}</div>

            <div>Limits:</div>

            <div>Client Ops:{subscription?.tracking.CliOps}</div>
            <div>User Ops:{subscription?.tracking.UserOps}</div>
            <div>Product Ops:{subscription?.tracking.ProdOps}</div>
            <div>Order Ops:{subscription?.tracking.OrderOps}</div>
            <div>Task Ops:{subscription?.tracking.TaskOps}</div>
          </div> */}
          {/* {payments.map((entry) => (
            <div
              style={{
                border: "1px solid black",
              }}
            >
              <div>{new Date(entry.timestamp).toDateString()}</div>
              <div>{new Date(entry.timestamp).toTimeString()}</div>
              <div>{entry.amount}</div>
              <div>{entry.description}</div>
              <div>{entry.mode}</div>
            </div>
          ))} */}
          {/* <div>total Amt Paid:{bMeta[0].value}</div> */}
        </div>
      </Dialog>
    </>
  );
};

export default BillPrint;
