import React from "react";
/*
THIS IS THE UPDATE PRODUCT SECTION
 */
export const UpdateTicket = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticket = urlParams.get('id');
    const reqGet = new XMLHttpRequest();
    reqGet.open("GET", "http://localhost:8080/getProductById/" + ticket);
    reqGet.onload = () => {
        if (reqGet.status === 200 && reqGet.readyState === 4) {
            // this loops through the given query
            let product = JSON.parse(reqGet.response);
            // populate the fields
            document.getElementById("title").setAttribute("placeholder", product.title);
            document.getElementById("price").setAttribute("placeholder", product.price);
            document.getElementById("stock").setAttribute("placeholder", product.stock);
            document.getElementById("description").setAttribute("placeholder", product.description);
            let updateB = document.getElementById("submit");
            updateB.setAttribute("class", "button");
            updateB.addEventListener("click", function () {
                updatePushProduct(product.id);
            });
        } else {
            console.log("Oh no... handle error");
        }
    }; // append all products
    reqGet.send();
}

/*
THIS COVERS THE UPDATE PUSH NEW PRODUCT VALUESx
 */
export const updatePushProduct = (id) => {
    console.log("id received = " + id);
    let elements = document.getElementById("updateForm").elements;
    let obj = {};
    for (let i = 0; i < elements.length - 1; i++) {
        let item = elements.item(i);
        console.log(item.value);
        if (item.name === "image") {
            obj[item.name] = item.value;
            console.log("from if : " + obj[item.name]);
        } else if (item.value === "") {
            obj[item.name] = item.getAttribute("placeholder").valueOf();
            console.log("from else if : " + obj[item.name]);
        } else {
            obj[item.name] = item.value;
            console.log("from else : " + obj[item.name]);
        }
    }
    const req = new XMLHttpRequest();
    req.open("PUT", "http://localhost:8080/updateProduct/" + id);
    req.onload = () => {
        if (req.status === 200 && req.readyState === 4) {
            console.log("Server Responded with: " + req.responseText);
        } else {
            console.log("Oops...");
        }
    };
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify({
        title: obj.title,
        image: obj.image,
        description: obj.description,
        price: obj.price,
        stock: obj.stock
    }));
}