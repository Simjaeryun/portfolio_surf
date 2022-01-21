// product Logo 부분 
const productLogo = document.querySelectorAll(".product_logo");
const productDetailTitle = document.querySelector(".product_detail_title img")
const productImg = document.querySelector(".product_img_box img")

//Scroll Event
const sections = document.querySelectorAll("section");
const len = sections.length;
const lis = document.querySelectorAll(".nav_btns li");
const btns_arr = Array.from(lis);
let posArr = [];
const base = -300;
let enableClick = true;

const showBtn = document.querySelector(".header_show");
const header = document.querySelector(".header")
showBtn.addEventListener("mouseenter", (e) => {
    console.log(e.currentTarget.closest(".header"))
    e.currentTarget.closest(".header").classList.toggle("on")
})


productLogo.forEach((el, index) => {
    el.addEventListener("click", e => {
        e.preventDefault();
        let imgSrc = e.currentTarget.querySelector("img").getAttribute("src")
        productDetailTitle.setAttribute("src", imgSrc)
        productImg.setAttribute("src", `img/board${index + 1}.png`)
        for (const el of productLogo) {
            el.classList.remove("on")
            el.querySelector("img").style.filter = "grayscale(1)"
        }
        e.currentTarget.classList.add("on")
        e.currentTarget.querySelector("img").style.filter = "grayscale(0)"
    })
});


setPos();

window.addEventListener("resize", () => {
    setPos();
})


window.addEventListener("mousewheel", e => {
    e.preventDefault();

    let activeItem = document.querySelector(".nav_btns li.on");

    let activeIndex = btns_arr.indexOf(activeItem);
    let targetIndex;


    if (e.deltaY < 0) {
        if (activeIndex == 0) return;
        targetIndex = activeIndex - 1;

    } else {
        if (activeIndex == len - 1) return;
        targetIndex = activeIndex + 1;
    }

    new Anime(window, {
        prop: "scroll",
        value: posArr[targetIndex],
        duration: 500
    })

}, { passive: false })



window.addEventListener("scroll", e => {

    let scroll = window.scrollY || window.pageYOffset;

    sections.forEach((el, index) => {
        if (scroll >= posArr[index] + base) {
            lis.forEach((el, index) => {
                el.classList.remove("on");
                sections[index].classList.remove("on");
            })

            lis[index].classList.add("on");
            sections[index].classList.add("on");
        }
    })
})


lis.forEach((el, index) => {
    el.addEventListener("click", e => {
        let isOn = e.currentTarget.classList.contains("on");
        if (isOn) return;

        if (enableClick) {
            new Anime(window, {
                prop: "scroll",
                value: posArr[index],
                duration: 500,
                callback: () => {
                    enableClick = true;
                }
            })
            enableClick = false;
        }
    })
});


function setPos() {
    posArr = [];
    for (let el of sections) {
        posArr.push(el.offsetTop);
    }
}