import React from 'react';
import './css/App.css';
import Footer from "./Components/Footer";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navigation from "./Components/nav";
import AddSolution from "./Components/tickets/AddSolution";
import AddTicket from "./Components/tickets/AddTicket";
import {UpdateTicket} from "./Components/tickets/UpdateTicket";
import Welcome from "./Components/Pages/Welcome";
import HomeSoftware from "./Components/Pages/HomeSoftware"
import HomeCloud from "./Components/Pages/HomeCloud"
import HomeDev from "./Components/Pages/HomeDev"
import HomeRPA from "./Components/Pages/HomeRPA"
import HomePega from "./Components/Pages/HomePega"

function App() {
    return (
        <div className="App">
            <Navigation/>
            <Router>
            <Switch>

                <Route path="/" component={Welcome} exact/>

                {/* Route to Cohort Specific Ticket Display */}

                <Route path="/software-development" component={HomeSoftware} exact/>
                <Route path="/cloud-computing" component={HomeCloud} exact/>
                <Route path="/dev-ops" component={HomeDev} exact/>
                <Route path="/robotic-process-automation" component={HomeRPA} exact/>
                <Route path="/pega" component={HomePega} exact/>

                {/*

                Route to Add Tickets, Solutions and Update Tickets

                this needs to go with the individual tickets that are displayed and the add
                ticket needs to go on the navigation bar?

                */}
                <Route path="/add-ticket" component={AddTicket} exact/>
                <Route path="/update-ticket" component={UpdateTicket} exact/>
                <Route path="/add-solution" component={AddSolution} exact/>

            </Switch>
            </Router>

            <Footer/>
        </div>
    );
}
export default App;
