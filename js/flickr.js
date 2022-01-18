const gallery = document.querySelector("#gallery")
const galList = document.querySelector("#gallery .wrap .list");
const key = "f7cfb698e2ac45b786af0b554ec7cd09";
const base = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search"
const per_page = 50;
const format = "json";
const btnSearch = document.querySelector(".btnSearch")
const input = gallery.querySelector("#search")
const url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`
const body = document.querySelector("body")
const loading = document.querySelector(".loading")
callData(url);

// input Search버튼 클릭 이벤트
btnSearch.addEventListener("click", e => {
    //input요소에 value값을 가져옴
    let tag = input.value;
    tag = tag.trim(); // 공백제거
    //키워드를 통한 이미지를 요청하는 주소 
    const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
    if (tag != "") {
        callData(url);
    } else {
        galList.innerHTML = "";
        galList.classList.remove("on");
        galList.style.height = "auto"
        console.log("검색어를 입력하세요");
    }
});

//input Enter 입력 이벤트
input.addEventListener("keypress", e => {
    if (e.keyCode == 13) {
        //input요소에 value값을 가져옴
        let tag = input.value;
        tag = tag.trim();
        //키워드를 통한 이미지를 요청하는 주소 
        const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
        if (tag != "") {
            callData(url);
        } else {
            console.log("검색어를 입력하세요");
        }
    }
});

//api fetch하기 
function callData(url) {
    fetch(url)
        .then(data => {
            return data.json()
        })
        .then(json => {
            let items = json.photos.photo;
            if (items.length > 0) {
                createList(items);
                galLoading();
            } else {
                loading.classList.add("off");
                console.log("검색하신 이미지의 데이터가 없습니다");
            }
        })

}

//fetch한 값으로 반복문 돌면서 html만들기 
function createList(items) {
    //htmls 변수에 빈문자열 저장 
    let htmls = ""
    items.map(data => {
        const imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;

        const imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;

        htmls += `
        <li class="item">
            <div>
                <a href="${imgSrcBig}">
                    <img src="${imgSrc}" alt="">
                </a>
            </div>
        </li>
         `;
    })
    galList.innerHTML = htmls;
}

// 이미지 클릭시 popup창 생성
galList.addEventListener("click", e => {
    e.preventDefault();
    let target = e.target.closest(".item");
    if (target) {
        let imgSrc = target.querySelector("a").getAttribute("href");
        let pop = document.createElement("aside");
        let pops = `
                        <img src="${imgSrc}">
                        <span class="close">Close</span>
                        `
        pop.innerHTML = pops;
        gallery.append(pop);
    }
})

// 생성된 popup창 닫기 
gallery.addEventListener("click", (e) => {
    e.preventDefault();

    const pop = e.target.closest("div").querySelector("aside")
    if (pop) {
        const closeBtn = e.target.closest("div").querySelector("aside span")
        if (e.target === closeBtn) {
            pop.remove();
            body.style.overflow = "hidden"
        }
    }
})



//count가 왜 len보다 1이작은지 이유를 모름.
//img가 다 불러와지면 isoLayout 함수 실행
function galLoading() {
    const imgs = galList.querySelectorAll("img");
    const len = imgs.length;
    let count = 1;
    for (let el of imgs) {
        el.onload = () => {
            count++;
            if (count + 1 == len) {
                isoLayout()
            }
        }
    }

}

function isoLayout() {
    galList.classList.add("on")
    loading.classList.add("off")
    new Isotope(".list", {
        itemSelector: ".item",
        columnWidth: ".item",
        transitionDuration: "0.5s"
    });
}

