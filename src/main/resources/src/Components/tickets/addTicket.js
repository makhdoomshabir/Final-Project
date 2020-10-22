/*
THIS IS THE CREATE TICKETS SECTION
 */

function createTicket() {


    let elements = document.getElementById("ticketForm").elements;
    let obj = {};
    for (let i = 0; i < elements.length - 1; i++) {
        let item = elements.item(i);
        obj[item.name] = item.value;
    }

    let links = document.getElementById("link").links;
    let objLinks = {};
    for (let link = 0; link < links.length - 1; link++) {
        let itemLink = links.item(link);
        objLinks[itemLink.name] = itemLink.value;
    }

    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/createTicket");
    req.onload = () => {
        if (req.status === 200 && req.readyState === 4) {
            console.log("Server Responded with: " + req.responseText);
        } else {
            console.log("Oops..." + req.response);
        }
    };
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify({
        ticketDate: Date.now(),
        status: "Unresolved",
        title: obj.title,
        author: obj.author,
        cohort: obj.cohort,
        description: obj.description,
        lastUpdated: Date.now()
    }));
}
