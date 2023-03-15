# Portfolio

## How to use the custom javascript framework?

Add the `portfolio_framework.js` and `portfolio_style.css` files to your site. 
Create a main element to act as the wrapper for your pages. 
All first level child elements will automatically be created as pages.


*Example:*
```
<main-container>
   <page-content> Some content and stuff </page-content>
</main-container>
```
Now to intialize, run 

```
PortfolioFramework.init("main-container", {
    delay: 0, // delay in ms to begin the timer
    speed: 5000, // time in ms till next slide 
    transition: 1000, // time in ms for animation speed
    pagination: true, // activates pagination which is displayed in footer
    navigation: true, // activates navigation buttons 
    paginationSelector: "pagination",
    nextButtonSelector: "next-btn",
    prevButtonSelector: "prev-btn",
})

```
