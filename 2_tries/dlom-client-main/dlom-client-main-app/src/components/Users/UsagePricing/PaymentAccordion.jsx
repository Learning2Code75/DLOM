import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";

const PaymentAccordion = ({ data, tc }) => {
  const [expandedPay, setExpandedPay] = useState(false);

  return (
    <Accordion
      expanded={expandedPay}
      onChange={() => setExpandedPay(!expandedPay)}
      id={tc.theme}
    >
      {" "}
      <AccordionSummary
        expandIcon={
          <MdExpandMore
            style={{
              color: tc.theme === "dark" ? "white" : "black",
            }}
          />
        }
        style={{
          margin: "0",
          height: "1rem",
          padding: "0",
          paddingRight: ".4em",
          borderRadius: ".4em",
        }}
      >
        <div>Purchase History</div>
      </AccordionSummary>
      <AccordionDetails>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {data?.map((pht) => (
            <div
              style={{
                border: "1px solid lightgrey",
                display: "flex",
                flexDirection: "column",
                borderRadius: ".5rem",
                alignItems: "flex-start",
                margin: ".4rem",
                padding: ".5rem",
              }}
            >
              <pre>{JSON.stringify(pht, null, 2)}</pre>
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default PaymentAccordion;
