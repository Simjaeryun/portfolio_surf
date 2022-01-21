//youtube Api , Dom생성
const vidLists = document.querySelectorAll(".vidList");
const key = "AIzaSyDTqpCGvBZz_l-UfWUkSY-UWyzxgO58z2I";
const playListId = "PLsGbxh85lJXJyWJZ07m7tRiDPqQJNAlZL";
const num = 5;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResult=${num}`;

// Scroll event 변수
const sections = document.querySelectorAll("section");
const lis = document.querySelectorAll(".btns li");
const activeBtn = document.querySelector(".btns li.on")
const btns_arr = Array.from(lis); // 유사배열을 배열로 만든다
const len = sections.length;
const base = -300;
let posArr = [];

//Youtbe Api
fetch(url)
    .then(data => {
        return data.json();
    })
    .then(json => {
        const items = json.items
        console.log(items)
        let result = '';

        items.map((item) => {
            let title = item.snippet.title

            if (title.length > 30) {
                title = title.substr(0, 30) + "..."
            }

            let con = item.snippet.description
            if (con.length > 100) {
                con = con.substr(0, 100) + "..."
            }

            let date = item.snippet.publishedAt;
            date = date.split("T")[0]
            result += `
                <article>
                    <a href="${item.snippet.resourceId.videoId}" class="pic">
                        <img src="${item.snippet.thumbnails.maxres.url}" alt="">
                    </a>
                 </article>
            `
        })
        for (const el of vidLists) {
            el.innerHTML = result;
        }

        for (let i = 0; i < sections.length; i++) {
            sections[i].querySelectorAll("article")[i].style.zIndex = "5"
        }


    })


for (const el of vidLists) {
    el.addEventListener("click", e => {
        e.preventDefault();
        if (!e.target.closest("a")) {
            return;
        }
        const vidId = e.target.closest("a").getAttribute("href");
        let pop = document.createElement("figure");
        pop.classList.add("pop");
        pop.innerHTML = `
                                    <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen> </iframe>
                                    <span class="btnClose">Close</span>
                                      `;
        el.append(pop)
    })


    el.addEventListener("click", e => {
        e.preventDefault();
        const pop = el.querySelector(".pop")
        if (pop) {
            const close = pop.querySelector("span");
            if (e.target === close) {
                pop.remove()
            }
        }
    })

}



// Scroll Event
const posReset = (arr) => {
    posArr = [];
    for (let el of arr) {
        posArr.push(el.offsetTop)
    }
}

posReset(sections)

window.addEventListener("resize", () => {
    posReset(sections)
})

window.addEventListener("mousewheel", e => {
    e.preventDefault();
    let activeItem = document.querySelector(".btns li.on");
    let activeIndex = btns_arr.indexOf(activeItem);

    if (e.deltaY < 0) {
        //마우스 휠을 올릴 때
        if (activeIndex === 0) {
            return;
        }
        targetIndex = activeIndex - 1;
    } else {
        //마우스 휠을 내릴 때
        if (activeIndex === len - 1) {
            return;
        }
        targetIndex = activeIndex + 1;
    }
    new Anime(window, {
        prop: "scroll",
        value: posArr[targetIndex],
        duration: 500,
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
            el.classList.add("on");
        }
    })
})

lis.forEach((el, index) => {
    el.addEventListener("click", (e) => {
        new Anime(window, {
            prop: "scroll",
            value: posArr[index],
            duration: 500,
        })
    })
})

