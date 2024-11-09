import React from "react";
import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, children, width, height }) => {
  return (
    <NavLink
      to={to}
      style={{
        textDecoration: "none",
        color: "black",
        width: `${width}`,
        height: `${height}`,
      }}
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
