// 입력값 검증 함수들.

function checkGenericInput(value) {
    //value: String
    //value가 영문자, 숫자, 한글, 띄어쓰기(1~50글자)로만 구성되어 있는지 검사한다.
    const re = /^[A-Za-z0-9가-힣\s]{1,50}$/;
    return re.test(value)
}

function checkName(value) {
    const re = /^[A-Za-z0-9가-힣]{1,12}$/;
    return re.test(value)
}

function checkUserID(value) {
    const re = /^[A-Za-z0-9]{4,12}$/;
    return re.test(value)
}

function checkPassword(value) {
    const re = /^[A-Za-z0-9]{8,50}$/;
    return re.test(value)
}

function checkMoney(value) {
    const re = /^[1-9]{1}[0-9]{0,100}$/;
    return re.test(value)
}

function checkDate(value) {
    try {
        const oneHour = 3600*1000; //1h=3,600,000ms
        let time = Math.round(value.getTime()/(24*oneHour))*(24*oneHour) - 9*oneHour 
        if (time >= 0) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        return false;
    }
}

module.exports = {
    checkGenericInput,
    checkName,
    checkUserID,
    checkPassword,
    checkMoney,
    checkDate
};