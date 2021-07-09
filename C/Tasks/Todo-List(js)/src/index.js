// import './style/iconfont.css'; // 无效，为什么?
import './style/index.less';

// 添加新的todo

// check-box 与 Clear completed
const stati = document.getElementById("stati");
const toggle = document.getElementsByClassName("toggle");
let toggleArr = [...toggle];  // 类数组转化为数组，便于使用splice方法
const clearBtn = document.getElementById("clear");
let unchosenNum = toggleArr.length;
const arrow = document.getElementById("arrow");

function changeNum(num) {
  if (num > 1) {
    stati.innerText = `${num} items left`;
  }
  else {
    stati.innerText = `${num} item left`;
  }
}

for (let i = 0; i < toggleArr.length; i++) {
  toggle[i].onclick = () => {
    if (toggle[i].parentNode.className === "item") {
      toggle[i].parentNode.className = "item completed";
      unchosenNum--;
    }
    else {
      toggle[i].parentNode.className = "item";
      unchosenNum++;
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
}

// ×号删除
const deleteBtn = document.getElementsByClassName("delete-btn");

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].onclick = () => {
    if (toggle[i].checked === false) {
      changeNum(--unchosenNum);
    }
    deleteBtn[i].parentNode.className = "item deleted";
    toggleArr.splice(i - toggleArr.length + toggleArr.length, 1); // 删掉该元素，注意每删一个元素toggleArr.length都会减1
    console.log(toggleArr);
  }
}

// 正选与反选

arrow.onclick = () => {
  if (arrow.className === "") {
    arrow.className = "selected";
    for (let i = 0; i < toggleArr.length; i++) {
      toggleArr[i].checked = true;
      toggleArr[i].parentNode.className = "item completed";
      clearBtn.className = "appear";
      unchosenNum = 0; // 此时全被选了
      changeNum(0);
    }
  }
  else {
    arrow.className = "";
    for (let i = 0; i < toggleArr.length; i++) {
      toggleArr[i].checked = false;
      toggleArr[i].parentNode.className = "item";
      clearBtn.className = "";
      unchosenNum = toggleArr.length; // 此时全没被选
      changeNum(unchosenNum);
    }
  }
}

// 下方按钮的选择
const footerBtn = document.getElementsByClassName("btn");

for (let i = 0; i < footerBtn.length; i++) {
  footerBtn[i].onclick = () => {
    for (let j = 0; j < footerBtn.length; j++) {
      footerBtn[j].className = "btn";
    }
    footerBtn[i].className = "btn selected";
  }
}