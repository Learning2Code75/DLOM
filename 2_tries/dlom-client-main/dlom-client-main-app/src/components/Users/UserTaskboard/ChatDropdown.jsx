import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useContext, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { ThemeContext } from "../../../App";

const ChatDropdown = ({ data, resp }) => {
  const tc = useContext(ThemeContext);
  const [expandedChat, setExpandedChat] = useState(false);

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
            margin: ".4rem 0",
            height: "1rem",
            paddingRight: ".4em",
            borderRadius: ".4em",
          }}
        >
          {resp ? "User Responses" : "Manager Suggestions"}
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {data.map((s) => (
              <div
                style={{
                  border: "1px solid cyan",
                  borderRadius: ".2rem",
                  margin: ".4rem",
                  padding: ".4rem",
                }}
              >
                <div
                  style={{
                    fontWeight: "500",
                  }}
                >
                  {s?.user_data?.name}
                  {resp ? ` (${s?.user_data?.userRole})` : ""}
                </div>
                <div
                  style={{
                    padding: ".4rem 0",
                    color: "cyan",
                  }}
                >
                  {s?.description}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: ".8em",
                    fontWeight: "500",
                  }}
                >
                  <span>
                    {new Date(s?.timestamp).toTimeString().split(" ")[0]}
                  </span>
                  <span>{new Date(s?.timestamp).toDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ChatDropdown;
