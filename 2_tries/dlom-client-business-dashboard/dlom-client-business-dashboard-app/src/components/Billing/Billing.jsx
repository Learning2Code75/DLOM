import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
import { getBillings, updateBilling } from "../../redux/actions/billings";
import BillPrint from "./BillPrint";
import PaymentCSV from "./PaymentCSV";
import PaymentInput from "./PaymentInput";
import PaymentRecPrint from "./PaymentRecPrint";
import { TiArrowLeftThick } from "react-icons/ti";
import BillingAccordion from "./BillingAccordion";
import { GrClose } from "react-icons/gr";

const Billing = () => {
  const dispatch = useDispatch();

  const billings = useSelector((state) => state.billings);
  const dlomclients = useSelector((state) => state.dlomclients);
  //   const [billMeta, setBillMeta] = useState([]);
  const tc = useContext(ThemeContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDialog, setOpenDialog] = useState(false);

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

  useEffect(() => {
    dispatch(getBillings());
  }, [dispatch]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          className="openStylesButton1"
          style={{
            marginRight: "1rem",
            borderRadius: ".64rem",
            padding: ".6rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: tc.theme === "light" ? "#232427" : "#ebecf0",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h2>Dashboard</h2>
      </div>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      <Dialog
        open={openDialog}
        fullWidth={true}
        fullScreen={fullScreen}
        // maxWidth={}
        onClose={(e, r) => {
          if (r === "backdropClick") {
            clearState();
            setOpenDialog(!openDialog);
          } else {
            clearState();
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
        <form className="css5Form">
          <div className="FlexBetween">
            <h3>Update Payment</h3>
            <IconButton
              onClick={() => {
                setOpenDialog(false);
                clearState();
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
            className="btn1"
            style={{
              width: "10%",
              marginLeft: "0",
              fontSize: "1.3em",
              padding: ".6rem",
            }}
          >
            +
          </div>
          <div>
            {state?.payments?.map((p, idx) => (
              <PaymentInput p={p} idx={idx} bill={state} setBill={setState} />
            ))}
            <div
              onClick={() => {
                // console.log(state);
                dispatch(updateBilling(state._id, state));
                dispatch(getBillings());
                clearState();
                setOpenDialog(false);
              }}
              className="btn2"
            >
              Update Payments
            </div>
          </div>
        </form>
      </Dialog>
      <div>
        <h3> All billing entries</h3>
        <div>
          {dlomclients.map((dc) => (
            <div>
              <BillingAccordion
                setState={setState}
                dc={dc}
                billings={billings}
                setOpenDialog={setOpenDialog}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Billing;
