import './style/index.less';

const stati = document.getElementById("stati");                  // 统计数字
let toggle = document.getElementsByClassName("toggle");          // checkbox
const arrow = document.getElementById("arrow");                  // 全选/反选 尖括号
let deleteBtn = document.getElementsByClassName("delete-btn");   // ×号
const footerBtn = document.getElementsByClassName("btn");        // 下方的三个按钮
const input = document.getElementById("input");                  // 输入框
const main = document.getElementById("main");

const showAllBtn = document.getElementById("show-all-btn");
const showActiveBtn = document.getElementById("show-active-btn");
const showCompletedBtn = document.getElementById("show-completed-btn");
const clearBtn = document.getElementById("clear");               // 右下角的Clear

let toggleArr = [...toggle];  // 类数组转化为数组，便于使用splice方法(代码修改后，toggleArr已没有存在价值)
let unchosenNum = toggleArr.length;
let isAll = true;             // 判断当前是否处于show all状态下 
let isCompletedMode = false;  // 判断当前是否处于show completed状态下

function changeNum(num) {
  // 改变数字的事件
  if (num > 1) {
    stati.innerText = `${num} items left`;
  }
  else {
    stati.innerText = `${num} item left`;
  }
}

function toggleClick() {
  // checkbox的单击事件
  if (isAll) {
    if (this.parentNode.className === "item") {
      this.parentNode.className = "item completed";
      unchosenNum--;
    }
    else {
      this.parentNode.className = "item";
      unchosenNum++;
    }
  }
  else if (isCompletedMode) {
    this.parentNode.className = "item hidden";
    unchosenNum++;
  }
  else if (!isCompletedMode) {
    this.parentNode.className = "item hidden completed";
    unchosenNum--;
  }
  changeNum(unchosenNum);

  if (toggleArr.length - unchosenNum > 0) {
    clearBtn.className = "appear";
  }
  else {
    clearBtn.className = "";
  }
  if (unchosenNum === 0) {
    arrow.className = "selected";
  }
  else {
    arrow.className = "";
  }
}

function deleteClick(i) {
  // x号单击删除事件
  if (!toggleArr[i].checked) {
    changeNum(--unchosenNum);
  }
  // 有了toggleArr保存dom元素，而我们不修改toggleArr的长度，无需担心dom数组长度改变问题
  if (!toggleArr[i].deleted) {
    main.removeChild(toggleArr[i].parentNode);  
    toggleArr[i].deleted = true;
  }
}

function arrowClick() {
  // 正反选事件
  // 此处略冗长，可优化(懒)
  if (isAll) {
    if (arrow.className === "") {
      arrow.className = "selected";
      if(document.getElementsByClassName("toggle").length > 0) {
        clearBtn.className = "appear";
      }
      unchosenNum = 0; // 此时全被选了
      changeNum(0);
      for (let i = 0; i < toggleArr.length; i++) {
        toggleArr[i].checked = true;
        toggleArr[i].parentNode.className = "item completed";
      }
    }
    else {
      arrow.className = "";
      clearBtn.className = "";
      unchosenNum = document.getElementsByClassName("toggle").length; // 此时全没被选
      changeNum(unchosenNum);
      for (let i = 0; i < toggleArr.length; i++) {
        toggleArr[i].checked = false;
        toggleArr[i].parentNode.className = "item";
      }
    }
  }
  else if (isCompletedMode) {
    if (arrow.className === "") {
      arrow.className = "selected";
      if(document.getElementsByClassName("toggle").length > 0) {
        clearBtn.className = "appear";
      }
      unchosenNum = 0;
      changeNum(0);
      for (let i = 0; i < toggleArr.length; i++) {
        toggleArr[i].checked = true;
        toggleArr[i].parentNode.className = "item completed";
      }
    }
    else {
      arrow.className = "";
      clearBtn.className = "";
      unchosenNum = document.getElementsByClassName("toggle").length; // 此时全没被选
      changeNum(unchosenNum);
      for (let i = 0; i < toggleArr.length; i++) {
        toggleArr[i].checked = false;
        toggleArr[i].parentNode.className = "item hidden";
      }
    }
  }
  else if (!isCompletedMode) {
    if (arrow.className === "") {
      arrow.className = "selected";
      if(document.getElementsByClassName("toggle").length > 0) {
        clearBtn.className = "appear";
      }
      unchosenNum = 0;
      changeNum(0);
      for (let i = 0; i < toggleArr.length; i++) {
        toggleArr[i].checked = true;
        toggleArr[i].parentNode.className = "item completed hidden";
      }
    }
    else {
      arrow.className = "";
      clearBtn.className = "";
      unchosenNum = document.getElementsByClassName("toggle").length; // 此时全没被选
      changeNum(unchosenNum);
      for (let i = 0; i < toggleArr.length; i++) {
        toggleArr[i].checked = false;
        toggleArr[i].parentNode.className = "item";
      }
    }
  }
}

