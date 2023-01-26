PortfolioFramework.init("main-container", {
    delay: 0, // delay in ms to begin the timer
    speed: 5000, // time in ms till next slide 
    transition: 1000, // time in ms for animation speed
    pagination: true, // activates pagination which is displayed in footer
    navigation: true, // activates navigation buttons 
    paginationSelector: "#pagination",
    nextButtonSelector: "next-btn",
    prevButtonSelector: "prev-btn",
})

fetchGithubApiRepos()


function fetchGithubApiRepos() {
    const htmlRepoContainer = document.getElementById("githubApiRepos")

    fetch("https://api.github.com/users/mikexkllr/repos")
        .then(response => response.json())
        .then(function (data) {
            for (repo of data) {
                console.log(repo)
                let mainElement = document.createElement("a")
                let elementToAppend = document.createElement("div")
                mainElement.setAttribute("href", repo["html_url"])
                elementToAppend.classList.add("card-element")
                let headline = document.createElement("h2")
                headline.innerText = repo.name
                let description = document.createElement("p")
                description.innerText = repo.description
                elementToAppend.appendChild(headline)
                elementToAppend.appendChild(description)
                mainElement.appendChild(elementToAppend)
                htmlRepoContainer.appendChild(mainElement)
            }
        })
        .catch(err => console.error(err));
}