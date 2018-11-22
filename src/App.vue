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
	<div v-else>
		企业关联失败，请连接管理员
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
          let appid = 'ww1128a730403d63f4'
          // let code = getUrlParameter('code', window.location.href)
          let code = 'C4ltxwZuDGUBmFmteFwxXqrJnbuZf483WNCx3gHBk2o'
          let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appid +'&redirect_uri='+ encodeURIComponent(window.location.href) +'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
          if(!code) {
              window.location.href = url
          }else {
              if(!getCookie('login')) {
                  setCookie('login', 'wxlogin')
                  weixinLogin(code).then((result) => {
                      setCookie('login', '')
                      if(result.success) {
                        that.bgsnwx = getCookie('bgsnwx')
                      } else {
                          alert('企业关联失败，请连接管理员')
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
@import url('./assets/scss/common.scss');
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
</style>
