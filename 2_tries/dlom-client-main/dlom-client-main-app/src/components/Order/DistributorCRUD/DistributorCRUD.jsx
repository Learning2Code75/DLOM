import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_DISTRIBUTOR_DETAILS } from "../../../queries/distributorQueries";
import { UPDATE_DISTRIBUTOR_DETAILS } from "../../../mutations/dlomDistributorMutations";

import DistributorSocialMediaInput from "./DistributorSocialMediaInput";
import DistributorSocialMediaInputNew from "./DistributorSocialMediaInputNew";
import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { TiArrowLeftThick } from "react-icons/ti";
import { useContext } from "react";
import { ThemeContext } from "../../../App";
import { GrClose } from "react-icons/gr";

const DistributorCRUD = () => {
  const { loading, error, data } = useQuery(GET_DISTRIBUTOR_DETAILS);
  const theme = useTheme();
  const tc = useContext(ThemeContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDialog, setOpenDialog] = useState(false);
  const [state, setState] = useState({
    companyName: "",
    address: "",
    gst: "",
    phoneNumber: "",
    accountNumber: "",
    bankIfsc: "",
    socialMedia: [{ title: "", link: "" }],
  });
  const clear = () => {
    setState({
      companyName: "",
      address: "",
      gst: "",
      phoneNumber: "",
      accountNumber: "",
      bankIfsc: "",
      socialMedia: [{ title: "", link: "" }],
    });
  };
  const [updateDistributor] = useMutation(UPDATE_DISTRIBUTOR_DETAILS, {
    variables: {
      id: state.id,
      companyName: state.companyName,
      address: state.address,
      gst: state.gst,
      phoneNumber: state.phoneNumber,
      accountNumber: state.accountNumber,
      bankIfsc: state.bankIfsc,
      socialMedia: state.socialMedia,
    },
    onCompleted: () => clear(),
    refetchQueries: [
      { query: GET_DISTRIBUTOR_DETAILS, variables: { id: state.id } },
    ],
  });

  const updateDistributorOnSubmit = (e) => {
    e.preventDefault();

    updateDistributor(
      state.id,
      state.companyName,
      state.address,
      state.gst,
      state.phoneNumber,
      state.accountNumber,
      state.bankIfsc,
      state.socialMedia
    );

    setOpenDialog(false);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to="/orders"
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
        <h2>Orders</h2>
      </div>
      {/* <h1>Distributor CRUD</h1> */}
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      <Dialog
        open={openDialog}
        fullWidth={true}
        fullScreen={fullScreen}
        // maxWidth={}
        onClose={(e, r) => {
          if (r === "backdropClick") {
            clear();
            setOpenDialog(!openDialog);
          } else {
            clear();
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
            <h2>Update Distributor</h2>
            <IconButton
              onClick={() => {
                clear();
                setOpenDialog(!openDialog);
              }}
              style={{
                background: tc.theme === "dark" ? "lightgrey" : "transparent",
                padding: ".25rem",
              }}
            >
              <GrClose />
            </IconButton>
          </div>

          <div className="formLabel">Company Name</div>
          <input
            type="text"
            value={state.companyName}
            onChange={(e) =>
              setState({ ...state, companyName: e.target.value })
            }
            id="companyName"
            className="formControl"
          />
          <div className="formLabel">Address</div>
          <input
            type="text"
            value={state.address}
            onChange={(e) => setState({ ...state, address: e.target.value })}
            id="address"
            className="formControl"
          />
          <div className="formLabel">GST</div>
          <input
            type="text"
            value={state.gst}
            onChange={(e) => setState({ ...state, gst: e.target.value })}
            id="gst"
            className="formControl"
          />
          <div className="formLabel">Phone Number</div>
          <input
            type="number"
            value={state.phoneNumber}
            onChange={(e) =>
              setState({ ...state, phoneNumber: e.target.value })
            }
            id="phoneNumber"
            className="formControl"
          />
          <div className="formLabel">Account Number</div>
          <input
            type="number"
            value={state.accountNumber}
            onChange={(e) =>
              setState({ ...state, accountNumber: e.target.value })
            }
            id="accountNumber"
            className="formControl"
          />
          <div className="formLabel">Bank IFSC Number</div>
          <input
            type="text"
            value={state.bankIfsc}
            onChange={(e) => setState({ ...state, bankIfsc: e.target.value })}
            id="bankIfsc"
            className="formControl"
          />

          <div className="formLabel">
            Social media
            <button
              className="btn1"
              style={{
                width: "10%",
                marginLeft: "0",
                fontSize: "1.3em",
                padding: ".6rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                let new_state = { ...state };
                new_state.socialMedia.push({ title: "", link: "" });
                setState(new_state);
              }}
            >
              +
            </button>
          </div>
          {state.socialMedia.map((sm, index) => (
            <>
              {/* <pre>{JSON.stringify(sm, null, 2)}</pre> */}
              {/* <DistributorSocialMediaInput
              state={state}
              setState={setState}
              index={index}
              sm={sm}
            /> */}
              <DistributorSocialMediaInputNew
                state={state}
                setState={setState}
                index={index}
              />
            </>
          ))}

          <div>
            <div className="btn2" onClick={(e) => updateDistributorOnSubmit(e)}>
              Update Distributor Details
            </div>
          </div>
        </form>
      </Dialog>
      <div>
        <h2>Distributor Details</h2>
        {!loading && !error && (
          <div>
            {data.distributor.map((d) => (
              <div className="css1Card">
                <div
                  className="css1Btn"
                  onClick={() => {
                    setState({
                      ...state,
                      id: d.id,
                      companyName: d.companyName,
                      address: d.address,
                      gst: d.gst,
                      phoneNumber: d.phoneNumber,
                      accountNumber: d.accountNumber,
                      bankIfsc: d.bankIfsc,
                      socialMedia: d.socialMedia.map((sm) => ({
                        title: sm.title,
                        link: sm.link,
                      })),
                    });
                    setOpenDialog(true);
                  }}
                >
                  Edit
                </div>
                <div className="css1ContentBx">
                  <div className="css9BasicGrid1">
                    <div className="tag">Company Name</div>
                    <div className="info">{d.companyName}</div>
                    <div className="tag">Address</div>
                    <div className="info">{d.address}</div>
                    <div className="tag">GST</div>
                    <div className="info">{d.gst}</div>
                    <div className="tag">Phone Number</div>
                    <div className="info">{d.phoneNumber}</div>
                    <div className="tag">Account Number</div>
                    <div className="info">{d.accountNumber}</div>
                    <div className="tag">Bank IFSC</div>
                    <div className="info">{d.bankIfsc}</div>

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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributorCRUD;
