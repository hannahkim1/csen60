// Tags
const searchTags = [];

// Individual elements
let parentElement = null;
const tagLists = Array.from(document.querySelectorAll("article .tags"));

// Search Functions
  /* The function takes in newParentElement and checks if it is null, then it will return an error on the 
  console and will return the function. parentElement is assigned to newParentElement
  and passes the tag to the addSearchTerm function.
  */
function initializeSearch(newParentElement) {
  const params = new URLSearchParams(window.location.search);
  if (newParentElement === null) {
    console.error(
      "Cannot insert tags, parent element is null",
      params.getAll("tag")
    );
    return;
  }

  parentElement = newParentElement;
  for (const tag of params.getAll("tag")) {
    addSearchTerm(tag);
  }
}

/* The hideArticles() function checks if the tag has no characters (which means
its empty), then will show all articles and return the function. Then it searches
for each tag in the searchTags array, and will add the articles with the correct
tag to the articlesWithTags array. Then, if the article is not found in the 
articlesWithTags function, then it will be hidden, if it is found, it will be shown.
*/
function hideArticles() {
  if (searchTags.length === 0) {
    for (const article of document.querySelectorAll("article")) {
      article.classList.remove("hidden");
    }
    return;
  }

  const articlesWithTags = [];
  for (const tag of searchTags) {
    articlesWithTags.push(...findArticlesWithTag(tag));
  }

  /**
   * use querySelectorAll to select all articles
   * iterate over them in a for loop
   * check if articlesWithTags array does not include the current article being iterated over,
   * then add "hidden" to that article's classList
   * else, remove "hidden" from that article's classList
   */

  for (const article of document.querySelectorAll("article")) {
    if (!articlesWithTags.includes(article)) {
      article.classList.add("hidden");
    }
    else {
      article.classList.remove("hidden");
    }
  }
}

/**
 * Creates a clickable tag button for a given search term (text). When clicked,
 * the button will remove the corresponding tag from both the DOM and the searchTags array.
 * This function also calls hideArticles to update the articles displayed after removal.
 */
function createTag(text) {
  /**
   * create a new element called button
   * add the class "tag" to its classList
   * set the button's textContent property to text (the passed in argument)
   */
  const button = document.createElement("button");
  button.classList.add("tag");
  button.textContent = text;

/* The remove function calls itself for the button element. If the text matches with
the searchTags, then it calls the hideArticles function. When the button is clicked,
it calls itself to remove the button, then returns the button.
*/
  function remove() {
    button.remove();
    const index = searchTags.indexOf(text);
    if (index !== -1) {
      searchTags.splice(index, 1);
    }

    hideArticles();
  }

  /**
   * add a click event listener to the button, and set the listener to the remove function.
   * return the button element 
   */
  button.addEventListener("click", remove);
  return button;
}

/* The findArticlesWithTag function basically checks whether the phrase in both lowercase
and uppercase is found within the articles array. If it is, then it adds the tag list
parent element to the articles array. The function returns articles.
*/
function findArticlesWithTag(phrase) {
  const articles = [];
  const sanitizedPhrase = phrase.toLowerCase().trim();
  for (const tl of tagLists) {
    const tags = Array.from(tl.querySelectorAll("li"));
    for (const tag of tags) {
      if (tag.textContent.toLowerCase().trim() === sanitizedPhrase) {
        articles.push(tl.parentElement);
        break;
      }
    }
  }

  return articles;
}

/* The addSearchTerm function takes the text from the createTag and adds it onto
the parentElement. Then the text input is added to the searchTags, and calls
hideArticles function.
*/
function addSearchTerm(text) {
  parentElement.appendChild(createTag(text));
  searchTags.push(text);
  hideArticles();
}

// Handlers
/* The onSearch function checks whether the Enter key was pushed, and if it was
then will set the input value to an empty string to reset the search
*/
function onSearch(event) {
  const input = event.currentTarget;
  /**
   * If event.key equals "Enter":
   * call addSearchTerm and pass the input element's value
   * set input value to an empty string
   */
  if (event.key == "Enter") {
    addSearchTerm(input.value);
    input.value = "";
  } 

}

// Main function

function main() {
  initializeSearch(document.querySelector("#searched-tags"));

  document
    .querySelector("input[type=search]")
    .addEventListener("keypress", onSearch);
}

// Execute main function
main();

/**
 * Order of execution for each event (in order): initializeSearch -> onSearch -> createTag -> hideArticles -> addSearchTerm -> onSearch -> remove
 * Pressing Enter: createTag -> hideArticles -> addSearchTerm -> onSearch
 * Clicking to Remove a Tag: remove
 * Loading the Page: initializeSearch
 */