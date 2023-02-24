import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import { useContext } from "react";
import { GrClose } from "react-icons/gr";
import { useReactToPrint } from "react-to-print";
import { ThemeContext } from "../../../App";

const SrPrint = ({ data }) => {
  const srRef = useRef();
  const theme = useTheme();
  const tc = useContext(ThemeContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDialog, setOpenDialog] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => srRef.current,
    documentTitle: `${data.name}_sales_receipt`,
    onAfterPrint: () => alert("Sr printed"),
  });
  const {
    distributorName,
    distributorDetails,
    soldBy,
    date,
    name,
    address,
    mode,
    srTable,
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
          Print Salesreceipt
        </h5>

        <div>
          <div className="css1Btn" onClick={() => setOpenDialog(true)}>
            View Salesreceipt
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
          <div className="dialogOpenContainer">
            <div className="openStylesButton1" onClick={handlePrint}>
              Print Salesreceipt
            </div>
          </div>
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
              {distributorName}
            </div>

            <div
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1em",
              }}
            >
              {distributorDetails}
            </div>

            <div
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.2em",
              }}
            >
              Sales Receipt
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
                    {soldBy}
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
                    {name}
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
                    {address}
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
                    {date}
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
              {mode}
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
                  Qty.
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
                  Price
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
              {srTable.map((entry) => (
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
                    {entry.qty}
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
                    {entry.details}
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
                    {entry.price}
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
            </div>
          </div>
        </Dialog>
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
};

export default SrPrint;
