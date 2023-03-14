import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import TicketControl from "./TicketControl";

function App(){
  return (
    <React.Fragment>
      <Header />
      <TicketControl />
      <Footer />
    </React.Fragment>
  );
}

export default App;