

const vidList = document.querySelector(".vidList");
const key = "AIzaSyDTqpCGvBZz_l-UfWUkSY-UWyzxgO58z2I";
const playListId = "PLsGbxh85lJXJyWJZ07m7tRiDPqQJNAlZL";
const num = 5;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResult=${num}`;

fetch(url)
    .then(data => {
        return data.json();
    })
    .then(json => {
        const items = json.items
        console.log(items)
        let result = '';

        items.map(item => {
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
                        <img src="${item.snippet.thumbnails.medium.url}" alt="">
                    </a>
                    <div class="con">
                        <h2>${title}</h2>
                        <p>${con}</p>
                        <span>${date}</span>
                    </div>
                 </article>
            `
        })
        vidList.innerHTML = result;
    })


vidList.addEventListener("click", e => {
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
    vidList.append(pop)
})

vidList.addEventListener("click", e => {
    e.preventDefault();
    const pop = vidList.querySelector(".pop")
    if (pop) {
        const close = pop.querySelector("span");
        if (e.target === close) {
            pop.remove()
        }
    }
})