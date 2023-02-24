import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { BsDownload } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { MdPayments } from "react-icons/md";
import { ThemeContext } from "../../../App";

// const useStyles = makeStyles({
//   scrollCard: {
//     overflowX: "scroll",
//     scrollbarWidth: "auto",

//     "&::-webkit-scrollbar": {
//       background: "none",
//       width: "0.35em",
//     },
//     "&::scrollbar": {
//       background: "none",
//       scrollbarWidth: "auto",
//     },
//     "&::-webkit-scrollbar-track": {
//       display: "none",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       background: "lightgrey",
//       borderRadius: "2em",
//       width: "10px",
//       scrollbarWidth: "10",
//     },
//     // marginRight: ".4rem",
//   },
// });

const PaymentCSV = ({ orderData, clientData }) => {
  const theme = useTheme();
  const tc = useContext(ThemeContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [currCli, setCurrCli] = useState({});
  const [currLedger, setCurrLedger] = useState([]);
  const [viewLedgerDialog, setViewLedgerDialog] = useState(false);
  const [pl, setPl] = useState({
    totalAmountToPay: 0,
    paid: 0,
  });

  const clear = () => {
    setCurrCli({});
    setCurrLedger([]);
    setPl({
      totalAmountToPay: 0,
      paid: 0,
    });
  };

  const headers = [
    { label: "Order id", key: "orderId" },
    { label: "Payment Date", key: "date" },
    { label: "Payment Time", key: "time" },
    { label: "Payment Method", key: "method" },
    { label: "Description", key: "description" },
    { label: "Amount", key: "amount" },
  ];

  const createLedger = (cli) => {
    let new_curr_ledger = [];
    let orders = orderData?.orders;
    let totalAmountToPay = 0;
    let paid = 0;

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].client.id === cli.id) {
        if (
          orders[i].invoice.totalAmount &&
          orders[i].orderCancel.state === ""
        ) {
          totalAmountToPay =
            parseFloat(totalAmountToPay) +
            parseFloat(orders[i].invoice.totalAmount);
        }

        for (let j = 0; j < orders[i].orderPayment.history.length; j++) {
          new_curr_ledger.push({
            orderId: orders[i].id,
            date: new Date(
              orders[i].orderPayment.history[j].timeStamp
            ).toDateString(),
            time: new Date(
              orders[i].orderPayment.history[j].timeStamp
            ).toTimeString(),
            method: orders[i].orderPayment.history[j].method,
            description: orders[i].orderPayment.history[j].description,
            amount: parseFloat(orders[i].orderPayment.history[j].amount),
          });
          paid = paid + parseFloat(orders[i].orderPayment.history[j].amount);
        }
      }
    }
    // console.log(new_curr_ledger);
    // console.log(totalAmountToPay);
    // console.log(paid);
    setCurrLedger(new_curr_ledger);
    setPl({
      totalAmountToPay,
      paid,
    });
    return { totalAmountToPay, paid };
  };

  // useEffect(() => {
  //   console.log(orderData);
  //   console.log(clientData);
  // }, []);
  return (
    <div>
      {/* <pre>{JSON.stringify(currCli, null, 2)}</pre> */}
      <Dialog
        open={viewLedgerDialog}
        fullWidth={true}
        fullScreen={fullScreen}
        // maxWidth={}
        onClose={(e, r) => {
          if (r === "backdropClick") {
            clear();
            setViewLedgerDialog(false);
          } else {
            clear();
            setViewLedgerDialog(false);
          }
        }}
        // PaperComponent={<PaperC />}
        PaperProps={{
          sx: {
            minHeight: "6rem",
            borderRadius: "1rem",
            background: tc.theme === "light" ? "#ebecf0" : "#232427",
            color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
          },
        }}
        scroll={"body"}
        id={tc.theme}
      >
        <div className="css5Form">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <IconButton
              onClick={() => {
                clear();
                setViewLedgerDialog(false);
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
            className="btn1"
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "30%",
              margin: ".5rem 0",
              fontWeight: "bold",
              fontSize: ".8em",
              padding: ".6em",
            }}
          >
            <BsDownload />

            <CSVLink
              data={currLedger}
              headers={headers}
              filename={`${currCli.companyName}_ledger`}
              target="_blank"
              style={{
                color: "cyan",
                textDecoration: "none",
              }}
            >
              Ledger CSV
            </CSVLink>
          </div>

          <h2>Payment Ledger</h2>
          <div>Client :{currCli.companyName}</div>

          <div
            className="FlexAround"
            style={{
              margin: "1rem 0",
            }}
          >
            <h3>Total : {pl.totalAmountToPay}</h3>
            <h3
              style={{
                color: "cyan",
              }}
            >
              Paid : {pl.paid}
            </h3>
            <h3
              style={{
                color: "rgb(210, 68, 116)",
              }}
            >
              Balance : {pl.totalAmountToPay - pl.paid}
            </h3>
          </div>
          <div className="css9BasicGrid1">
            {currLedger.map((cl) => (
              <div
                style={{
                  border: "1px solid lightgrey",
                  borderRadius: "1rem",
                  padding: "1rem",
                  marginBottom: ".4rem",
                  overflowX: "scroll",
                }}
              >
                <div
                  style={{
                    marginBottom: ".4em",
                  }}
                >
                  <span
                    className="tag"
                    style={{
                      marginRight: ".3rem",
                    }}
                  >
                    OrderID
                  </span>
                  {cl.orderId}
                </div>
                <div
                  style={{
                    marginBottom: ".4em",
                  }}
                >
                  <span
                    className="tag"
                    style={{
                      marginRight: ".3rem",
                    }}
                  >
                    Date
                  </span>
                  {cl.date}
                </div>
                <div
                  style={{
                    marginBottom: ".4em",
                  }}
                >
                  <span
                    className="tag"
                    style={{
                      marginRight: ".3rem",
                    }}
                  >
                    Time
                  </span>
                  {cl.time}
                </div>
                <div
                  style={{
                    marginBottom: ".4em",
                  }}
                >
                  <span
                    className="tag"
                    style={{
                      marginRight: ".3rem",
                    }}
                  >
                    Method
                  </span>
                  {cl.method}
                </div>
                <div
                  style={{
                    marginBottom: ".4em",
                  }}
                >
                  <span
                    className="tag"
                    style={{
                      marginRight: ".3rem",
                    }}
                  >
                    Description
                  </span>
                  {cl.description}
                </div>
                {/* <div>{cl.date}</div>
                <div>{cl.time}</div>
                <div>{cl.method}</div>
                <div>{cl.description}</div> */}
                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {cl.amount}
                </div>

                {/* <pre>{JSON.stringify(cl, null, 2)}</pre> */}
              </div>
            ))}
          </div>
        </div>
      </Dialog>

      {/* <h5>Orders</h5>
      {orderData?.orders.map((pd) => (
        <div>
          <div>{pd.client.companyName}</div>
          <div>{pd.client.id}</div>
        </div>
      ))} */}
      <h2>Clients</h2>
      <div
        style={{
          margin: ".5rem",
          marginBottom: "5rem",
        }}
        className="css9BasicGrid"
      >
        {clientData?.clients.map((cd) => (
          <div className="css1Card">
            <div
              style={{
                marginBottom: "1rem",
              }}
            >
              {cd.companyName}
            </div>
            {/* <div>{cd.id}</div> */}
            <div
              onClick={() => {
                setCurrCli(cd);
                createLedger(cd);
                setViewLedgerDialog(true);
              }}
              className="css1Btn"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MdPayments
                style={{
                  marginRight: ".3rem",
                }}
              />
              <span>Payment Ledger</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentCSV;
