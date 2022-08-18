const patterns = {
    username: /^[A-Za-z0-9]{5,20}$/,
    password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,20}$/,
    phone: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
}

const patternsMessage = {
    username: '用户名5-20位，字母、数字组成',
    password: '密码5-20位,必须包含字母和数字',
    phone: '请输入正确的手机号格式'
}

const pattern = (name, option = 'g') => {
    return {
        pattern: new RegExp(patterns[name], option),
        message: patternsMessage[name]
    }
}

export default pattern;