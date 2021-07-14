<template>
  <div class="right-part">
    <div>
      <div class="right-part-title">
        {{ title }}
      </div>
      <todo-list></todo-list>
    </div>
    <main-body-footer></main-body-footer>
  </div>
</template>

<script>
import TodoList from './TodoList.vue'
import MainBodyFooter from './MainBodyFooter.vue'

export default {
  name: 'MainBody',
  components: {
    TodoList,
    MainBodyFooter
  },
  data() {
    return {
      title: 'todos'
    }
  }
}
</script>

<style lang="less" scoped>
.right-part {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 560px;
  min-width: 240px;

  .right-part-title {
    height: 115px;
    margin: 10px auto;
    line-height: 115px;
    text-align: center;
    font-size: 6em;
    color: rgb(234, 215, 215);
  }
}
</style>