// const btnCall = document.querySelector(".btnCall");
// const menuMo = document.querySelector(".header_m_nav");

// btnCall.onclick = (e) => {
//     e.preventDefault();
//     btnCall.classList.toggle("on");
//     menuMo.classList.toggle("on");
// }

// gnb = document.querySelectorAll("#gnb > li");

// console.log(gnb)
// for (const el of gnb) {
//     el.addEventListener("mouseenter", e => {
//         const sub = e.currentTarget.querySelector(".gnb_sub");
//         sub.style.display = "block"
//     })
// }

//Product
const productLogo = document.querySelectorAll(".product_logo");
const productDetailTitle = document.querySelector(".product_detail_title img")
const productImg = document.querySelector(".product_img_box img")

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