import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTrackings } from "../../redux/actions/trackings";

const Tracking = () => {
  const dispatch = useDispatch();
  const trackings = useSelector((state) => state.trackings);
  const dlomclients = useSelector((state) => state.dlomclients);

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
    console.log(cligrps);
    return cligrps;
  };
  useEffect(() => {
    dispatch(getTrackings());
  }, [dispatch]);

  return (
    <>
      <div>Tracking</div>
      <Link to="/">Dashboard</Link>

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

      <div>
        {filterAccToClients().cliTrackings.map((ct) => (
          <div>
            <h3>{ct[0]?.dlom_client?.companyName}</h3>
            <span>d</span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "10px",
                margin: "0 auto",
                maxWidth: "95vw",
                marginBottom: "2rem",
              }}
            >
              {ct.map((c) => (
                <div
                  style={{
                    border: "1px solid lightgrey",
                    padding: ".5rem",
                    borderRadius: ".5rem",
                  }}
                >
                  <pre>{JSON.stringify(c, null, 2)}</pre>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tracking;
