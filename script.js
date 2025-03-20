const input = document.querySelector(".addbar input");
const todolist = document.querySelector(".todolist");
const completed = document.querySelector(".itemleft > p:nth-child(2)");
const all= document.querySelector('.statusbar > p:nth-child(1)');
const active= document.querySelector('.statusbar > p:nth-child(2)');
const allcompleted= document.querySelector('.statusbar > p:nth-child(3)');
const item=document.querySelector('.item');
const moon=document.querySelector('.header img');
const body=document.querySelector('body');
const supercontainer=document.querySelector('.supercontainer');

function updateContent() {
  const item_left=document.querySelector('.itemleft');
const status_bar=document.querySelector('.statusbar');
const container= document.querySelector('.container');
const ins= document.querySelector('.ins');
  if (window.innerWidth >= 700) {
    item_left.insertBefore(status_bar, item_left.children[1]);
    console.log(item_left.innerHTML);
  }
  else{
    container.insertBefore(status_bar,ins);
  }
}
updateContent();
window.addEventListener("resize", updateContent);
moon.addEventListener('click',function(){
  if(!body.classList.contains('dark')){
    body.classList.add('dark');
    moon.src='icon-sun.svg';
    // console.log(body);
  }
  else{
    body.classList.remove('dark');
    moon.src='icon-moon.svg';
  }
})
new Sortable(todolist, {
  animation: 150,
  ghostClass: "sortable-ghost",
  filter: ".itemleft", // Prevent itemleft from being draggable
  onMove: function (evt) {
    return !evt.related.classList.contains("itemleft"); // Prevent dragging over itemleft
  }
});
active.addEventListener('click',function(){
  all.classList.remove('blue');
  active.classList.add('blue');
  allcompleted.classList.remove('blue');
  const items=document.querySelectorAll('.item');
  items.forEach(function(item){
    const img=item.querySelector('div');
    if(img.classList.contains('checked')){
      item.style.display="none";
    }
    else
    item.style.display="flex";
  });
})
allcompleted.addEventListener('click',function(){
  all.classList.remove('blue');
  allcompleted.classList.add('blue');
  active.classList.remove('blue');
  const items=document.querySelectorAll('.item');
  items.forEach(function(item){
    const img=item.querySelector('div');
    if(!img.classList.contains('checked')){
      item.style.display="none";
    }
    else
    item.style.display="flex";
  });
})
all.addEventListener('click',function(){
  active.classList.remove('blue');
  all.classList.add('blue');
  allcompleted.classList.remove('blue');
  const items=document.querySelectorAll('.item');
  items.forEach(function(item){
    item.style.display="flex";
  });
})
todolist.addEventListener("click", function (e) {
  if (e.target.closest(".item") && e.target.classList.contains("cross")) {
    const item = e.target.closest(".item");
    item.remove();
    const itemleft = document.querySelector(".itemleft > p:nth-child(1)");
    let num = parseInt(itemleft.innerHTML.split(" ")[0]);
    num--;
    itemleft.innerHTML = `${num} items left`;
  }
});
todolist.addEventListener("click", function (e) {
  if (
    e.target.closest(".item") &&
    !e.target.classList.contains('cross')
    // (e.target.tagName === "P" || e.target.classList.contains("check"))
  ) {
    const item = e.target.closest(".item");
    const line = item.querySelector("p");
    const check = item.querySelector(".check");
    const img= item.querySelector(".check img")
    if( !body.classList.contains('dark')){
    if (check.classList.contains("checked")) {
      check.classList.remove("checked");
      img.src="";
      line.style.textDecoration = "";
      // line.style.color = "hsl(235, 19%, 35%)";
      // console.log('yes');
    } else {
      check.classList.add("checked");
      img.src="icon-check.svg";
      line.style.textDecoration = "line-through";
      // line.style.color = "hsl(233, 11%, 84%)";
      // console.log('no');
    }
  }
  if(body.classList.contains('dark')){
    if (check.classList.contains("checked")) {
      check.classList.remove("checked");
      img.src="";
      line.style.textDecoration = "";
      // line.style.color = "hsl(233, 11%, 84%)";
      // console.log('yes');
    } else {
      check.classList.add("checked");
      img.src="icon-check.svg";
      line.style.textDecoration = "line-through";
      // line.style.color = "hsl(235, 19%, 35%)";
      // console.log('no');
    }
  }
}
});
completed.addEventListener("click", function () {
  const checked = todolist.querySelectorAll(".checked");
  const itemleft = document.querySelector(".itemleft > p:nth-child(1)");
  let num = parseInt(itemleft.innerHTML.split(" ")[0]);
  // console.log(num);
  if (checked.length > 0) {
    checked.forEach((e) => {
      const item = e.closest(".item");
      item.remove();
      num--;
    });
    // console.log(num);
    itemleft.innerHTML = `${num} items left`;
  }
});
input.addEventListener("keydown", function (e) {
  const value = input.value;
  // console.log(value);
  const item = document.createElement("div");
  item.classList.add("item");
  item.setAttribute('draggable','true');
  item.innerHTML = `
     <div class="check"><img class="tick" src="" alt=""></div>
    <p>${value}</p>
    <img class="cross" src="icon-cross.svg" alt="">
  </div>
     `;
  if (e.key === "Enter" && value != "") {
    const checkitems = todolist.querySelectorAll(".check");
    const itemleft = document.querySelector(".itemleft > p:nth-child(1)");
    const check = checkitems.length + 1;
    todolist.insertBefore(item, todolist.firstChild);
    // console.log(item);
    itemleft.innerHTML = `${check} items left`;
    input.value = "";
  }
});
