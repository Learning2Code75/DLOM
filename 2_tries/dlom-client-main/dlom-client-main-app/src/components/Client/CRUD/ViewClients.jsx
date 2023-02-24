import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../../queries/dlomClientQueries";
import Spinner from "../../Spinner";
import { DELETE_CLIENT } from "../../../mutations/dlomClientMutation";
import { useSelector } from "react-redux";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import { ThemeContext } from "../../../App";
// import { GET_CLIENTS } from "../../../queries/clientsQueries";

const ViewClients = ({
  setOpenDialog,
  currClient,
  setCurrClient,
  setUpdate,
  clearCurrClient,
}) => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const tc = useContext(ThemeContext);
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
          <div
            className="css5Form "
            style={{
              padding: "1rem",
            }}
          >
            <h6
              style={{
                textAlign: "center",
                fontSize: "1rem",
                marginBottom: ".5rem",
              }}
            >
              Delete the client?
            </h6>

            <div className="FlexAround">
              <div
                onClick={() => {
                  deleteClient();
                  setDelDialog(false);
                  clearCurrClient();
                }}
                className="btn3"
                style={{
                  fontSize: ".6rem",
                  padding: ".6rem .4rem",
                  margin: "0",
                  width: "30%",
                }}
              >
                Delete
              </div>
              <div
                onClick={() => {
                  setDelDialog(false);
                  clearCurrClient();
                }}
                className="btn1"
                style={{
                  fontSize: ".6rem",
                  padding: ".6rem .4rem",
                  margin: "0",
                  width: "30%",
                }}
              >
                Cancel
              </div>
            </div>
          </div>
        </Dialog>
      </div>
      {!loading && !error && (
        <div
          style={{
            margin: ".5rem",
            marginBottom: "5rem",
          }}
          className="css9BasicGrid"
        >
          {data.clients.map((client) => (
            <div className="css1Card" key={client.id}>
              {(user?.userRole === "manager" ||
                user?.userRole === "root" ||
                user?.userRole === "salesperson" ||
                user?.userRole === "finance") && (
                <div className="FlexBetween">
                  <div
                    className="css1Btn"
                    onClick={() => {
                      setUpdate(true);
                      settingCurrClient(client);
                      setOpenDialog(true);
                    }}
                  >
                    Edit
                  </div>
                  <div
                    className="css1Btn"
                    onClick={() => {
                      settingCurrClient(client);
                      setDelDialog(true);
                      // deleteClient();
                    }}
                  >
                    Delete
                  </div>
                </div>
              )}

              <div className="css1ContentBx">
                <h2>{client.companyName}</h2>
                <div className="css9BasicGrid1">
                  <div className="tag">Contact Person</div>
                  <div className="info">{client.contactPersonName}</div>
                  <div className="tag">Address</div>
                  <div className="info">{client.address}</div>

                  <div className="tag">GST</div>
                  <div className="info">{client.gst}</div>

                  <div className="tag">Phone</div>
                  <div className="info">{client.phoneNumber}</div>

                  <div className="tag">Discount Rate</div>
                  <div className="info">{client.discountRate}</div>

                  <div className="tag">Salesperson Assigned</div>
                  <div className="info">{client.salesPersonAssigned}</div>

                  <div className="tag">Type of Customer</div>
                  <div className="info">{client.typeOfCustomer}</div>
                </div>
                <div className="tag">Social Media</div>
                {client.clientSocialMedia.map((cs) => (
                  <div className="info">
                    <h3>{cs.title}</h3>
                    <a
                      style={{
                        color: "cyan",
                      }}
                      href={cs.link}
                      target="__blank"
                    >
                      {cs.link}
                    </a>
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
