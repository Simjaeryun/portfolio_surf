const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".header_m_nav");

btnCall.onclick = (e) => {
    e.preventDefault();
    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}

gnb = document.querySelectorAll("#gnb > li");

console.log(gnb)
for (const el of gnb) {
    el.addEventListener("mouseenter", e => {
        const sub = e.currentTarget.querySelector(".gnb_sub");
        sub.style.display = "block"
    })
}
