import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBillings, updateBilling } from "../../redux/actions/billings";
import BillPrint from "./BillPrint";
import PaymentCSV from "./PaymentCSV";
import PaymentInput from "./PaymentInput";
import PaymentRecPrint from "./PaymentRecPrint";

const Billing = () => {
  const dispatch = useDispatch();

  const billings = useSelector((state) => state.billings);
  const dlomclients = useSelector((state) => state.dlomclients);
  //   const [billMeta, setBillMeta] = useState([]);
  const [state, setState] = useState({
    dlom_client: {},
    subscription: {},
    timestamp: "",
    payments: [],
  });
  const clearState = () => {
    setState({
      dlom_client: {},
      subscription: {},
      timestamp: "",
      payments: [],
    });
  };
  const findBillMeta = (dc) => {
    let bill_meta = [];
    let new_ledger = [];
    let tot_amt = 0;
    let tot_paid = 0;
    for (let i = 0; i < billings.length; i++) {
      if (billings[i].dlom_client._id === dc._id) {
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

  const findBInvMeta = (b) => {
    let inv_meta = {};
    let taxPercent = 9;
    let tot_amt = parseFloat(b.subscription.cost);
    let tax_amt = (tot_amt * 9) / 100;
    let after_tax_amt = tax_amt + tot_amt;
    inv_meta = {
      totAmt: tot_amt,
      taxPercent,
      taxAmount: tax_amt,
      afterTaxAmount: after_tax_amt,
    };

    return inv_meta;
  };
  useEffect(() => {
    dispatch(getBillings());
  }, [dispatch]);
  return (
    <>
      <div>Billing</div>
      <Link to="/">Dashboard</Link>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      {state._id !== undefined && (
        <div>
          <h3>Update Payment</h3>
          <button
            onClick={() => {
              let new_state = { ...state };
              new_state.payments.push({
                amount: "",
                description: "",
                mode: "",
                timestamp: new Date().toISOString(),
              });
              setState(new_state);
            }}
          >
            Add Entry
          </button>
          <div>
            {state?.payments?.map((p, idx) => (
              <PaymentInput p={p} idx={idx} bill={state} setBill={setState} />
            ))}
            <button
              onClick={() => {
                dispatch(updateBilling(state._id, state));
                dispatch(getBillings());
                clearState();
              }}
            >
              Update Payments
            </button>
          </div>
        </div>
      )}
      <div>
        <h3> All billing entries</h3>
        <div>
          {dlomclients.map((dc) => (
            <div>
              <div>
                <h3>{dc.companyName}</h3>
                <PaymentCSV clientData={dc} billingData={billings} />

                {/*ordervalue,total amount paid, due*/}
                <div>
                  {findBillMeta(dc)?.map((bm) => (
                    <div>
                      <pre>{JSON.stringify(bm, null, 2)}</pre>
                    </div>
                  ))}
                  {/* <button
                    onClick={() => {
                      findBillMeta(dc);
                    }}
                  >
                    Client Overall data
                  </button> */}
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "10px",
                  margin: "0 auto",
                  maxWidth: "95vw",
                  marginBottom: "2rem",
                }}
              >
                {billings
                  .filter((b) => b.dlom_client._id === dc._id)
                  .map((b) => (
                    <div
                      style={{
                        border: "1px solid lightgrey",
                        padding: ".5rem",
                        borderRadius: ".5rem",
                      }}
                    >
                      <pre>{JSON.stringify(b, null, 2)}</pre>
                      <div>
                        <button onClick={() => setState(b)}>
                          Edit Payment(Add,Delete)
                        </button>

                        <button>Invoice pdf</button>
                        <BillPrint data={b} bInvMeta={findBInvMeta(b)} />
                        <PaymentRecPrint data={b} bMeta={findPMeta(b)} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Billing;
