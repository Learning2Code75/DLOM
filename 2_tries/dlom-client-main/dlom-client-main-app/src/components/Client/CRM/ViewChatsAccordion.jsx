import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import { BsChatRight } from "react-icons/bs";
import { FiDelete, FiEdit } from "react-icons/fi";
import { MdExpandMore } from "react-icons/md";

const ViewChatsAccordion = ({
  client,
  setOpenDialog,
  settingCurrClient,
  setCurrChat,
  setIsUpdate,
  setDelDialog,
  setDelChatState,
  delChatState,
  deleteItem,
  tc,
}) => {
  const [expandedChat, setExpandedChat] = useState(false);

  return (
    <div>
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
          }}
        >
          <div
            className="FlexBetween"
            style={{
              width: "100%",
              padding: ".4rem",
            }}
          >
            {/* <h5>Chats</h5> */}
            <div
              className="btn1"
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "40%",
                margin: ".5rem 0",
                fontWeight: "bold",
                fontSize: ".8em",
                padding: ".6em",
              }}
              onClick={() => {
                settingCurrClient(client);
                setOpenDialog(true);
              }}
            >
              Add Chat
            </div>
            <div
              className="btn1"
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "40%",
                margin: ".5rem 0",
                fontWeight: "bold",
                fontSize: ".8em",
                padding: ".6em",
              }}
              onClick={() => setExpandedChat(!expandedChat)}
            >
              <BsChatRight />
              <span>Chats</span>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {client.crm.map((c, index) => (
              <div
                style={{
                  border:
                    c.personType === "client"
                      ? "1px solid lightgrey"
                      : "1px solid cyan",

                  display: "flex",
                  flexDirection: "column",
                  borderRadius: ".5rem",
                  alignItems: "flex-start",
                  margin: ".4rem",
                  padding: ".5rem",
                }}
              >
                <div
                  className="FlexBetween"
                  style={{
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      textDecoration: "underline",
                    }}
                  >
                    {c.personType === "client" ? "client:" : "salesperson:"}
                    {c.personType === "client"
                      ? client.contactPersonName
                      : client.salesPersonAssigned}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <FiEdit
                      style={{
                        marginRight: ".5rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setOpenDialog(true);
                        settingCurrClient(client);
                        setCurrChat({
                          time: c.timestamp.split(" ")[1],
                          date: c.timestamp.split(" ")[0],
                          msg: c.msg,
                          type: c.personType,
                          timestamp: c.timestamp,
                          index: index,
                        });
                        setIsUpdate(true);
                      }}
                    />
                    <FiDelete
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setDelDialog(true);
                        setDelChatState({
                          ...delChatState,
                          id: client.id,
                        });
                        deleteItem(client, index);
                      }}
                    />
                  </div>
                </div>

                <h5
                  style={{
                    margin: ".4rem",
                  }}
                >
                  {c.msg}
                </h5>
                <span
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    fontSize: ".7em",
                  }}
                >
                  {c.timestamp}
                </span>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ViewChatsAccordion;