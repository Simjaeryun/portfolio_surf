const t_on = document.querySelectorAll(".traffic li")[0],
    t_off = document.querySelectorAll(".traffic li")[1],
    branch_btns = document.querySelectorAll(".branch li");

const zoom = true; //줌 가능
const drag = true; //드래그 가능
var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(37.5120725, 127.057503), //지도의 중심좌표.
    level: 4 //지도의 레벨(확대, 축소 정도)
};
var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


var markerOptions = [
    {
        title: "본점",
        latlng: new kakao.maps.LatLng(37.5120725, 127.057503),
        imgSrc: "img/marker1.png",
        imgSize: new kakao.maps.Size(232, 99),
        imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
        title: "지점1",
        latlng: new kakao.maps.LatLng(33.255296, 126.559507),
        imgSrc: "img/marker2.png",
        imgSize: new kakao.maps.Size(232, 99),
        imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
        title: "지점2",
        latlng: new kakao.maps.LatLng(37.616690, 126.716288),
        imgSrc: "img/marker3.png",
        imgSize: new kakao.maps.Size(232, 99),
        imgPos: { offset: new kakao.maps.Point(116, 99) },
    }
]

for (let i = 0; i < markerOptions.length; i++) {
    new kakao.maps.Marker({
        map: map,
        position: markerOptions[i].latlng,
        title: markerOptions[i].title,
        image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
    })
    branch_btns[i].addEventListener("click", e => {
        e.preventDefault();
        moveTo(markerOptions[i].latlng)
        for (const el of branch_btns) {
            el.classList.remove("on")
        }
        branch_btns[i].classList.add("on")
    })
}






// 지도에 교통정보를 표시하도록 지도타입을 추가합니다
t_on.addEventListener("click", (e) => {
    e.preventDefault();
    if (t_on.classList.contains("on")) {
        return;
    }
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    t_on.classList.add("on");
    t_off.classList.remove("on")
})

// 아래 코드는 위에서 추가한 교통정보 지도타입을 제거합니다
t_off.addEventListener("click", (e) => {
    e.preventDefault();
    if (t_off.classList.contains("on")) {
        return;
    }
    t_off.classList.add("on")
    t_on.classList.remove("on")
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
})

window.onresize = (e) => {
    let active_btn = document.querySelector(".branch li.on")
    let active_index = active_btn.getAttribute("data-index");
    map.setCenter(markerOptions[active_index].latlng)
}


//컨트롤 보이기
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 드래그 이동 켜기/끄기
setDraggable(drag)
function setDraggable(drag) {
    // 마우스 드래그로 지도 이동 가능여부를 설정합니다
    map.setDraggable(drag);
}

//지도 확대, 축소 켜기/끄기
setZoomable(zoom);
function setZoomable(zoomable) {
    // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
    map.setZoomable(zoomable);
}


function moveTo(target) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = target;

    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
}