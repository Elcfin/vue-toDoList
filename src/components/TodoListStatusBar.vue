<template>
  <div class="status-bar" v-show="items.length">
    <div class="number">
      {{ unCheckedNumber + ' item(s) left' }}
    </div>

    <div class="btns">
      <div
        v-for="item in btns"
        :key="item"
        :class="{ selected: item === selected }"
      >
        <input type="radio" :id="item" :value="item" v-model="selected" />
        <label :for="item"> {{ item }}</label>
      </div>
    </div>

    <div
      class="clear"
      @click="clearCompletedItems"
      :style="{ visibility: isClearShow }"
    >
      {{ clearCompleted }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoListStatusBar',
  props: {
    items: Array
  },
  data: function () {
    return {
      btns: ['All', 'Active', 'Completed'],
      selected: 'All',
      clearCompleted: 'Clear completed'
    }
  },
  computed: {
    isClearShow: function () {
      return this.items.some(function (item) {
        return item.isChecked
      })
        ? 'visible'
        : 'hidden'
    },
    unCheckedNumber: function () {
      return this.items.filter(function (item) {
        return !item.isChecked
      }).length
    }
  },
  methods: {
    clearCompletedItems() {
      this.$emit('clearCompletedItems')
    }
  },
  watch: {
    selected() {
      this.$emit('selectedChange', this.selected)
    }
  }
}
</script>

<style lang="less" scoped>
.status-bar {
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  min-height: 46px;
  color: rgb(119, 119, 119);
  font-size: 0.9em;
  line-height: 26px;

  & > div {
    height: 26px;
  }

  .number {
    cursor: default;
  }

  .btns {
    display: flex;
    gap: 2px;

    & input[type='radio'] {
      display: none;
    }

    & > div {
      padding: 0 3px;
      cursor: pointer;
      transition: background-color 0.3s;

      & > label {
        cursor: pointer;
      }
    }

    & > div:hover {
      background-color: rgb(239, 213, 213);
    }
    & > .selected {
      background-color: rgb(245, 235, 235);
    }
  }

  .clear {
    cursor: default;
  }

  .clear:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>