/* API */

const inputSearch = document.getElementById("search");
const btnSearch = document.getElementById("submit");

let picture = document.getElementById("pic");
const userName = document.getElementById("name");
const userID = document.getElementById("id");
const date = document.getElementById("join");
const bio = document.getElementById("bio");

const repo = document.getElementById("repo");
const followers = document.getElementById("followers");
const following = document.getElementById("following");

const city = document.getElementById("city");
const twit = document.getElementById("twit");
const github = document.getElementById("github");
const job = document.getElementById("job");

btnSearch.addEventListener("click", () => {
  const urlAPI = `https://api.github.com/users/${inputSearch.value}`;
  async function getUrl() {
    const response = await fetch(urlAPI);
    const data = await response.json();
    const dateData = data.created_at
      ? data.created_at.slice(0, data.created_at.length - 10)
      : "Not Available";
    const errorMessage = document.querySelector(".error-message");

    if (response.ok) {
      picture.src = data.avatar_url;
      userName.innerHTML = data.name;
      userID.innerHTML = data.login;
      date.innerHTML = `Joined ${dateData}`;
      bio.innerHTML = data.bio;

      repo.innerHTML = data.public_repos;
      followers.innerHTML = data.followers;
      following.innerHTML = data.following;

      city.innerHTML =
        data.location === "" || data.location === null
          ? "Not Available"
          : data.location;
      twit.innerHTML =
        data.twitter_username === "" || data.twitter_username === null
          ? "Not Available"
          : data.twitter_username;
      github.innerHTML =
        data.blog === "" || data.blog === null ? "Not Available" : data.blog;
      job.innerHTML =
        data.company === "" || data.company === null
          ? "Not Available"
          : data.company;

      errorMessage.style.display = "none";
    } else if (response.status === 404) {
      errorMessage.style.display = "flex";
    } else {
      errorMessage.style.display = "flex";
      console.error(
        `GitHub API request failed with status: ${response.status}`
      );
    }
  }
  getUrl();
});

/* Dark mode button */

const toggle = document.getElementById("moonSun");
const html = document.querySelector("html");
const sunMoon = document.getElementById("moon");
const prefersDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const enableDarkMode = () => {
  html.setAttribute("data-theme", "dark");
  sunMoon.src = "assets/icon-sun.svg";
};

const enableLightMode = () => {
  html.setAttribute("data-theme", "light");
  sunMoon.src = "assets/icon-moon.svg";
};

if (prefersDarkMode) {
  enableDarkMode();
} else {
  enableLightMode();
}

toggle.addEventListener("click", () => {
  const isDarkMode = html.getAttribute("data-theme") === "dark";

  if (isDarkMode) {
    enableLightMode();
  } else {
    enableDarkMode();
  }
});
