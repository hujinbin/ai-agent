const patterns = {
    username: /^[A-Za-z0-9]{5,20}$/,
    password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,20}$/,
}

const patternsMessage = {
    username: '用户名5-20位，字母、数字组成',
    password: '密码5-20位,必须包含字母和数字'
}

const pattern = (name, option = 'g') => {
    return {
        pattern: new RegExp(patterns[name], option),
        message: patternsMessage[name]
    }
}

export default pattern;