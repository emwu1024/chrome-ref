let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

if (getLeads() != null) {
  myLeads = getLeads();
  updateLeads();
  render(myLeads);
}

inputBtn.addEventListener("click", function () {
  if (inputEl.value === "") {
    alert("Enter a lead first");
  } else {
    myLeads.push(inputEl.value);
    updateLeads();
  }
  render(myLeads);
  inputEl.value = "";
});

saveBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    updateLeads();
    render(myLeads);
  });
});

clearBtn.addEventListener("dblclick", function () {
  myLeads = [];
  localStorage.clear();
  render(myLeads);
});

function render(leads) {
  ulEl.innerHTML = "";
  for (let i = 0; i < leads.length; i++) {
    const newA = document.createElement("a");
    newA.href = leads[i];
    console.log(newA);
    newA.innerHTML = `<li> ${leads[i]} </li>`;
    newA.target = "_blank";
    ulEl.append(newA);
  }
}

function updateLeads() {
  localStorage.setItem("leads", JSON.stringify(myLeads));
}

function getLeads() {
  return JSON.parse(localStorage.getItem("leads"));
}

function renderThis(a) {
  for (i = 0; i < a.length; i++) {
    console.log(a[i]);
  }
}
