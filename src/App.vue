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
export default {
  name: 'App',
  data() {
    return {
    	transitionName: "slide-left"
    };
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
