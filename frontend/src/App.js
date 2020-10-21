import React from 'react';
import './App.css';
import Header from './Components/Header';
import {Navigation} from './Components/nav';
// import OpenTickets from '../../src/main/resources/static/js/tickets/OpenTicket';
// import ResolvedTickets from '../../src/main/resources/static/js/tickets/ResolvedTickets';


function App() {
    return (
        <div className="App">
            <Navigation/>
            <Header/>
            {/*<OpenTickets/>*/}
            {/*<ResolvedTickets/>*/}
        </div>
    );
}

export default App;
