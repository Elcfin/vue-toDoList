<template>
  <div class="todo-list" :class="shadow">
    <todo-list-input
      :unCheckedNumber="unCheckedNumber"
      :totalNumber="totalNumber"
      :isItemChecked="isItemChecked"
      @addNewItem="addNewItem"
      @changeItemStatus="changeItemStatus"
    ></todo-list-input>
    <div class="todo-list-items">
      <todo-list-item
        v-for="key in itemList"
        :key="key.dataId"
        :itemIndex="key.index"
        :itemContent="String(key.data)"
        :itemStatus="key.isChecked"
        @delete="deleteItem"
        @changeItemContent="changeItemContent"
        @changeItemStatus="changeItemStatus"
      >
      </todo-list-item>
    </div>

    <todo-list-status-bar
      :unCheckedNumber="unCheckedNumber"
      :checkedNumber="checkedNumber"
      :totalNumber="totalNumber"
      :isItemChecked="isItemChecked"
      @delete="deleteItem"
      @selectedChange="selectedChange"
    ></todo-list-status-bar>
  </div>
</template>

<script>
import TodoListItem from './TodoListItem.vue'
import TodoListStatusBar from './TodoListStatusBar.vue'
import TodoListInput from './TodoListInput.vue'

export default {
  name: 'TodoList',
  components: {
    TodoListItem,
    TodoListStatusBar,
    TodoListInput
  },
  data: function () {
    return {
      itemContents: [],
      isItemChecked: [],
      selected: 'All'
    }
  },
  computed: {
    shadow: function () {
      return !this.isItemChecked.length ? 'shadow-dark' : 'shadow-light'
    },
    unCheckedNumber: function () {
      return this.isItemChecked.filter(function (item) {
        return !item
      }).length
    },
    checkedNumber: function () {
      return this.isItemChecked.filter(function (item) {
        return item
      }).length
    },
    totalNumber: function () {
      return this.isItemChecked.length
    },
    itemList: function () {
      const list = {}
      const _this = this
      switch (this.selected) {
        case 'All':
          this.itemContents.forEach(function (element, index) {
            const isChecked = _this.isItemChecked[index]
            list[index] = {
              data: element,
              isChecked,
              index,
              dataId: isChecked + index + element
            }
          })
          break
        case 'Active':
          this.itemContents.forEach(function (element, index) {
            const isChecked = _this.isItemChecked[index]
            if (!isChecked) {
              list[index] = {
                data: element,
                isChecked,
                index,
                dataId: isChecked + index + element
              }
            }
          })
          break
        case 'Completed':
          this.itemContents.forEach(function (element, index) {
            const isChecked = _this.isItemChecked[index]
            if (isChecked) {
              list[index] = {
                data: element,
                isChecked,
                index,
                dataId: isChecked + index + element
              }
            }
          })
          break
      }
      return list
    }
  },
  methods: {
    addNewItem: function (message) {
      this.itemContents.push(message)
      this.isItemChecked.push(false)
    },
    deleteItem: function (index) {
      this.itemContents.splice(index, 1)
      this.isItemChecked.splice(index, 1)
    },
    changeItemContent: function (index, content) {
      if (content) this.itemContents.splice(index, 1, content)
      else {
        this.itemContents.splice(index, 1)
        this.isItemChecked.splice(index, 1)
      }
    },
    changeItemStatus: function (index, status) {
      this.isItemChecked.splice(index, 1, status)
    },
    selectedChange: function (selected) {
      this.selected = selected
    }
  },
  created: function () {
    const itemContents = JSON.parse(localStorage.getItem('itemContents'))
    const isItemChecked = JSON.parse(localStorage.getItem('isItemChecked'))
    const _this = this

    isItemChecked.forEach(function (item) {
      _this.isItemChecked.push(item)
    })
    itemContents.forEach(function (item) {
      _this.itemContents.push(item)
    })
  },
  mounted() {
    const itemContents = this.itemContents
    const isItemChecked = this.isItemChecked

    window.onbeforeunload = function () {
      localStorage.setItem('itemContents', JSON.stringify(itemContents))
      localStorage.setItem('isItemChecked', JSON.stringify(isItemChecked))
    }
  }
}
</script>

<style lang="less" scoped>
@color-dark: rgb(115, 115, 115);
@color-light: rgb(230, 230, 230);
@bg-color: rgb(254, 254, 254);

.shadow-dark {
  box-shadow: 0px 4px 10px rgba(161, 154, 154, 0.6);
}

.shadow-light {
  box-shadow: 0px 2px 6px rgba(161, 154, 154, 0.6);
}

.todo-list {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  color: rgb(77, 77, 77);
  background-color: @bg-color;

  .todo-list-items {
    display: flex;
    flex-direction: column;
    font-size: 1.5em;
    color: rgb(77, 77, 77);
  }
}
</style>