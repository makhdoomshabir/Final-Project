import React from 'react';

const NavigationBar = () => {

  return (
    <nav className="navbar navbar-expand-sm">
        <a
            className="nav-brand"
            href="http://www.qa.com"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img alt="logo" src="https://i.imgur.com/smguoM3.png" width="100"/>
        </a>
        <button type="submit">Cohort</button>
        <form>
        <input type="text"/>
        <button type="submit">Search</button>
    </form>
    
    <button type="submit">New Ticket</button>
    </nav>
  );
};

export default NavigationBar;