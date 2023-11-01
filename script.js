const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryElement = document.getElementById("gallery");
async function fetchImage() {
  const inputValue = document.getElementById("input").value;
  if (inputValue < 1 || inputValue > 10) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Number should be between 1 and 10";
    return;
  }
  img = "";

  try {
    btnEl.style.display = "none";
    const loading = `<img src="spinner.svg" />`;
    galleryElement.innerHTML = loading;
    await fetch(
      `https:\\api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=K2eywapCP9bqzFHf9vlL5ELLHAxrQ7drOJSnsrYSo6Y`
    ).then((res) =>
      res.json().then((data) => {
        if (data) {
          data.forEach((pic) => {
            img += `
           <img src=${pic.urls.small} alt="image" />
           `;
            galleryElement.style.display = "block";
            galleryElement.innerHTML = img;
            btnEl.style.display = "block";
          });
        }
      })
    );
    errorMessageEl.style.display = "none";
  } catch (error) {
    errorMessageEl.innerText = "An error happened, try again later.";
    errorMessageEl.style.display = "block";
    btnEl.style.display = "none";
  }
}
btnEl.addEventListener("click", fetchImage);
