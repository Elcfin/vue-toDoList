<template>
  <div class="todo-list" :class="shadow">
    <todo-list-input
      :items="items"
      @addNewItem="addNewItem"
      @changeItemStatus="changeItemStatus"
    ></todo-list-input>
    <div class="todo-list-items">
      <todo-list-item
        v-for="item in itemsShown"
        :key="item.key"
        :itemIndex="item.index"
        :itemContent="String(item.content)"
        :itemStatus="item.isChecked"
        @delete="deleteItem"
        @changeItemContent="changeItemContent"
        @changeItemStatus="changeItemStatus"
      >
      </todo-list-item>
    </div>

    <todo-list-status-bar
      :items="items"
      @clearCompletedItems="clearCompletedItems"
      @selectedChange="selectedChange"
    ></todo-list-status-bar>
  </div>
</template>

<script>
import TodoListItem from './TodoListItem.vue'
import TodoListStatusBar from './TodoListStatusBar.vue'
import TodoListInput from './TodoListInput.vue'
import {
  addNewItem as apiAddNewItem,
  deleteItem as apiDeleteItem,
  updateItem as apiUpdateItem,
  getItems as apiGetItems
} from '../api/index.js'

export default {
  name: 'TodoList',
  components: {
    TodoListItem,
    TodoListStatusBar,
    TodoListInput
  },
  data: function () {
    return {
      items: [],
      selected: 'All'
    }
  },
  computed: {
    shadow: function () {
      return !this.items.length ? 'shadow-dark' : 'shadow-light'
    },
    itemsShown: function () {
      const selected = this.selected

      return this.items
        .map(function (item, index) {
          const isChecked = item.isChecked
          const content = item.content
          return {
            content,
            isChecked,
            index,
            key: `${isChecked}-${index}-${content}`,
            selectedCondition: {
              All: true,
              Active: !isChecked,
              Completed: isChecked
            }
          }
        })
        .filter(function (item) {
          return item.selectedCondition[selected]
        })
    }
  },
  methods: {
    addNewItem: function (message) {
      const data = {
        content: message,
        isChecked: false,
        timestamp: Date.now()
      }
      this.items.push(data)
      apiAddNewItem(data)
    },
    deleteItem: function (index) {
      const data = {
        content: this.items[index].content,
        isChecked: this.items[index].isChecked,
        timestamp: this.items[index].timestamp
      }
      this.items.splice(index, 1)
      apiDeleteItem(data)
    },
    changeItemContent: function (index, content) {
      if (content) {
        const findCondition = {
          content: this.items[index].content,
          isChecked: this.items[index].isChecked,
          timestamp: this.items[index].timestamp
        }
        const newContent = { isChecked: status }
        this.items[index].content = content
        apiUpdateItem(findCondition, newContent)
      } else {
        const data = {
          content: this.items[index].content,
          isChecked: this.items[index].isChecked,
          timestamp: this.items[index].timestamp
        }
        this.items.splice(index, 1)
        apiDeleteItem(data)
      }
    },
    changeItemStatus: function (index, status) {
      const findCondition = {
        content: this.items[index].content,
        isChecked: this.items[index].isChecked,
        timestamp: this.items[index].timestamp
      }
      const newContent = { isChecked: status }
      this.items[index].isChecked = status
      apiUpdateItem(findCondition, newContent)
    },
    selectedChange: function (selected) {
      this.selected = selected
    },
    clearCompletedItems: function () {
      this.items = this.items.filter(function (item, index, arr) {
        const data = {
          content: arr[index].content,
          isChecked: arr[index].isChecked,
          timestamp: arr[index].timestamp
        }
        apiDeleteItem(data)
        return !item.isChecked
      })
    }
  },
  created: async function () {
    const result = await apiGetItems()
    this.items = result.data
    /* this.items = JSON.parse(localStorage.getItem('items')) || [] */
  },
  mounted() {
    /* const items = this.items
    window.onbeforeunload = function () {
      localStorage.setItem('items', JSON.stringify(items))
    } */
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