function editMemo(event) {
  console.log(event.target.dataset.id);
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo_ul");
  const li = document.createElement("li");
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;
  li.innerText = `[id:${memo.id}] ${memo.content}`;
  ul.appendChild(li);
  li.appendChild(editBtn);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo_ul");
  ul.innerHTML = "";
  //jsonRes = [{id:123,content:'blah blah'}]
  //["A","B","c"].forEach(func); A에 대해 func실행 ,B에 대해 func실행...
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });

  const jsonRes = await res.json();
  console.log(jsonRes);
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
readMemo();
