<template>
  <div class="footer">
    {{ content }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: 'Elcfin | toDoList'
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  margin-top: 60px;
  margin-bottom: 10px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: rgb(204, 191, 191);
  font-size: 0.9em;
}
</style>