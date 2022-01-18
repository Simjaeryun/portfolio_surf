const form = document.querySelector("form");
const btnSubmit = document.querySelector("form input[type=submit]")

//btnSubmit버튼을  클릭했을 때
btnSubmit.addEventListener("click", e => {
    //isTxt함수의 반환값이 false라면 e.preventDefault로 중지
    if (!isTxt("id", 6)) {
        e.preventDefault();
    }

    if (!isPwd("pwd1", "pwd2", 5)) {
        e.preventDefault();
    }

    if (!isCheck("hobby")) {
        e.preventDefault()
    }
    if (!isCheck("gender")) {
        e.preventDefault()
    }

    if (!isEmail("email")) {
        e.preventDefault();
    }
    if (!isSelect("company")) {
        e.preventDefault()
    }

    //수정해야함 
    if (!isAgree("agree")) {
        e.preventDefault()
    }
})

//type이 text인 form요소 인증 함수
function isTxt(name, len) {
    //만약 입력받은 글자수 설정이 없다면 기본값 5
    if (len === undefined) len = 5;
    //해당 name값의 input요소를 찾음
    let input = form.querySelector(`[name=${name}]`);
    //해당 input 요소의 value값 구함
    let txt = input.value;
    if (txt.length >= len) {
        const errMsgs = input.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) {
            input.closest("td").querySelector("p").remove();
        }
        return true;
    } else {
        //일단 에러메시지 p요소가 있는지 판별 
        const errMsgs = input.closest("td").querySelectorAll("p");
        //p태그가 있다면 제거하고  
        if (errMsgs.length > 0) {
            input.closest("td").querySelector("p").remove();
        }
        //p태그를 새로 생성하여 해당 input요소의부모 td의 뒤쪽에 삽입
        const errMsg = document.createElement("p");
        errMsg.append(`입력항목을 ${len}글자 이상 입력하시오`)
        input.closest("td").append(errMsg);

        return false;
    }
}

function isEmail(name) {
    let input = form.querySelector(`[name=${name}]`);
    let txt = input.value;
    if (txt.length > 0) {
        const errMsgs = input.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) {
            input.closest("td").querySelector("p").remove();
        }
        return true;
    } else {
        const errMsgs = input.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) {
            input.closest("td").querySelector("p").remove();
        }
        const errMsg = document.createElement("p");
        errMsg.append("이메일을 입력하세요");
        input.closest("td").append(errMsg);
        return false;
    }
}

function isCheck(name) {
    //input갯수가 여러개이므로 유사배열로 받는다 
    let inputs = form.querySelectorAll(`[name=${name}]`);
    //일단 isCheck 변수값을 false로 지정하고 
    let isCheck = false;

    //input의 갯수만큼 반복을 돌면서 
    for (let el of inputs) {
        //하나라도 체크되어있는 것이 있다면 isCheck 값을 true로 변경 
        if (el.checked) isCheck = true;
    }

    //isCheck가 true라면 인증 통과 
    if (isCheck) {
        //경고문구가 있는지 찾아서 있다면 삭제 처리 
        const errMsgs = inputs[0].closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();
        //리턴값으로 true 반환 
        return true;

        //하나라도 체크가 되어 있지않아서 isCheck 가 false라면 
    } else {
        //경고문구 띄어주고 
        const errMsgs = inputs[0].closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append("필수 입력 항목을 체크해주세요");
        inputs[0].closest("td").append(errMsg);

        //리턴값으로 false 반환 
        return false;
    }
}

function isSelect(name) {
    let sel = form.querySelector(`[name=${name}]`);
    let sel_index = sel.options.selectedIndex;
    let val = sel[sel_index].value;

    if (val !== "") {
        const errMsgs = sel.closest("td").querySelectorAll("p");
        if (errMsgs.length > 1) sel.closest("td").querySelector("p").firstElementChild.remove();
        return true;
    } else {
        const errMsgs = sel.closest("td").querySelectorAll("p");
        if (errMsgs.length > 1) sel.closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append("항목을 선택해 주세요");
        sel.closest("td").append(errMsg);

        return false;
    }
}

function isPwd(name1, name2, len) {
    const pwd1 = form.querySelector(`[name=${name1}]`);
    const pwd2 = form.querySelector(`[name=${name2}]`);
    const pwd1_val = pwd1.value;
    const pwd2_val = pwd2.value;

    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*_+?<>.,/]/;

    if (pwd1_val === pwd2_val && pwd1_val.length >= len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)) {
        const errMsgs = pwd1.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) {
            pwd1.closest("td").querySelector("p").remove();
        }
        return true;
    } else {
        const errMsgs = pwd1.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) {
            pwd1.closest("td").querySelector("p").remove();
        }
        const errMsg = document.createElement("p");
        errMsg.append(`비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 포함하여 동일하게 입력하세요`)
        pwd1.closest("td").append(errMsg);
        return false
    }
}

function isAgree(name) {
    let input = form.querySelector(`[name=${name}]`)
    let check = input.checked;
    if (check === true) {
        const errMsgs = input.closest("div").querySelectorAll("p");
        if (errMsgs.length > 0) {
            input.closest("div").querySelector("p").remove();
        }
        return true
    } else {
        const errMsgs = input.closest("div").querySelectorAll("p");
        if (errMsgs.length > 0) {
            input.closest("div").querySelector("p").remove();
        }
        const errMsg = document.createElement("p");
        errMsg.append("필수 입력항목 입니다.");
        input.closest("div").append(errMsg)
        return false
    }
}