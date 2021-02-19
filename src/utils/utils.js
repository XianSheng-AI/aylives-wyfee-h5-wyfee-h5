class Utils {
  setCookie(name, value, domain, expires) {
    let Days = 10
    let exp = new Date()
    if (expires) {
      exp.setTime(exp.getTime() + parseInt(expires))
    } else {
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    }
    document.cookie = name + '=' + escape(value) + ';domain=' + domain + ';expires=' + exp.toGMTString() + ';path=/'
  }

  getCookie(name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  }

  pageUrlGetValue(key) {
    return decodeURI(window.location.href.replace(new RegExp('^(?:.*[&\\?]' + encodeURI(key).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
  }

  isIos() {
    let u = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(u)) {
      return true
    } else {
      return false
    }
  }

  isAndroid() {
    let u = navigator.userAgent.toLowerCase()
    if (/android/.test(u)) {
      return true
    } else {
      false
    }
  }
}


export default new Utils()
