import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../../queries/dlomClientQueries";
import Spinner from "../../Spinner";
// import { GET_CLIENTS } from "../../../queries/clientsQueries";

const ViewClients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    console.log(error);
    return <p>Something went wrong...</p>;
  }
  return (
    <>
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
            >
              <div>
                <button>Edit</button>
                <button>Delete</button>
              </div>
              <pre>{JSON.stringify(client, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ViewClients;
