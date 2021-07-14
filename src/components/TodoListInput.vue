<template>
  <div class="todo-list-input">
    <div
      class="btn"
      :class="{ allCheck: !isAllChecked }"
      v-show="isBtnShow"
      @click="checkAll"
    >
      {{ btn }}
    </div>

    <input
      type="text"
      :placeholder="input.placeholder"
      v-model="input.message"
      @keyup.enter="addNewItem"
      autofocus
    />
  </div>
</template>

<script>
export default {
  name: 'TodoListInput',
  props: {
    unCheckedNumber: Number,
    totalNumber: Number,
    isItemChecked: Array
  },
  data: function () {
    return {
      btn: '﹀',
      input: {
        placeholder: 'What needs to be done?',
        message: ''
      }
    }
  },
  computed: {
    isAllChecked: function () {
      return !this.unCheckedNumber
    },
    isBtnShow: function () {
      return !!this.totalNumber
    }
  },
  methods: {
    checkAll: function () {
      const isAllChecked = this.isAllChecked
      const _this = this
      this.isItemChecked.forEach(function (item, index) {
        _this.$emit('changeItemStatus', index, !isAllChecked)
      })
    },
    addNewItem: function () {
      if (this.input.message) {
        this.$emit('addNewItem', this.input.message)
        this.input.message = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
@color-dark: rgb(115, 115, 115);
@color-light: rgb(230, 230, 230);

.todo-list-input {
  position: relative;
  height: 68px;

  .btn {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -30%);
    width: 60px;
    font-size: 1.25em;
    text-align: center;
    font-weight: bold;
    color: @color-dark;
    cursor: default;
  }

  .allCheck {
    color: @color-light;
  }

  & > input::-webkit-input-placeholder {
    color: @color-light;
    font-style: italic;
  }

  & > input {
    box-sizing: border-box;
    padding: 16px 16px 16px 60px;
    width: 100%;
    height: 68px;
    line-height: 36px;
    font-size: 1.5em;
    color: rgb(77, 77, 77);
    outline: 0;
    border: none;
    border-bottom: 1px solid rgb(230, 230, 230);
  }
}
</style>