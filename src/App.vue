<template>
  <div id="app">
    <!-- <transition :name="transitionName">
        <keep-alive>
            <router-view class="app-content" v-if="$route.meta.keepAlive" />
        </keep-alive>
    </transition> -->
    <div v-if="bgsnwx">
      <transition :name="transitionName">
        <router-view class="app-content" />
      </transition>
    </div>
  </div>
</template>

<script>
import { weixinLogin } from './api/api'
import { getCookie, getUrlParameter, setCookie } from './assets/js/util'
export default {
  name: 'App',
  data() {
    return {
      transitionName: "slide-left",
      bgsnwx: ''
    };
  },
  created() {
      this.initLogin()
  },
  methods: {
      initLogin () {
        // 微信登录拦截
        // 如果没有登录cookie就进行微信登录
        let that = this
        if(!getCookie('bgsnwx')) {
          let appid = 'ww0e12d5b0fb096677'
          let code = getUrlParameter('code', window.location.href)
        //   let code = 'C4ltxwZuDGUBmFmteFwxXqrJnbuZf483WNCx3gHBk2o'
          let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appid +'&redirect_uri='+ encodeURIComponent(window.location.href) +'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
          if(!code) {
              window.location.href = url
          }else {
              if(!getCookie('login')) {
                  setCookie('login', 'wxlogin')
                  weixinLogin(code).then((result) => {
                      setCookie('login', '')
                      if(result.data.success) {
						              that.bgsnwx = getCookie('bgsnwx')
                      } else {
                          alert('企业关联失败，请联系管理员')
                      }
                  }).catch((err) => {
                      console.log(err)
                  })
              }
          } 
        } else {
          this.bgsnwx = getCookie('bgsnwx')
        }
      },
      getUrlParameter(name, url) {
          url = url.split('?')[1]
          if(!url) {
            return ''
          }
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
          var r = url.match(reg);
          if (r != null) return unescape(r[2]);
          return null;
      }
  },
  watch: {
    $route(to, from) {
		let toDepth = to.meta.index;
		let fromDepth = 100;
		if (from.meta.index) {
			fromDepth = from.meta.index;
		}
		this.transitionName = toDepth > fromDepth ? "slide-left" : "slide-right";
    }
  }
}
</script>

<style lang="scss">
.app-content {
    width: 100%;  
    height: 100%;
    min-height: 100vh;
    transition: all .5s cubic-bezier(.55,0,.1,1);
}  
.slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
}  
.slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
} 

html {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, font, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend {
	margin: 0;
	padding: 0;
	border: 0;
	outline: 0;
	font-size: 100%;
	vertical-align: baseline;
	background: transparent;
}
body {
	line-height: 1;
	background: #fafafa;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

/* remember to define focus styles! */
:focus {
	outline: 0;
}

/* remember to highlight inserts somehow! */
ins {
	text-decoration: none;
}
del {
	text-decoration: line-through;
}

/* tables still need 'cellspacing="0"' in the markup */
table {
	border-collapse: collapse;
	border-spacing: 0;
}

.wx-button {
	display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}

.wx-button:focus, .wx-button:hover {
	color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}

.wx-button + .wx-button {
	margin-left: 10px;
}

.wx-button-primary {
	color: #fff;
    background-color: #409eff;
    border-color: #409eff;
}
.wx-button-primary:focus, .wx-button-primary:hover {
	background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
}

.wx-button-danger {
	color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
}
.wx-button-danger:focus, .wx-button-danger:hover {
	background: #f78989;
    border-color: #f78989;
    color: #fff;
}


//清浮动
.clearfix {
    *zoom: 1;
}

.clearfix:before,
.clearfix:after {
    display: table;
    line-height: 0;
    content: "";
}

.clearfix:after {
    clear: both;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background-color: #F2F2F0;
}

/*定义滚动条轨道 内阴影+圆角*/

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
    border-radius: 10px;
    background-color: #F2F2F0;
}

/*定义滑块 内阴影+圆角*/

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #555;
}


.dark_header {
    background: #3a393d !important;
    color: #fff;
}

</style>
