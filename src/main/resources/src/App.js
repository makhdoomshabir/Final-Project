import React from 'react';
import './css/App.css';
import Footer from "./Components/Footer";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navigation from "./Components/nav";
import AddSolution from "./Components/tickets/AddSolution";
import {UpdateTicket} from "./Components/tickets/UpdateTicket";
import Welcome from "./Components/Pages/Welcome";
import HomeSoftware from "./Components/Pages/HomeSoftware"
import HomeCloud from "./Components/Pages/HomeCloud"
import HomeDev from "./Components/Pages/HomeDev"
import HomeRPA from "./Components/Pages/HomeRPA"
import QueueSysPage from "./Components/Pages/QueueSysPage"
import AddTicketPage from "./Components/Pages/AddTicketPage";

function App() {
    return (
        <div className="App">
            <Navigation/>
            <Router>
                <Switch>

                    <Route path="/" component={Welcome} exact/>

                    {/* Route to Cohort Specific Ticket Display */}

                    <Route path="/software-development" component={QueueSysPage} exact/>
                    <Route path="/cloud-computing" component={QueueSysPage} exact/>
                    <Route path="/dev-ops" component={QueueSysPage} exact/>
                    <Route path="/robotic-process-automation" component={QueueSysPage} exact/>
                    <Route path="/pega" component={QueueSysPage} exact/>

                    {/*

                Route to Add Tickets, Solutions and Update Tickets

                this needs to go with the individual tickets that are displayed and the add
                ticket needs to go on the navigation bar?

                */}
                    <Route path="/add-ticket" component={AddTicketPage} exact/>
                <Route path="/update-ticket/:id" exact component={AddTicketPage}/>
                <Route path="/add-solutions/:id" component={AddSolution} exact/>

            </Switch>
            </Router>

            <Footer/>
        </div>
    );
}
export default App;
