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
      this.items.push({
        content: message,
        isChecked: false
      })
    },
    deleteItem: function (index) {
      this.items.splice(index, 1)
    },
    changeItemContent: function (index, content) {
      if (content) this.items[index].content = content
      else this.items.splice(index, 1)
    },
    changeItemStatus: function (index, status) {
      this.items[index].isChecked = status
    },
    selectedChange: function (selected) {
      this.selected = selected
    },
    clearCompletedItems: function () {
      this.items = this.items.filter(function (item) {
        return !item.isChecked
      })
    }
  },
  created: function () {
    this.items = JSON.parse(localStorage.getItem('items')) || []
  },
  mounted() {
    const items = this.items

    window.onbeforeunload = function () {
      localStorage.setItem('items', JSON.stringify(items))
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