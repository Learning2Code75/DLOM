import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../redux/actions/users";

const ViewUsers = ({
  setIsUpdate,
  setState,
  currUser,
  setCurrUser,
  setOpenDialog,
}) => {
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
          margin: ".5rem",
          marginBottom: "5rem",
        }}
        className="css9BasicGrid"
      >
        {users?.map((u) => (
          <div className="css1Card" key={u._id}>
            <div className="FlexBetween">
              <div
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
                  setOpenDialog(true);
                }}
                className="css1Btn"
              >
                Edit
              </div>
              <div onClick={(e) => delUser(e, u._id)} className="css1Btn">
                Delete
              </div>
            </div>

            <div className="css1ContentBx">
              <div className="css9BasicGrid1">
                <div className="tag">Name</div>
                <div className="info">{u.name}</div>
                <div className="tag">Email</div>
                <div className="info">{u.email}</div>
                <div className="tag">Role</div>
                <div className="info">{u.userRole}</div>
              </div>
            </div>

            {/* <pre>{JSON.stringify(u, null, 2)}</pre> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewUsers;
