// 该文件 集成 后台请求
import axios from 'axios'
// import Vue from 'vue'
import { weixinLogin } from './api'
import { getCookie, getUrlParameter, setCookie } from '../assets/js/util'
// console.log(Vue)


// const loading = Vue.$vux.loading

// const alert = Vue.$vux.alert

// 超时时间
axios.defaults.timeout = 100000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/59913879a1d30433d860ebd5/example/';

// http请求拦截器
axios.interceptors.request.use(config => {
    // loading.show({
    //     text: '加载中'
    // })
    console.log(config, 'config')
    console.log(getCookie('bgsn'), 'cookie')
    // 如果没有登录cookie就进行微信登录
    if(!getCookie('bgsn')) {
        console.log(window.location.href)
        let appid = 'ww1128a730403d63f4'
        // let code = getUrlParameter('code', window.location.href)
        let code = 'C4ltxwZuDGUBmFmteFwxXqrJnbuZf483WNCx3gHBk2o'
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appid +'&redirect_uri='+ encodeURIComponent(window.location.href) +'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
        if(!code) {
            window.location.href = url
            return
        }else {
            if(!getCookie('login')) {
                setCookie('login', 'wxlogin')
                weixinLogin(code).then((result) => {
                    setCookie('login', '')
                    window.location.reload()
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
        
    }
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
        _params = {
            method: method,
            url: url,
            data: data
        }
    }
    return new Promise((resolve, reject) => {
        axios(_params).then(function (result) {
            resolve(result)
        })
    })
}
export default createPromise
