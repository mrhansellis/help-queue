import React from "react";
import PropTypes from "prop-types";

function Ticket(props){

  const ticketStyles = {
    width: 300,
    height: 100,
    boxSizing: "border-box",
    backgroundColor: "#F6F6F6",
    fontFamily: "sans-serif",
    paddingTop: "10px",
    textAlign: "center",
    margin: "auto"
  }
  
  return (
    <React.Fragment>
      <div style={ticketStyles} onClick = {() => props.whenTicketClicked(props.id)}>
        <h3>{props.location} - {props.names}</h3>
        <p><em>{props.issue}</em></p>
        <hr />
      </div>
    </React.Fragment>
  );
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  id: PropTypes.string,
  whenTicketClicked: PropTypes.func
};

export default Ticket;