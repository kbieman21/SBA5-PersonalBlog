//const posts = [];
let posts = JSON.parse(localStorage.getItem("allPosts")) || [];

//get the element DOM
const postForm = document.getElementById("post-form");
const inputTitle = document.getElementById("input-title");
const inputContent = document.getElementById("input-content");
//const blogPost = document.getElementById('blog-posts');
const postList = document.querySelector(".postLists");

const titleError = document.getElementById("title-error");
const contentError = document.getElementById("content-error");

//declare variables to help with editing
let isInEditMode = false;
let postIsBeingEdited = null;

postForm.addEventListener("submit", function (event) {
  //stop submission till everything is correct
  event.preventDefault();

  const userInputTitle = inputTitle.value.trim();
  const userInputContent = inputContent.value.trim();

  //Validation check on the input fields
  inputTitle.reportValidity();

  // Basic validation
  if (userInputTitle === "" || userInputContent === "") {
    alert("Please fill in both fields.");
    return;
  }

  // check if we are editing
  if (isInEditMode && postIsBeingEdited) {
    //it means there is an existing post we are updating
    const h3 = postIsBeingEdited.querySelector("h3");
    const p = postIsBeingEdited.querySelector("p");

    h3.textContent = userInputTitle;
    p.textContent = userInputContent;

    // Reset form and state
    postForm.querySelector('button[type="submit"]').textContent = "Submit";
    isInEditMode = false;
    postIsBeingEdited = null;
  } else {
    console.log(isInEditMode);
    // 🆕 Create new post object
    const newPost = {
      title: userInputTitle,
      content: userInputContent,
    };
    posts.push(newPost); // Optional: keep track of all posts

    // store to localstorage
    localStorage.setItem("allPosts", JSON.stringify(posts));

    // Render the new post directly
      li = document.createElement("li");
      li.innerHTML = `
        <h3>${newPost.title}</h3>
        <p>${newPost.content}</p>
    `;

    const editButn = document.createElement("button");
    editButn.textContent = "Edit";
    editButn.classList.add("edit");
    li.appendChild(editButn);

    //create the remove button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete"); //adding a class remove ( THIS IS A CSS CLASS)
    li.appendChild(deleteBtn);

    postList.appendChild(li);

    deleteBtn.addEventListener("click", function () {
      li.remove();
    });

    editButn.addEventListener("click", function (event) {
      inputTitle.value = newPost.title;
      inputContent.value = newPost.content;
      postForm.querySelector('button[type="submit"]').textContent = "Update";
      isInEditMode = true;
      postIsBeingEdited = li;
    });
  }

  // Clear the form
  // inputTitle.value = '';
  // inputContent.value = '';
  console.log(userInputTitle);
});

//listen the input event and validate
inputTitle.addEventListener("input", function (event) {
  if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity("Title is required.");
  } else {
    inputTitle.setCustomValidity("");
  }
  titleError.textContent = inputTitle.validationMessage;
});

inputContent.addEventListener("input", function (event) {
  if (inputContent.validity.valueMissing) {
    inputContent.setCustomValidity("Content is required.");
  } else {
    inputContent.setCustomValidity("");
  }
  contentError.textContent = inputContent.validationMessage;
});
