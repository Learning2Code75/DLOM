import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import numWords from "num-words";
import React, { useState } from "react";
import { useContext } from "react";
import { MdExpandMore } from "react-icons/md";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../App";
import BillPrint from "./BillPrint";
import PaymentCSV from "./PaymentCSV";
import PaymentRecPrint from "./PaymentRecPrint";

const BillingAccordion = ({ dc, setState, setOpenDialog }) => {
  const billings = useSelector((state) => state.billings);
  const [expandedChat, setExpandedChat] = useState(false);
  const tc = useContext(ThemeContext);
  const findBillMeta = (dc) => {
    let bill_meta = [];
    let new_ledger = [];
    let tot_amt = 0;
    let tot_paid = 0;
    for (let i = 0; i < billings.length; i++) {
      if (billings[i]?.dlom_client?._id === dc._id) {
        tot_amt = tot_amt + parseFloat(billings[i].subscription.cost);
        for (let j = 0; j < billings[i].payments.length; j++) {
          tot_paid = tot_paid + parseFloat(billings[i].payments[j].amount);
          new_ledger.push({
            amount: billings[i].payments[j].amount,
          });
        }
      }
    }
    let bal = tot_amt - tot_paid;
    bill_meta.push({
      name: "bill value",
      value: tot_amt,
    });
    bill_meta.push({
      name: "paid",
      value: tot_paid,
    });
    bill_meta.push({
      name: "balance",
      value: bal,
    });
    // console.log(bill_meta);
    // setBillMeta(bill_meta);
    return bill_meta;
  };

  const findPMeta = (b) => {
    let p_meta = [];
    let tot_amt = 0;
    for (let i = 0; i < b.payments.length; i++) {
      tot_amt = tot_amt + parseFloat(b.payments[i].amount);
    }
    p_meta.push({
      name: "total paid",
      value: tot_amt,
    });

    return p_meta;
  };

  const calcNumWords = (a) => {
    let amt = "";
    let r_a = a.toFixed();
    amt = numWords(r_a) + " only";
    return amt;
  };
  const findBInvMeta = (b) => {
    let inv_meta = {};
    let taxPercent = 9;
    let tot_amt = parseFloat(b.subscription.cost);
    let tax_amt = (tot_amt * 9) / 100;
    let after_tax_amt = tax_amt + tot_amt;

    let after_tax_tot_amt_in_words = calcNumWords(after_tax_amt);
    let tax_amt_in_words = calcNumWords(tax_amt);

    inv_meta = {
      totAmt: tot_amt,
      taxPercent,
      taxAmount: tax_amt,
      afterTaxAmount: after_tax_amt,
      afterTaxAmountInWords: after_tax_tot_amt_in_words,
      taxAmountInWords: tax_amt_in_words,
    };

    return inv_meta;
  };

  return (
    <>
      <Accordion
        expanded={expandedChat}
        onChange={() => setExpandedChat(!expandedChat)}
        id={tc.theme}
      >
        <AccordionSummary
          expandIcon={
            <MdExpandMore
              style={{
                color: tc.theme === "dark" ? "white" : "black",
              }}
            />
          }
          style={{
            // padding: ".4rem",
            margin: "0",
            height: "1rem",
            padding: "0",
            paddingRight: ".4em",
            borderRadius: ".4em",
            borderBottom: "1px solid lightgrey",
            padding: ".4em",
          }}
        >
          <h3>{dc.companyName}</h3>

          {/*ordervalue,total amount paid, due*/}
          <div>
            {/* <button
              onClick={() => {
                findBillMeta(dc);
              }}
            >
              Client Overall data
            </button> */}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <PaymentCSV clientData={dc} billingData={billings} />

          <div
            style={{
              margin: ".5rem",
              marginBottom: "1.5rem",
            }}
            className="css9BasicGrid"
          >
            {findBillMeta(dc)?.map((bm) => (
              <div className="css1Card">
                {" "}
                <div className="css1ContentBx">
                  <div className="css9BasicGrid1">
                    <div className="tag">{bm.name}</div>
                    <div
                      className="info"
                      style={{
                        color: `${
                          bm.name === "paid"
                            ? "cyan"
                            : bm.name === "balance"
                            ? "#f00"
                            : "white"
                        }`,
                      }}
                    >
                      ₹{bm.value}
                    </div>
                  </div>
                </div>
                {/* <pre>{JSON.stringify(bm, null, 2)}</pre>{" "} */}
              </div>
            ))}
          </div>
          <div
            style={{
              margin: ".5rem",
              marginBottom: "5rem",
            }}
            className="css9BasicGrid"
          >
            {billings
              .filter((b) => b?.dlom_client?._id === dc._id)
              .map((b) => (
                <div className="css1Card">
                  <div>
                    <div
                      onClick={() => {
                        setState(b);
                        setOpenDialog(true);
                      }}
                      className="btn1"
                    >
                      Edit Payment
                    </div>

                    <BillPrint data={b} bInvMeta={findBInvMeta(b)} />
                    <PaymentRecPrint data={b} bMeta={findPMeta(b)} />
                  </div>
                  <div className="css1ContentBx">
                    <div className="css9BasicGrid1">
                      <div className="tag">Subscription</div>
                      <div className="info">
                        <div>{b.subscription.name}</div>
                        <div>{b.subscription.description}</div>
                      </div>

                      <div className="tag">Timestamp</div>
                      <div className="info">
                        <div>{new Date(b.timestamp).toDateString()}</div>
                        <div>{new Date(b.timestamp).toTimeString()}</div>
                      </div>

                      <div className="tag">Payments</div>
                      <div
                        className="info"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          Total
                          <div>₹{b.subscription.cost}</div>
                        </div>
                        <div
                          style={{
                            color: "cyan",
                          }}
                        >
                          Paid
                          <div>₹{findPMeta(b)[0].value}</div>
                        </div>

                        <div
                          style={{
                            color: "#f00",
                          }}
                        >
                          Balance
                          <div>
                            ₹{b.subscription.cost - findPMeta(b)[0].value}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <pre>{JSON.stringify(b, null, 2)}</pre> */}
                </div>
              ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default BillingAccordion;
