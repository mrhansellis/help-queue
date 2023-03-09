import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import TicketList from "./TicketList";

function App(){
  return (
    <React.Fragment>
      <Header />
      <TicketList />
      <Footer />
    </React.Fragment>
  );
}

export default App;