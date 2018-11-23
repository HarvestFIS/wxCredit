// 该文件 集成 后台请求
import axios from 'axios'
// import Vue from 'vue'

// console.log(Vue)

// const loading = Vue.$vux.loading

// const alert = Vue.$vux.alert

// 超时时间
axios.defaults.timeout = 100000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/59913879a1d30433d860ebd5/example/';

// http请求拦截器
let promiseArr = []
axios.interceptors.request.use(config => {
    return config
}, error => {
    // loading.hide()
    // alert.show({
    //     content: '加载超时'
    // })
    return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
    // loading.hide()
    return data
}, error => {
    // loading.hide()
    // alert.show({
    //     content: '加载失败'
    // })
    
    return Promise.reject(error)
})


const createPromise = (url = "", data = {}, method = 'GET') => {
    let _params;
    // if (url.indexOf("undefined")) {
    //     console.log('%c' + url, 'color:red', '请检查请求参数');
    //     return Promise.reject(url)
    // }
    if (method.toLowerCase() == 'get') {
        _params = {
            method: method,
            url: url,
            params: data
        }
    } else {
        let formData = new FormData();
        for(let i in data) {
            formData.append(i, data[i])
        }
        _params = {
            method: method,
            url: url,
            data: formData
        }
    }
    return new Promise((resolve, reject) => {
        axios(_params).then(function (result) {
            resolve(result)
        })
    })
}
export default createPromise
