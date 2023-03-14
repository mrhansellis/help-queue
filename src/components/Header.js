import React from "react";
import ticketMan from "./../img/ticketman.png"

function Header(){
  return (
  <React.Fragment>
    <h1>Help Queue</h1>
    <img src={ticketMan} alt="An image of a stressed out man managing a mess of paper tickets" />
  </React.Fragment>
  );
}

export default Header;