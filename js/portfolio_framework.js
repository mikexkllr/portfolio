const PortfolioFramework = {
    attributes: {
        slider: null,
        slides: null,
        options: {
            delay: 0, // delay in ms to begin the timer
            speed: 50000, // time in ms till next slide 
            transition: 5000, // time in ms for animation speed
            pagination: true, // activates pagination which is displayed in footer
            navigation: true, // activates navigation buttons 
            paginationSelector: "pagination",
            nextButtonSelector: "next-btn",
            prevButtonSelector: "prev-btn",
        },
        timer: null,
        pagination: null,
        currentActiveIndex: 0,
    },
    init: async function (el, options) {
        if (el === null) {
            console.error("Please select an container for the slider group")
            return
        }
        PortfolioFramework.attributes.slider = document.querySelector(el)

        PortfolioFramework.setOptionsFromConfig()

        await PortfolioFramework.create()
    },
    setOptionsFromConfig: function (options) {
        for (const i in options) {
            // loop threw given custom option object to overwrite options
            PortfolioFramework.options.this[i] = options[i]
        }
    },
    create: async function () {
        // creates element which houses all slides
        const slides = document.createElement("div")
        // creates vanity for the pagination and indicator lol
        const vanity = document.createElement("div")
        // adds class to container of slides so we can style it in css
        slides.classList.add("main_slides_container")
        // adds class to container of vanity stuff so we can style it in css
        vanity.classList.add("main_slider_vanity")
        // lets get the html in the slider id div container
        const content = PortfolioFramework.attributes.slider.innerHTML
        // set the html of our created element to the slides defined in the html #slides div tag
        slides.innerHTML = content
        // reset content of our div #slider
        PortfolioFramework.attributes.slider.innerHTML = ""
        // append our slides in it 
        PortfolioFramework.attributes.slider.append(slides)
        // append vanity underneath it
        if (PortfolioFramework.attributes.options.navigation === true) {
            PortfolioFramework.attributes.slider.append(vanity)
        }
        // give it a class to style it 
        PortfolioFramework.attributes.slider.classList.add("main_slider")
        // get all slides and set it to attribute
        PortfolioFramework.attributes.slides = PortfolioFramework.attributes.slider.getElementsByClassName("main_slides_container")[0].children

        // give all slides a css class to style them
        for (let i = 0; i < PortfolioFramework.attributes.slides.length; i++) {
            console.log(i)
            PortfolioFramework.attributes.slides[i].classList.add("slide_element")
        }

        // loads navigation
        PortfolioFramework.createNavigation()

        // loads pagination
        PortfolioFramework.pagination()

        // activating the first slides ... it gets a class which sets it opacity to 1 
        PortfolioFramework.setActive(PortfolioFramework.attributes.slides[0])

        // we adding a css attributesiable to the element to actually set the transition speed generic 
        PortfolioFramework.attributes.slider.style.setProperty("--slide-transition-speed", PortfolioFramework.attributes.options.transition + "ms");

        setTimeout(PortfolioFramework.start, PortfolioFramework.attributes.delay)
    },
    setActive: function (slide) {
        // set the given slide active by hiding all other slides and showing the given via css class with opacity
        for (let i = 0; i < PortfolioFramework.attributes.slides.length; i++) {
            PortfolioFramework.attributes.slides[i].classList.remove("slide_element_active")

            if (PortfolioFramework.attributes.slides[i] === slide) {
                PortfolioFramework.attributes.currentActiveIndex = i
            }
        }
        slide.classList.add("slide_element_active")

        console.log("current active page: " + PortfolioFramework.attributes.currentActiveIndex)

        if (PortfolioFramework.attributes.options.pagination === true) {
            for (let i = 0; i < PortfolioFramework.attributes.slides.length; i++) {
                PortfolioFramework.attributes.pagination[i].classList.remove("pagination_item_active")
            }

            PortfolioFramework.attributes.pagination[PortfolioFramework.attributes.currentActiveIndex].classList.add("pagination_item_active")
        }
    },
    start: function () {
        PortfolioFramework.attributes.timer = setInterval(PortfolioFramework.next, PortfolioFramework.attributes.options.speed);
    },
    next: function () {
        // clears interval to restart if next btn clicked
        clearInterval(PortfolioFramework.attributes.timer)
        // find out which slide is currently active
        const active = PortfolioFramework.attributes.slider.getElementsByClassName("slide_element_active")[0]
        // lets detect if there is a next slide otherwise go back to first element
        if (active.nextElementSibling == null) {
            PortfolioFramework.setActive(PortfolioFramework.attributes.slides[0])
        } else {
            PortfolioFramework.setActive(active.nextElementSibling)
        }
        // starting interval again
        PortfolioFramework.start()
    },
    createNavigation: function () {
        // asking if navigation is disabled
        if (PortfolioFramework.attributes.options.navigation === false) {
            return
        }

        const nextButtonSelector = document.querySelector(PortfolioFramework.attributes.options.nextButtonSelector)
        nextButtonSelector != null ? nextButtonSelector.addEventListener("click", e => PortfolioFramework.next()) : null

        const prevButtonSelector = document.querySelector(PortfolioFramework.attributes.options.prevButtonSelector)
        prevButtonSelector != null ? prevButtonSelector.addEventListener("click", e => PortfolioFramework.prev()) : null


        /**
         * 
        // Building some nav elements which are getting appended but i kicked it out maybe i continue working on it later
        const nav = document.createElement("div")
        nav.classList.add("navigation_main")

        const prev = document.createElement("div")
        prev.classList.add("navigation_item")
        prev.classList.add("navigation_prev")
        prev.innerText = "<"
        prev.addEventListener("click", e => PortfolioFramework.prev())

        const next = document.createElement("div")
        next.classList.add("navigation_item")
        next.classList.add("navigation_next")
        next.addEventListener("click", e => PortfolioFramework.next())
        next.innerText = ">"

        nav.append(prev)
        nav.append(next)
        
        const vanity = document.querySelector(".main_slider_vanity")
        vanity.appendChild(nav)
         */

    },
    prev: function () {
        // clears interval to restart if prev btn clicked
        clearInterval(PortfolioFramework.attributes.timer)
        // find out which slide is currently active
        const active = PortfolioFramework.attributes.slider.getElementsByClassName("slide_element_active")[0]
        // lets detect if there is a prev slide otherwise go back to first element
        if (active.previousElementSibling == null) {
            PortfolioFramework.setActive(PortfolioFramework.attributes.slides[PortfolioFramework.attributes.slides.length - 1])
        } else {
            PortfolioFramework.setActive(active.previousElementSibling)
        }
        // starting interval again
        PortfolioFramework.start()
    },
    pagination: function () {
        if (PortfolioFramework.attributes.options.pagination === false) {
            return
        }

        let mainPaginationElement = document.createElement("div")
        mainPaginationElement.classList.add("main_pagination")

        for (let i = 0; i < PortfolioFramework.attributes.slides.length; i++) {
            const paginationItem = document.createElement("div")
            paginationItem.classList.add("pagination_item")
            paginationItem.addEventListener("click", (e) => {
                let index = 0
                for (let i = 0; i < PortfolioFramework.attributes.pagination.length; i++) {
                    if (PortfolioFramework.attributes.pagination[i] === e.target) {
                        index = i
                    }
                }
                console.log(index)
                this.setActive(PortfolioFramework.attributes.slides[index])
            })
            mainPaginationElement.appendChild(paginationItem)
        }


        document.querySelector(PortfolioFramework.attributes.options.paginationSelector).appendChild(mainPaginationElement)
        PortfolioFramework.attributes.pagination = document.getElementsByClassName("pagination_item")
    },
}

