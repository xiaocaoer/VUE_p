<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <todo-header @addItem="addItem"></todo-header>
        <todo-list :listArr="listArr"></todo-list>
        <todo-footer :listArr="listArr" @clear="clear" @checkedAll="checkedAll"></todo-footer>
      </div>
    </div>
  </div>
</template>

<script>
  import util from 'util'//配置了别名,文件名没有写默认去找index.js
  import header from 'components/header.vue'
  import list from 'components/list.vue'
  import footer from 'components/footer.vue'
  //App.vue是我们业务逻辑上的根组件,真正的根组件在main.js中,所以data不能写对象形式
  //上面传递过来的是一个组件的配置对象,要想让其成为组件,就要定义
  export default {
    name: 'App',
    components: {
      "todo-header": header,
      "todo-list": list,
      "todo-footer": footer
    },
    data() {
      return {
        listArr: []
      }
    },
    mounted(){
      //组件挂载完毕后读取数据
      this.listArr = util.get("todoList",[])
    },
    watch:{
      //浅监听,只能监听到数据多了少了,不能监听到数据内部细节的改变
      // listArr(){
      //   //当listArr数据发生改变时触发
      // }
      //深度监听
      listArr:{
        handler:(val) => {//数据发生改变时的回调,改变时存入本地存储中
          // val表示发生改变 后的listArr
          console.log(val)
          //更新那个元素,值
          util.set('todoList',val)
        },
        deep:true,
      },
    },
    methods: {
      //全选全不选功能
      checkedAll(val){
        // this.listArr.forEach((item) => {
        //   item.checked = val
        // })
        //map方法加工数组,不影响原数组,将数组每一项加工完后返回,形成新的数组
       this.listArr =  this.listArr.map((item) => {
          item.checked = val
          return item
        })
      },
      //清除已完成
      clear() {
        //过滤掉checked是true的,返回是false的
        this.listArr=this.listArr.filter((item) => {
          return !item.checked
        })
      },
      addItem(item) {
        this.listArr.unshift(item)
      },
      deleteItem(id) {
        this.listArr = this.listArr.filter((item) => {
          return item.id !== id
        })
      },
      updateChecked(val, id) {
        //forEach方法,遍历数组,可以拿到数组的每一项,通过判断筛选出自己想要的向,进行操作
        this.listArr.forEach((item) => {
          if (item.id === id) {
            item.checked = val
          }
        })
      }
    },
    created() {
      //可以将组建自定义事件的回调写在methods中
      this.$bus.$on("deleteItem", this.deleteItem),
        this.$bus.$on("updateChecked", this.updateChecked)
      // this.$bus.$on("updateChecked", (val, id) => {
      //   //找到这个id的数组元素,修改checked属性,

      //   //find方法,返回return为真的那项,不影响原数组
      //   // let result = this.listArr.find((item) => {
      //   //   return item.id == id
      //   // })
      //   // // console.log(result)
      //   // result.checked = val

      //   //forEach方法,遍历数组,可以拿到数组的每一项,通过判断筛选出自己想要的向,进行操作
      //   this.listArr.forEach((item) => {
      //     if (item.id === id) {
      //       item.checked = val
      //     }
      //   })
      // })
    },


  }

</script>

<style scoped>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }

  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

</style>
