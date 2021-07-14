<template>
  <div>
    <div class="mask" @click="editing = false" v-show="editing"></div>

    <div class="todo-item">
      <input
        type="checkbox"
        :id="itemIndex"
        v-model="checked"
        @change="changeItemStatus"
      />
      <label :for="itemIndex" v-show="!editing">
        <img :src="tickImg" v-show="checked" />
      </label>

      <input
        type="text"
        :id="`${itemIndex}text`"
        :style="{ zIndex: inputZIndex }"
        v-model="content"
        @change="changeItemContent"
        @keyup.enter="editing = false"
        v-if="editing"
      />
      <label
        :for="`${itemIndex}text`"
        class="item-content"
        @dblclick="editItem"
        v-if="!editing"
      >
        {{ content }}
      </label>

      <div class="delete">
        <img :src="crossImg" @click="deleteItem" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  data: function () {
    return {
      checked: this.itemStatus,
      tickImg: require('../assets/tick.svg'),
      crossImg: require('../assets/cross.svg'),
      content: this.itemContent,
      editing: false
    }
  },
  props: {
    itemIndex: Number,
    itemContent: String,
    itemStatus: Boolean
  },
  computed: {
    inputZIndex: function () {
      return this.editing ? 2 : 0
    }
  },
  methods: {
    deleteItem: function () {
      this.$emit('delete', this.itemIndex)
    },
    changeItemContent: function () {
      this.$emit('changeItemContent', this.itemIndex, this.content)
    },
    changeItemStatus: function () {
      this.$emit('changeItemStatus', this.itemIndex, this.checked)
    },
    editItem: function () {
      if (!this.checked) this.editing = true
    }
  }
}
</script>

<style lang="less" scoped>
.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.todo-item {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 16px 16px 16px 60px;
  width: 100%;
  min-height: 69px;
  line-height: 36px;
  word-break: break-all;
  border-bottom: 1px solid rgb(230, 230, 230);

  input[type='checkbox'] {
    display: none;

    & + label {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translate(0, -50%);
      width: 28px;
      height: 28px;
      background-color: #fff;
      border: 1px solid rgb(237, 237, 237);
      border-radius: 50%;

      & > img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 16px;
        height: 16px;
      }
    }

    &:checked + label {
      border: 1px solid rgb(189, 218, 213);
    }

    &:checked ~ .item-content {
      text-decoration: line-through;
      color: rgb(217, 217, 217);
    }
  }

  input[type='text'] {
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    padding: 0;
    font: inherit;
    line-height: 36px;
    color: rgb(77, 77, 77);
    background-color: rgb(255, 255, 255);
    border: 0;
    box-shadow: inset 0px 0px 4px rgb(153, 153, 153);
    outline: 0;
  }

  .delete {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 68px;
    width: 68px;

    & > img {
      display: none;
      margin: 25px;
      height: 18px;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.7);
      }
    }

    &:hover > img {
      display: block;
    }
  }
}
</style>