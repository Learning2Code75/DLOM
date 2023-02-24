import { useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
import { getTrackings } from "../../redux/actions/trackings";
import { TiArrowLeftThick } from "react-icons/ti";
import TrackingAccordion from "./TrackingAccordion";

const Tracking = () => {
  const dispatch = useDispatch();
  const trackings = useSelector((state) => state.trackings);
  const dlomclients = useSelector((state) => state.dlomclients);

  const tc = useContext(ThemeContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const filterAccToClients = () => {
    // console.log(trackings, dlomclients);
    let cligrps = { cliIds: [], cliTrackings: [] };
    for (let i = 0; i < dlomclients.length; i++) {
      cligrps.cliIds.push(dlomclients[i]._id);
      cligrps.cliTrackings.push([]);
    }
    for (let i = 0; i < cligrps.cliIds.length; i++) {
      for (let j = 0; j < trackings.length; j++) {
        if (cligrps.cliIds[i] === trackings[j].dlom_client._id) {
          cligrps.cliTrackings[i].push(trackings[j]);
        }
      }
    }
    // console.log(cligrps);
    return cligrps;
  };
  useEffect(() => {
    dispatch(getTrackings());
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
      {/* <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "10px",
          margin: "0 auto",
          maxWidth: "95vw",
          marginBottom: "2rem",
        }}
      >
        {trackings.map((t) => (
          <div
            style={{
              border: "1px solid lightgrey",
              padding: ".5rem",
              borderRadius: ".5rem",
            }}
          >
            <pre>{JSON.stringify(t, null, 2)}</pre>
          </div>
        ))}
      </div> */}
      <h2>Trackings</h2>
      <div>
        {filterAccToClients().cliTrackings.map((ct) => (
          <div>
            <TrackingAccordion ct={ct} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Tracking;
