import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { BsDownload } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { ThemeContext } from "../../App";

const PaymentCSV = ({ clientData, billingData }) => {
  const tc = useContext(ThemeContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [currLedger, setCurrLedger] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [pl, setPl] = useState({
    totalAmountToPay: 0,
    paid: 0,
  });
  const headers = [
    { label: "Bill id", key: "billId" },
    { label: "Payment Date", key: "date" },
    { label: "Payment Time", key: "time" },
    { label: "Payment Method", key: "mode" },
    { label: "Description", key: "description" },
    { label: "Amount", key: "amount" },
  ];
  const calcLedger = () => {
    let new_ledger = [];
    for (let i = 0; i < billingData.length; i++) {
      if (billingData[i]?.dlom_client?._id === clientData._id) {
        for (let j = 0; j < billingData[i].payments.length; j++) {
          new_ledger.push({
            billId: billingData[i]._id,
            date: new Date(billingData[i].timestamp).toDateString(),
            time: new Date(billingData[i].timestamp).toTimeString(),
            mode: billingData[i].payments[j].mode,
            description: billingData[i].payments[j].description,
            amount: billingData[i].payments[j].amount,
          });
        }
      }
    }
    // console.log(clientData);
    // console.log(billingData);

    setCurrLedger(new_ledger);
  };

  return (
    <div>
      {currLedger.length > 0 && (
        <div>
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
            <div className="btn1">
              <BsDownload />

              <CSVLink
                data={currLedger}
                headers={headers}
                filename={`${clientData.companyName}_ledger`}
                target="_blank"
                style={{
                  marginLeft: ".2em",
                  color: "cyan",
                  textDecoration: "none",
                }}
              >
                Payment Ledger CSV
              </CSVLink>
            </div>

            <div
              style={{
                margin: "2.5rem .5rem",
                marginBottom: "5rem",
              }}
              className="css9BasicGrid"
            >
              {currLedger.map((cr) => (
                <div className="css1Card">
                  <div className="css1ContentBx">
                    <div className="css9BasicGrid1">
                      <div className="tag">Bill ID</div>
                      <div className="info">{cr.billId}</div>
                      <div className="tag">Date</div>
                      <div className="info">{cr.date}</div>
                      <div className="tag">Time</div>
                      <div className="info">{cr.time}</div>
                      <div className="tag">Desc</div>
                      <div className="info">{cr.description}</div>
                      <div className="tag">Mode</div>
                      <div className="info">{cr.mode}</div>
                      <div className="tag">Amount</div>
                      <div className="info">{cr.amount}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Dialog>
          <div>{/* <pre>{JSON.stringify(currLedger, null, 2)}</pre> */}</div>
        </div>
      )}
      <div
        onClick={() => {
          calcLedger();
          setOpenDialog(true);
        }}
        className="btn1"
        style={{
          marginBottom: "1.2rem",
        }}
      >
        View Ledger
      </div>
    </div>
  );
};

export default PaymentCSV;
