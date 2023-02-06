import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../redux/actions/users";

const ViewUsers = ({ setIsUpdate, setState, currUser, setCurrUser }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const delUser = (e, id) => {
    e.preventDefault();
    // console.log(id);
    dispatch(deleteUser(id));
  };
  return (
    <>
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
        {users?.map((u) => (
          <div
            style={{
              border: "1px solid lightgrey",
              padding: ".3rem",
              borderRadius: ".3rem",
              overflowY: "scroll",
            }}
            key={u._id}
          >
            <pre>{JSON.stringify(u, null, 2)}</pre>
            <div>
              <button
                onClick={() => {
                  setCurrUser(u);
                  setIsUpdate(true);
                  let new_state = {};
                  new_state._id = u?._id;
                  new_state.firstName = u?.name.split(" ")[0];
                  new_state.lastName = u?.name.split(" ")[1];
                  new_state.email = u?.email;
                  new_state.userRole = u?.userRole;
                  new_state.password = "";
                  new_state.cpassword = "";

                  setState(new_state);
                }}
              >
                Edit
              </button>
              <button onClick={(e) => delUser(e, u._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewUsers;
