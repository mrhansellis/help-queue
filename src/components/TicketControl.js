import React from 'react';
import NewTicketForm from './NewTicketForm';
//import QuestionOne from './QuestionOne';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as a from "./../actions";
import { formatDistanceToNow } from "date-fns";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q1VisibleOnPage: false,
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      1000
    );
  }

  componentDidUpdate() {
    console.log("component updated!");
  }

  componentWillUnmount() {
    console.log("Component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.mainTicketList).forEach(ticket => {
      const newFormattedWaitTime = formatDistanceToNow(ticket.timeOpen, {
        addSuffix: true
      });
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    })
  }


  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: "ADD_TICKET",
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = a.addTicket(newTicket);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

    const ticketListStyles = {
      backgroundColor: "#F6F6F6",
      fontFamily: "sans-serif",
      paddingTop: "10px",
      textAlign: "center"
    }

    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm 
                              ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
      } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail 
                              ticket = {this.state.selectedTicket}
                              onClickingDelete = {this.handleDeletingTicket}
                              onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        <div style={ticketListStyles}>
          {currentlyVisibleState}
          <button onClick={this.handleClick}>{buttonText}</button>
        </div>
      </ React.Fragment>
    );
  }
}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;