import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_DISTRIBUTOR_DETAILS } from "../../../queries/distributorQueries";
import { UPDATE_DISTRIBUTOR_DETAILS } from "../../../mutations/dlomDistributorMutations";

import DistributorSocialMediaInput from "./DistributorSocialMediaInput";

const DistributorCRUD = () => {
  const { loading, error, data } = useQuery(GET_DISTRIBUTOR_DETAILS);

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
  };
  return (
    <div>
      <h1>Distributor CRUD</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <form>
        <div className="formLabel">Company Name</div>
        <input
          type="text"
          value={state.companyName}
          onChange={(e) => setState({ ...state, companyName: e.target.value })}
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
          onChange={(e) => setState({ ...state, phoneNumber: e.target.value })}
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
            className="btn"
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
            <DistributorSocialMediaInput
              state={state}
              setState={setState}
              index={index}
              sm={sm}
            />
          </>
        ))}

        <div>
          <button onClick={(e) => updateDistributorOnSubmit(e)}>
            Update Distributor Details
          </button>
        </div>
      </form>
      <div>
        <h1>Distributor Details</h1>
        {!loading && !error && (
          <div>
            {data.distributor.map((d) => (
              <div>
                <button
                  className="btn"
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
                  }}
                >
                  Edit
                </button>
                <div>
                  <div>{d.companyName}</div>
                  <div>{d.address}</div>
                  <div>{d.gst}</div>
                  <div>{d.phoneNumber}</div>
                  <div>{d.accountNumber}</div>
                  <div>{d.bankIfsc}</div>
                  <div>
                    {d.socialMedia.map((sm) => (
                      <div>
                        <h4>{sm.title}</h4>
                        <p>{sm.link}</p>
                      </div>
                    ))}
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
