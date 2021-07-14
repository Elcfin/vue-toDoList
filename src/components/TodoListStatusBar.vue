<template>
  <div class="status-bar">
    <div class="number">
      {{ unCheckedNumber + ' item(s) left' }}
    </div>
    <div class="btns">
      <div
        v-for="(item, index) in btns"
        :key="item"
        :class="{ selected: item === selected }"
      >
        <input
          type="radio"
          :id="`${index}select`"
          :value="item"
          v-model="selected"
        />
        <label :for="`${index}select`"> {{ item }}</label>
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
    unCheckedNumber: Number,
    checkedNumber: Number,
    totalNumber: Number,
    isItemChecked: Array
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
      return this.checkedNumber ? 'visible' : 'hidden'
    }
  },
  methods: {
    clearCompletedItems() {
      for (let i = this.totalNumber - 1; i >= 0; i--)
        if (this.isItemChecked[i]) {
          this.$emit('delete', i)
        }
    }
  },
  watch: {
    selected: function () {
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