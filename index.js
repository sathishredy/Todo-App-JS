const newList = document.querySelector(".new-list");
const newTask = document.querySelector(".new-task");
const homeUi = document.querySelector(".home-ui");
const uiTrip = document.querySelector(".ui-trip");
var dataarr = [];
var iid;
var tid;
function addList() {
  newList.style.display = "inline-block";
  homeUi.style.filter = "blur(8px)";
  newList.style.transitionDuration = "1s";
  newList.style.transform = "translateY(-50px)";
  document.querySelector(".add").style.cursor = "default";
}
function addTask(a) {
  newTask.style.display = "inline-block";
  homeUi.style.filter = "blur(8px)";
  document.querySelector(".add").style.cursor = "default";
  iid = a.parentNode.parentNode;
}
function closeListBtn() {
  newList.style.display = "none";
  homeUi.style.filter = "initial";
  document.querySelector(".add").style.cursor = "pointer";
}
function closeTaskBtn() {
  newTask.style.display = "none";
  homeUi.style.filter = "initial";
  document.querySelector(".add").style.cursor = "pointer";
}
function addListBtn() {
  document.querySelector("#wel").style.display = "none";
  if (document.querySelector("#newlist").value == "") {
    alert("Please enter a name");
    return;
  }
  let id = Date.now();
  dataarr.push({
    id: id,
    title: document.querySelector("#newlist").value,
    tasks: [],
  });

  let cardContainer = document.querySelector(".cards-container");
  let card = document.createElement("div");
  card.setAttribute("class", "cards");
  card.setAttribute("id", id);
  card.innerHTML = `<p class="task-title" onclick = "uitrip(this)">${
    document.querySelector("#newlist").value
  }</p>
          <hr class="line" />
          <div class="item-container"></div>
          <div id="item-controls">
            <i class="fa fa-trash-o" style="font-size: 30px" onclick="removeCard(this)"></i>
            <div class="add-new-item" onclick="addTask(this)">
              <div class="circle"></div>
              <div class="plus">
                <div class="ver"></div>
                <div class="hor"></div>
              </div>
            </div>
          </div>`;
  cardContainer.append(card);
  document.querySelector("#newlist").value = "";
  newList.style.display = "none";
  homeUi.style.filter = "initial";
  document.querySelector(".add").style.cursor = "pointer";
  mainUi();
  console.log(dataarr);
}
function removeCard(a) {
  const rid = a.parentNode.parentNode;
  rid.remove();
  for (let i = 0; i < dataarr.length; i++) {
    if (dataarr[i].id == a.parentNode.parentNode.id) {
      dataarr.splice(i, 1);
    }
  }
  if (dataarr.length == 0) {
    document.querySelector("#wel").style.display = "inline-block";
  }
  mainUi();
  console.log(dataarr);
}

function addTaskBtn() {
  if (document.querySelector("#newtask").value == "") {
    alert("Please enter a name");
    return;
  }
  let id = Date.now();
  const itemCont = document.getElementById(iid["id"]).children[2];
  let task = document.createElement("div");
  task.setAttribute("class", "item");
  task.setAttribute("id", id);
  task.innerHTML = `${document.querySelector("#newtask").value}
                <button class="done-btn" onclick="markdone(this)">
                  mark done
                </button>`;
  for (let i of dataarr) {
    if (i.id == iid.id) {
      i["tasks"].push({
        id: id,
        task: document.querySelector("#newtask").value,
      });
    }
  }
  itemCont.append(task);
  document.querySelector("#newtask").value = "";
  newTask.style.display = "none";
  homeUi.style.filter = "initial";
  document.querySelector(".add").style.cursor = "pointer";
  console.log(dataarr);
}
function markdone(a) {
  console.log(a.parentNode.id);
  document.getElementById(a.parentNode.id).style.textDecoration =
    "line-through";
  document.getElementById(a.parentNode.id).children[0].style.display = "none";
  document.getElementById(a.parentNode.id).style.color = "red";
  a.parentNode.style.textDecoration = "line-through";
  a.parentNode.children[0].style.display = "none";
  a.parentNode.style.color = "red";
}
function uitrip(a) {
  tid = a;
  console.log(a.parentNode);
  document.querySelector(".trip-name").innerText = a.innerText;
  document.querySelector(".left-title").style.display = "none";
  document.querySelector(".trip-head").style.display = "initial";
  document
    .querySelectorAll(".cards")
    .forEach((a) => (a.style.display = "none"));
  a.parentNode.children[0].style.display = "none";
  a.parentNode.children[1].style.display = "none";
  document.getElementById(a.parentNode.id).style.display = "initial";
  document.getElementById(a.parentNode.id).style.position = "absolute";
  document.getElementById(a.parentNode.id).style.left = "420px";
}
function mainUi() {
  document.querySelector(".left-title").style.display = "initial";
  document.querySelector(".trip-head").style.display = "none";
  document
    .querySelectorAll(".cards")
    .forEach((a) => (a.style.display = "initial"));
  document
    .querySelectorAll(".cards")
    .forEach((a) => (a.style.position = "static"));
  tid.parentNode.children[0].style.display = "flex";
  tid.parentNode.children[1].style.display = "block";
}
