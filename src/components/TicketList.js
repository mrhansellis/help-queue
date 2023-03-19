import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

function TicketList(props) { // Add props as a paramater
  return (
    <React.Fragment>
      <hr />
      {props.ticketList.map((ticket, index) => //Loop throught the list passed down from TicketControl.
      <Ticket names={ticket.names}
        location={ticket.location}
        issue={ticket.issue}
        key={index} />
      )}
    </React.Fragment>
  )
}

TicketList.propTypes = {
  ticketList: PropTypes.array
};

export default TicketList;