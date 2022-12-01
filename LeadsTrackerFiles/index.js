let myLeads = []
let inputEl = document.getElementById("input_el")
let inputBtn = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))  //get the value from the localStorage and store in a varible.// console.log(leadsFromLocalStorage)

const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {    //Check if leads from local storage is truthy, if so set myLeads to the value and call renderLeads().
myLeads = leadsFromLocalStorage
render(myLeads)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    });
})


function render(leads){ //Refactor so that it takes a parameter 'leads', instead of the global variable 'myLeads' variable.
    let listItem = ""  //create a variable, assign it to an empty string to hold all the HTML list Items
    for (let e = 0; e < leads.length; e++) {
        listItem += `<li>
                    <a href='${leads[e]}' target='_blank'>${leads[e]}</a>
                </li>`  //add item to listItem variable instead of ulEl.innerHTML
    }
    ulEl.innerHTML = listItem  //render the list item inside the unordered list using ulEl.innerHTML
}


deleteBtn.addEventListener("dblclick", function() {
    
    localStorage.clear()
    myLeads = []
    render(myLeads)
    
})


inputBtn.addEventListener("click", function() {   //A professional way of creating an onclick for a function() 
    myLeads.push(inputEl.value)
    inputEl.value = " "
    localStorage.setItem("myLeads", JSON.stringify(myLeads))   //save the myLeads array to localStorage
    render(myLeads)
})


