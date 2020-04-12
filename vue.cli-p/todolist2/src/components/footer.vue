<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="allChecked" />
    </label>
    <span>
      已完成<span>{{checkedItem}}</span> / 全部<span>{{allItems}}</span>
    </span>
    <button class="btn btn-danger" @click="clearItem">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    props: {
      listArr: {
        type: Array
      }
    },
    methods: {
      clearItem() {
        //子向父传值,清除所有已完成任务,
        this.$emit('clearItem')
      }
    },
    computed: {
      checkedItem() {
        return this.listArr.reduce((adder, item) => {
          if (item.checked) {
            adder++
          }
          return adder
        }, 0)
      },
      allItems(){
        return this.listArr.length
      },
      //全选全不选逻辑:
      allChecked: {
        get() {
          let flag = this.checkedItem!== 0 && this.allItems !== 0
          return flag && this.checkedItem===this.allItems
        },
        set(val){
        //手动去改,进入这个函数,子向父传值,vue自定义事件
          this.$emit("allChecked",val)
        }
      },
    }
  }

</script>

<style scoped>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>
