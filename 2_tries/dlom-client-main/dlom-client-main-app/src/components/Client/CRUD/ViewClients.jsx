import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../../queries/dlomClientQueries";
import Spinner from "../../Spinner";
import { DELETE_CLIENT } from "../../../mutations/dlomClientMutation";
import { useSelector } from "react-redux";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";
// import { GET_CLIENTS } from "../../../queries/clientsQueries";

const ViewClients = ({
  setOpenDialog,
  currClient,
  setCurrClient,
  setUpdate,
  clearCurrClient,
}) => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const user = useSelector((state) => state?.auth?.authData?.result);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [delDialog, setDelDialog] = useState(false);
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {
      id: currClient.id,
    },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    console.log(error);
    return <p>Something went wrong...</p>;
  }
  const settingCurrClient = (client) => {
    let new_csm = [...client.clientSocialMedia];
    new_csm = new_csm.map((nc) => ({ title: nc.title, link: nc.link }));

    setCurrClient({
      ...client,
      clientSocialMedia: new_csm,
    });
  };
  return (
    <>
      <div className="dialogs">
        <Dialog
          open={delDialog}
          fullWidth={true}
          // maxWidth={}
          onClose={(e, r) => {
            if (r === "backdropClick") {
              clearCurrClient();
              setDelDialog(!delDialog);
            } else {
              clearCurrClient();
              setDelDialog(!delDialog);
            }
          }}
          // PaperComponent={}
          PaperProps={{ sx: { minHeight: "8rem", borderRadius: "1rem" } }}
          scroll={"body"}
        >
          Delete the client?
          <button
            onClick={() => {
              deleteClient();
              setDelDialog(false);
              clearCurrClient();
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setDelDialog(false);
              clearCurrClient();
            }}
          >
            Cancel
          </button>
        </Dialog>
      </div>
      {!loading && !error && (
        <div
          style={{
            margin: "1rem",
          }}
        >
          {data.clients.map((client) => (
            <div
              style={{
                border: "1px solid lightgrey",
                borderRadius: "1rem",
                marginBottom: "1rem",
              }}
              key={client.id}
            >
              {(user?.userRole === "manager" ||
                user?.userRole === "root" ||
                user?.userRole === "salesperson" ||
                user?.userRole === "finance") && (
                <div>
                  <button
                    className="btn"
                    onClick={() => {
                      setUpdate(true);
                      settingCurrClient(client);
                      setOpenDialog(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      settingCurrClient(client);
                      setDelDialog(true);
                      // deleteClient();
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
              {/* 
              {
  "__typename": "DlomClient",
  "id": "6319cf896dfda39aa7147307",
  "companyName": "Company3331",
  "contactPersonName": "cp1",
  "address": "addr1",
  "gst": "gst1",
  "phoneNumber": "phno1",
  "discountRate": "5",
  "salesPersonAssigned": "sp1",
  "clientSocialMedia": [
    {
      "__typename": "SocialMediaItem",
      "title": "gmail",
      "link": "company1@gmail.com"
    },
    {
      "__typename": "SocialMediaItem",
      "title": "linkedin",
      "link": "company1.linkedin.com"
    }
  ],
  "typeOfCustomer": "permanent"
}
              
              */}
              <div>
                <div>{client.companyName}</div>
                <div>{client.contactPersonName}</div>
                <div>{client.address}</div>
                <div>{client.gst}</div>
                <div>{client.phoneNumber}</div>
                <div>{client.discountRate}</div>
                <div>{client.salesPersonAssigned}</div>
                <div>{client.typeOfCustomer}</div>
                {client.clientSocialMedia.map((cs) => (
                  <div>
                    <h3>{cs.title}</h3>
                    <p>{cs.link}</p>
                  </div>
                ))}
              </div>
              {/* <pre>{JSON.stringify(client, null, 2)}</pre> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ViewClients;
