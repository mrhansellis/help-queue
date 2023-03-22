import React from 'react';
import NewTicketForm from './NewTicketForm';
//import QuestionOne from './QuestionOne';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      q1VisibleOnPage: false,
      mainTicketList: [],
      selectedTicket: null,
      editing: false
    };
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = this.state.mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
      mainTicketList: editedMainTicketList,
      editing: false,
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({mainTicketList: newMainTicketList,
                  formVisibleOnPage: false });
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
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
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

export default TicketControl;