<template>
  <div class="total">
    <left-aside></left-aside>
    <main-body></main-body>
  </div>
</template>

<script>
import LeftAside from './components/LeftAside.vue'
import MainBody from './components/MainBody.vue'

export default {
  name: 'App',
  components: {
    LeftAside,
    MainBody
  }
}
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  font: 16px 'Helvetica Neue', Helvetica, Arial, '宋体', sans-serif;
  background-color: rgb(245, 245, 245);
}

.total {
  padding: 0;
  transition: padding 0.5s;

  .aside-out {
    left: -300px;
    transition: left 0.5s;
  }
}

@media (min-width: 900px) {
  .total {
    padding-left: 300px;
    transition: padding 0.5s;

    .aside-out {
      left: 10px;
      transition: left 0.5s;
    }
  }
}
</style>
