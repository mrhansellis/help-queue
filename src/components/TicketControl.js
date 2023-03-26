import React from 'react';
import NewTicketForm from './NewTicketForm';
//import QuestionOne from './QuestionOne';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from "react-redux";
import PropTypes from "prop-types";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      q1VisibleOnPage: false,
      selectedTicket: null,
      editing: false
    };
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
    const action = {
      type: "DELETE_TICKET",
      id: id
    }
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
    const { id, names, location, issue } = newTicket;
    const action = {
      type: "ADD_TICKET",
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({formVisibleOnPage: false});
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
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
    } else if (this.state.formVisibleOnPage) {
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
  mainTicketList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    mainTicketList: state
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;