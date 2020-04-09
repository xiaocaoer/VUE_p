<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="checkedAll" />
    </label>
    <span>
      已完成<span>{{checkedCount}}</span> / 全部<span style="color: red;">{{totalChecked}}</span>
    </span>
    <button class="btn btn-danger" @click="clear">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    props: {
      listArr: Array
    },
    computed: {
      checkedCount() {
        //算出listArr中有几个checked是真的item,将这个数字返回,遍历数组,累加
        //第一个参数是回调函数,第二个参数是初始值
        return this.listArr.reduce((adder, item) => {
          //adder表示第二个设置的初始值,从0开始,item表示数组的每一项
          adder = adder + (item.checked ? 1 : 0)
          return adder
        }, 0)
      },
      totalChecked() {
        return this.listArr.length
      },
      checkedAll: {
        get() {
          //当上面两个计算属性不为0,且相等时,checkedAll值为真,处于选中状态
          let flag = this.totalChecked !== 0 && this.checkedCount !== 0
          return flag && this.checkedCount === this.totalChecked
        },
        set(val){
          //直接去改变了这个的值,将这个值传递给APP,让修改所有数据的checked,
          //让这个属性的值真的变成要改完的值
          this.$emit("checkedAll",val)
        }
      }
    },
    methods: {
      clear() {
        //子向父传值,触发子组件上的自定义事件,事件回调是父组件中的方法
        this.$emit("clear")
      }
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
