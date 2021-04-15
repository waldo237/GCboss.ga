import React from "react";
import { UserInterface } from "../interfaces/interfaces";
import { ColorFactory } from "../requestFunctions/util";


const  color = ColorFactory.getInstance().getColor();

const Avatar = (props: { size: number; user: UserInterface }) => {

  const { size, user } = props;
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    margin: "2px 15px 0px 5px",
    alightSelft: "center",
    justifySelft: "center",
    backgroundColor: "white",
    borderRadius: "50%",
  };
  const photoStyle = {
    width: `${size - 1}px`,
    height: `${size - 1}px`,
    borderRadius: "50%",
    backgroundPosition: "cover",
  };
  const initialsStyle = {
    width: `${size - 1}px`,
    height: `${size - 1}px`,
    borderRadius: "50%",

    backgroundColor: `${color}`,
    color: "var(--light)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const initialsH1Style = {
    justifySelft: "center",
    textShadow: "var(--text-shadow)",
    fontSize: `${size / 2.5}px`,
  };
  return (
    <>
      {user&& user.permissionId ? (
        <div className="avatar btn" style={avatarStyle}>
          {user.photoLink ? (
            <img style={photoStyle} src={user.photoLink} alt="your avatar" />
          ) : (
            <div style={initialsStyle}>
              <h1 style={initialsH1Style}>
                {user &&  user.displayName.split("")[0] }
                &nbsp;
              </h1>
            </div>
          )}
        </div>
      ) : (
       null
      )}
    </>
  );
};

export default Avatar;
