import React from 'react';
import './css/App.css';
import Header from './Components/Header';
import {Navigation} from './Components/nav';
import OpenTickets from './Components/tickets/OpenTicket';
import ResolvedTickets from './Components/tickets/ResolvedTickets';

function App() {
    return (
        <div className="App">
            <Navigation/>
            <Header/>
            <OpenTickets/>
            <ResolvedTickets/>
        </div>
    );
}

export default App;
