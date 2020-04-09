<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model.trim="text" @keydown.13="addItem" />
  </div>
</template>

<script>
import util from 'util'

// let id = 3//这种将id写死的方式,当刷新浏览器时,id会重新开始算起,导致id不唯一
//将id也写入localStorage中去
export default {
  name: 'Header',
  data(){
    return{
      text:''
    }
  },
  methods:{
    //当按下回车键时,需要将header的内容添加到app的数据中,跨组件了,子向父传值
    addItem(){
      //一上来去读浏览器中的id,如果没有,返回0
      let id = util.get('todoId',0)
      util.set('todoId',++id)//再增加1设置进去
      // id++
      let item={id,text:this.text,checked:false}
      this.$emit("addItem",item)
      this.text=''
    }
  }
}
</script>

<style scoped>
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