function insertItem(event) {
  // 加入新的Todo
  if (event.keyCode == 13) {  // 按下回车触发事件
    let newItem = document.createElement("li");
    newItem.className = "item";

    newItem.innerHTML = `
        <input type="checkbox" class="toggle">
          <span contenteditable="true">${input.value}</span>
        <div class="delete-btn">×</div>`

    if (isCompletedMode) {
      newItem.className = "item hidden";
    }
    main.insertBefore(newItem, main.childNodes[0]);
    input.value = "";
    unchosenNum++;
    toggleArr.push(newItem.getElementsByClassName("toggle")[0]); 
    // 新元素不应该插入在数组开始处，而应该插入在结尾处，否则影响i的对应关系
    changeNum(unchosenNum);
    toggle = document.getElementsByClassName("toggle");
    deleteBtn = document.getElementsByClassName("delete-btn");

    for (let i = 0; i < toggleArr.length; i++) {
      toggleArr[i].parentNode.index = i;
      // console.log(toggleArr[i].parentNode.index);
    }
    bindEvent();
  }
}

function btnChosen() {
  // 下方按钮的选择
  for (let j = 0; j < footerBtn.length; j++) {
    footerBtn[j].className = "btn";
  }
  this.className = "btn selected";
}

function showAll() {
  // 显示所有项
  isAll = true;
  isCompletedMode = false;
  for (let i = 0; i < toggleArr.length; i++) {
    if (toggleArr[i].checked) {
      toggleArr[i].parentNode.className = "item completed";
    }
    else {
      toggleArr[i].parentNode.className = "item";
    }
  }
}

function showActive() {
  // 只显示未完成项
  isAll = false;
  isCompletedMode = false;
  for (let i = 0; i < toggleArr.length; i++) {
    if (toggleArr[i].checked) {
      toggleArr[i].parentNode.className = "item hidden";
    }
    else {
      toggleArr[i].parentNode.className = "item";
    }
  }
}

function showCompleted() {
  // 只显示已完成项
  isAll = false;
  isCompletedMode = true;
  for (let i = 0; i < toggleArr.length; i++) {
    if (!toggleArr[i].checked) {
      toggleArr[i].parentNode.className = "item hidden";
    }
    else {
      toggleArr[i].parentNode.className = "item completed";
    }
  }
}

function clearCompleted() {
  // 清空已完成项
  arrow.className = "";

  for (let i = 0; i < toggleArr.length; i++) {
    if (!toggleArr[i].deleted) {
      // 仅在该元素未被删除时，对其进行删除
      if (toggleArr[i].checked) {
        main.removeChild(toggleArr[i].parentNode);
        toggleArr[i].deleted = true;
      }
    }
  }
}

function bindEvent() {
  // 上方所有事件的绑定
  for (let i = 0; i < document.getElementsByClassName("toggle").length; i++) {
    toggle[i].onclick = toggleClick.bind(toggle[i]);          // 不能让函数立即执行，更改this指向
  }

  for (let i = 0; i < document.getElementsByClassName("toggle").length; i++) {
    deleteBtn[i].onclick = deleteClick.bind(deleteBtn[i], deleteBtn[i].parentNode.index);
  }

  for (let i = 0; i < footerBtn.length; i++) {
    footerBtn[i].addEventListener("click", btnChosen.bind(footerBtn[i]));
  }

  arrow.onclick = arrowClick;
  input.onkeyup = insertItem;

  // footer按钮同时绑定了2个事件，故不能用onclick而应使用addEventListener
  showAllBtn.addEventListener("click", showAll);
  showActiveBtn.addEventListener("click", showActive);
  showCompletedBtn.addEventListener("click", showCompleted);
  clearBtn.addEventListener("click", clearCompleted);
}

bindEvent();
