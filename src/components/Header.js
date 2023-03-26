import React from "react";
import ticketMan from "./../img/ticketman.png"

function Header(){
  
  const headerStyles = {
    backgroundColor: "#F6F6F6",
    fontFamily: "Bookman, URW Bookman L, serif",
    paddingTop: "10px",
    textAlign: "center"
  }
  
  return (
  <React.Fragment>
    <div style={headerStyles}>
      <h1>Help Queue</h1>
      <img src={ticketMan} alt="a stressed out man managing a mess of paper tickets" width="250" />
    </div>
  </React.Fragment>
  );
}

export default Header;