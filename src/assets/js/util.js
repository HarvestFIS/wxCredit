/**
 * 获取cookie值
 * @param name
 * @returns {null}
 */
export const getCookie = function(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
/**
         * set cookie
         * @param name
         * @param value
         * @param (path) 可选，传入path 如：/home/123
         * @param (expires) 可选，传入过期时间 如2017-01-01
         */
export const setCookie = function(name, value, path, expires) {
    var path = path ? "path=" + path + "/;" : "path=/; ";
    var expires = expires ? "expires=" + expires + "; " : "";
    document.cookie = name + "=" + value + ";" + path + expires;
}

export const getUrlParameter = function(name, url) {
    url = url.split('?')[1]
    if(!url) {
      return ''
    }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
    var r = url.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
