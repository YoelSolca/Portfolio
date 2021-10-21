/* Animation Effect*/


function bgAanimationItems() {
    const rows = 7,
        cols = 10;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const div = document.createElement("div");
            div.className = `col-${j+1}`;
            document.querySelector(".bg-animation-effect").appendChild(div);
        }
    }
}

bgAanimationItems();


/* Toogle body scrolling */
function toggleBodycrolling() {
    document.body.classList.toggle("hide-scrolling");
}


/* Filter portfolio items */

const filtersBtnsContainer = document.querySelector(".portfolio-filter");
let portfolioItems;

filtersBtnsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("portfolio-filter-btn") &&
        !e.target.classList.contains("active")) {
        filtersBtnsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        toggleBodycrolling();
        document.querySelector(".filter-status").classList.add("active");
        document.querySelector(".filter-status p").innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;
        setTimeout(() => {
            filterItems(e.target);
        }, 400);
        setTimeout(() => {
            document.querySelector(".filter-status").classList.remove("active");
            toggleBodycrolling();
        }, 800);
    }
});


function filterItems(filterBtn) {
    const selectedCategory = filterBtn.getAttribute("data-filter");
    document.querySelectorAll(".portfolio-item").forEach((item) => {
        const category = item.getAttribute("data-category").split(",");
        if (category.indexOf(selectedCategory) !== -1 || selectedCategory === "all") {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }
    });
    portfolioItems = document.querySelectorAll(".portfolio-item.show");
    console.log(portfolioItems);
}

/* Filter active category Portfolio items*/

filterItems(document.querySelector(".portfolio-filter-btn.active"));


/* Portfilio item details Popup */

let portfolioItemIndex;
document.addEventListener("click", (e) => {
    if (e.target.closest(".portfolio-item")) {
        const currentItem = e.target.closest(".portfolio-item");
        portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
        console.log(portfolioItemIndex);
        togglePopup();
        portfolioItemDetails();
        updateNextPrevItem();
    }
});

function togglePopup() {
    document.querySelector(".portafolio-popup").classList.toggle("open");
    toggleBodycrolling();
}

document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);

function portfolioItemDetails() {
    document.querySelector(".pp-thumbnail img").src =
        portfolioItems[portfolioItemIndex].querySelector("img").src;

    document.querySelector(".pp-header h3").innerHTML =
        portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML =
        portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-details").innerHTML;

    document.querySelector(".pp-counter").innerHTML = `${portfolioItemIndex+1}
of 
    ${ portfolioItems.length } (<span title = "category" > ${ document.querySelector(".portfolio-filter-btn.active").innerHTML } </span> )`;

}

function updateNextPrevItem() {
    if (portfolioItemIndex !== 0) {
        document.querySelector(".pp-footer-left").classList.remove("hidden");
        document.querySelector(".pp-footer-left h3").innerHTML =
            portfolioItems[portfolioItemIndex - 1].querySelector("h3").innerHTML;

        document.querySelector(".pp-footer-left img").src =
            portfolioItems[portfolioItemIndex - 1].querySelector("img").src;
    } else {
        document.querySelector(".pp-footer-left").classList.add("hidden");
    }

    if (portfolioItemIndex !== portfolioItems.length - 1) {
        document.querySelector(".pp-footer-right").classList.remove("hidden");
        document.querySelector(".pp-footer-right h3").innerHTML =
            portfolioItems[portfolioItemIndex + 1].querySelector("h3").innerHTML;

        document.querySelector(".pp-footer-right img").src =
            portfolioItems[portfolioItemIndex + 1].querySelector("img").src;
    } else {
        document.querySelector(".pp-footer-right").classList.add("hidden");
    }
}

document.querySelector(".pp-prev-btn").addEventListener("click", () => {
    changePortfolioItem("prev");
});

document.querySelector(".pp-next-btn").addEventListener("click", () => {
    changePortfolioItem("next");
});

function changePortfolioItem(direction) {
    if (direction == "prev") {
        portfolioItemIndex--;
    } else {
        portfolioItemIndex++;
    }
    document.querySelector(".pp-overlay").classList.add(direction);
    setTimeout(() => {
        document.querySelector(".pp-inner").scrollTo(0, 0);
        portfolioItemDetails();
        updateNextPrevItem();
    }, 400);
    setTimeout(() => {
        document.querySelector(".pp-overlay").classList.remove(direction);
    }, 1000);
}