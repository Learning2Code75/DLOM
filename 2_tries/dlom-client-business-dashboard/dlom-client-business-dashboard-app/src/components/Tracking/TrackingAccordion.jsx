import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useContext, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { ThemeContext } from "../../App";

const TrackingAccordion = ({ ct }) => {
  const [expandedChat, setExpandedChat] = useState(false);
  const tc = useContext(ThemeContext);
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
          <h3>{ct[0]?.dlom_client?.companyName}</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              margin: ".5rem",
              marginBottom: "5rem",
            }}
            className="css9BasicGrid"
          >
            {ct.map((c) => (
              <div className="css1Card">
                <div className="tag">Operation</div>
                <div className="info">{c.operation_type}</div>
                {/* <pre>{JSON.stringify(c, null, 2)}</pre> */}
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      {/* <span>d</span> */}
    </>
  );
};

export default TrackingAccordion;
