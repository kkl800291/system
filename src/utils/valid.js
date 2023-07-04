import { api_users_repeat } from '@/apis/user'
// 账号自定义验证函数
export const checkAccount = (rule, value, callback) => {
    // rule: 规则信息
    // value：输入框的值
    // callback：回调函数
    // 判断输入框输入的数据是否为空
    if (!value) {
        // js 自带的错误的构造函数
        callback(new Error("请输入用户名"));
    } else if (!/^[\u4e00-\u9fa5A-Za-z]{3,6}$/.test(value)) {
        // 正则验证未通过
        callback(
            new Error("请以字母或汉字开头，3 - 6位")
        );
    } else {
        // 验证通过
        callback();
    }
};

// 密码的自定义验证规则
export const checkPassword = (rule, value, callback) => {
    // 空验证
    if (!value) {
        callback(new Error("请输入密码"));
    } else if (!/^[A-Za-z0-9]\w{5,11}$/.test(value)) {
        callback(
            new Error("请以字母或者数字开头，包含字母、数字、_的6-12位字符")
        );
    } else {
        // 验证通过
        callback();
    }
};

// 添加账号验证
// 账号自定义验证函数
export const addCheckAccount = async (rule, value, callback) => {
    // rule: 规则信息
    // value：输入框的值
    // callback：回调函数
    // 判断输入框输入的数据是否为空
    if (!value) {
        // js 自带的错误的构造函数
        callback(new Error("请输入用户名"));
    } else if (!/^[\u4e00-\u9fa5A-Za-z]{3,6}$/.test(value)) {
        // 正则验证未通过
        callback(
            new Error("请以字母或汉字开头，3 - 6位")
        );
    } else {
        // 验证账号是否重复
        const res = await api_users_repeat({
            account: value
        })
        if (res.data.code === 201) {
            callback(new Error(res.data.msg))
        }
        // 验证通过
        callback();
    }
};
