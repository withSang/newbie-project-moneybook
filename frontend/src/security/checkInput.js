// 입력값 검증 함수들.

function check(re, value) {
    if (re.test(value)) {
        return true;
    } else {
        return false;
    }
}

function checkGenericInput(value) {
    //value: String
    //value가 영문자, 숫자(1~50글자)로만 구성되어 있는지 검사한다.
    const re = /^[0-9A-Za-z]{1,50}$/;
    return check(re, value);
}

module.exports = {
    checkGenericInput,
};