<template>
  <div id="app">
    <!-- <transition :name="transitionName">
        <keep-alive>
            <router-view class="app-content" v-if="$route.meta.keepAlive" />
        </keep-alive>
    </transition> -->
    <transition :name="transitionName">
        <router-view class="app-content" />
    </transition>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import { weixinLogin } from './api/api'
export default {
  name: 'App',
  data() {
    return {
    	transitionName: "slide-left"
    };
  },
  created() {
    // console.log(wx)
      this.initLogin()
  },
  methods: {
      initLogin () {
        console.log()
        let appid = 'ww1128a730403d63f4'
        let code = this.getUrlParameter("code", window.location.href)
        let routeCode = this.$route.query.code
        if(!code && !routeCode) {
          let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appid +'&redirect_uri='+ document.location.href +'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
          document.location.replace(url)
          return false
        }
        weixinLogin(code).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
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
