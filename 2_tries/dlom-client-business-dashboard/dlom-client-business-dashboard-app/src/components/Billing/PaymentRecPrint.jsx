import { Dialog, IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useContext, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useReactToPrint } from "react-to-print";
import { ThemeContext } from "../../App";

const PaymentRecPrint = ({ data, bMeta }) => {
  const srRef = useRef();
  const tc = useContext(ThemeContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePrint = useReactToPrint({
    content: () => srRef.current,
    documentTitle: `${data?.dlom_client?.companyName}_payemnt_receipt`,
    onAfterPrint: () => alert("Receipt printed"),
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
        <h5>Payment Receipt</h5>
        <div className="css1Btn" onClick={() => setOpenDialog(true)}>
          View Payment Receipt
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
            Print Payment Receipt
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
              fontSize: "1.8em",
            }}
          >
            Neel Choksi
          </div>

          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1em",
            }}
          >
            Mumbai
          </div>

          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.2em",
            }}
          >
            Payment Receipt
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
                  padding: ".1em",
                }}
              >
                Sold By
                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Neel Choksi
                </div>
              </div>
              <div
                style={{
                  padding: ".1em",
                  border: "2px solid black",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                Name
                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {dlom_client.companyName}
                </div>
              </div>
              <div
                style={{
                  padding: ".1em",
                }}
              >
                Address
                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {dlom_client.address}
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
                  padding: ".1em",
                }}
              >
                Date
                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {new Date().toDateString()}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              border: "2px solid black",
              padding: ".2em",
              fontSize: "1.5em",
              borderTop: "none",
              fontWeight: "bold",
            }}
          >
            {/* {mode} */}
          </div>
          <div
            style={{
              border: "2px solid black",
              marginTop: "1em",
              borderBottom: "1px solid black",
            }}
          >
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid black",
              }}
            >
              <div
                style={{
                  borderRight: "2px solid black",
                  width: "10%",
                  fontWeight: "bold",
                  padding: ".1em",
                  textAlign: "center",
                }}
              >
                Sr No.
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  width: "50%",
                  fontWeight: "bold",
                  padding: ".1em",
                  textAlign: "center",
                }}
              >
                Details
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  width: "20%",
                  fontWeight: "bold",
                  padding: ".1em",
                  textAlign: "center",
                }}
              >
                Mode
              </div>
              <div
                style={{
                  width: "20%",
                  fontWeight: "bold",
                  padding: ".1em",
                  textAlign: "center",
                }}
              >
                Amount
              </div>
            </div>
            {payments.map((entry, idx) => (
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid black",
                  borderTop: "1px solid black",
                }}
              >
                <div
                  style={{
                    borderRight: "2px solid black",
                    width: "10%",
                    fontWeight: "bold",
                    padding: ".1em",
                    textAlign: "center",
                  }}
                >
                  {idx + 1}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    width: "50%",
                    fontWeight: "bold",
                    padding: ".1em",
                    textAlign: "center",
                  }}
                >
                  {entry.description}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    width: "20%",
                    fontWeight: "bold",
                    padding: ".1em",
                    textAlign: "center",
                  }}
                >
                  {entry.mode}
                </div>
                <div
                  style={{
                    width: "20%",
                    fontWeight: "bold",
                    padding: ".1em",
                    textAlign: "center",
                  }}
                >
                  {entry.amount}
                </div>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid black",
                borderTop: "1px solid black",
              }}
            >
              <div
                style={{
                  borderRight: "2px solid black",
                  width: "10%",
                  fontWeight: "bold",
                  padding: ".1em",
                  textAlign: "center",
                }}
              >
                {/* {idx + 1} */}
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  width: "50%",
                  fontWeight: "bold",
                  padding: ".1em",
                  textAlign: "right",
                }}
              >
                Total
              </div>
              <div
                style={{
                  borderRight: "2px solid black",
                  width: "20%",
                  fontWeight: "bold",
                  padding: ".1em",
                  textAlign: "center",
                }}
              >
                {/* {entry.mode} */}
              </div>
              <div
                style={{
                  width: "20%",
                  fontWeight: "bold",
                  padding: ".1em",
                  textAlign: "center",
                }}
              >
                ₹{bMeta[0].value}
              </div>
            </div>
          </div>

          {/* <div>{"Neel Choksi"}</div>
          <div>{"Addr"}</div>
          <div>{"GYB DLOM"}</div>
          <div>{new Date(timestamp).toDateString()}</div>
          <div>Subscription</div>
          <div>
            <div>{subscription.name}</div>
            <div>{subscription.description}</div>
            <div>{subscription.cost}</div>
            <div>{subscription.costPer}</div>
            <div>Limits:</div>

            <div>Client Ops:{subscription.tracking.CliOps}</div>
            <div>User Ops:{subscription.tracking.UserOps}</div>
            <div>Product Ops:{subscription.tracking.ProdOps}</div>
            <div>Order Ops:{subscription.tracking.OrderOps}</div>
            <div>Task Ops:{subscription.tracking.TaskOps}</div>
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

export default PaymentRecPrint;
