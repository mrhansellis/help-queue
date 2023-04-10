import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

function TicketList(props) {

  const ticketListStyles = {
    backgroundColor: "#F6F6F6",
    fontFamily: "sans-serif",
    paddingTop: "10px",
    textAlign: "center"
  }

  return (
    <React.Fragment>
      <div style={ticketListStyles}>
      <hr />
        {Object.values(props.ticketList).map((ticket) => 
          <Ticket 
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          formattedWaitTime={ticket.formattedWaitTime}
          id={ticket.id}
          key={ticket.id} />
        )}
      </div>
    </React.Fragment>
  )
}

TicketList.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;