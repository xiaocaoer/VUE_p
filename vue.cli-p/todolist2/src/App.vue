<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <v-header @addList="addList"></v-header>
        <v-list :listArr="listArr"></v-list>
        <v-footer :listArr="listArr" @clearItem="clearItem"  @allChecked="allChecked" ></v-footer>
      </div>
    </div>
  </div>
</template>

<script>
  import header from './components/header.vue'
  import list from './components/list.vue'
  import footer from './components/footer.vue'
  import util from 'util'
  export default {
    name: 'App',
    components:{
      "v-header":header,
      "v-list":list,
      "v-footer":footer,
    },
    data(){
      return{
        listArr:[]
      }
    },
    //组件挂载完毕后
    mounted(){
      //数据持久化,将数据存储在localStorage中,读取数据
      this.listArr = util.get("todoList",[])
    },
    //组件初始化完毕后
    created(){
      this.$bus.$on("deleteItem",this.deleteItem),
      this.$bus.$on("updateChecked",this.updateChecked)
    },
    watch:{
      //监听listArr,一有变动,写入浏览器localStorage
      //深度监听,感知listArr中对象里的变动
      listArr:{
        handler:(newListArr) => {
          util.set("todoList",newListArr)
        },
        deep:true
      }
    },
    methods:{
      //全选全不选
      allChecked(val){
        this.listArr.forEach((item) => {
          item.checked=val
        })
      },
      clearItem(){
        this.listArr = this.listArr.filter((item) => {
          return !item.checked
        })
      },
      updateChecked(val,id){
        // console.log(val,id)
        this.listArr.forEach((item) => {
          if(item.id === id){
            item.checked = val
          }
        })
      },
      deleteItem(id){
        // console.log(id)假删除,让这个ID的item不显示,filter方法不影响原数组
        this.listArr = this.listArr.filter((item) => {
          return item.id !==id
        })
      },
      addList(newItem){
        //接收到来自于input框的内容
        console.log(newItem)
        this.listArr.unshift(newItem)
      }
    }

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
