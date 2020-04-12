<template>
  <li :class="className"
  @mouseenter="className.highLight = true"
  @mouseleave="className.highLight = false"
  >
    <label>
      <input type="checkbox" v-model="checked"/>
      <span>{{item.text}}</span>
    </label>
    <button class="btn btn-danger" @click="deleteItem" :style="{display: className.highLight ? 'block' : 'none'}">删除</button>
  </li>
</template>

<script>
export default {
  name: 'Item',
  props:{
    item:Object
  },
  data(){
    return{
      className:{
        line:false,
        highLight:false,
      }
    }
  },
  computed:{
    checked:{
      get(){
        return this.item.checked
      },
      set(val){
        //当checked的值要变化时,set被调用,非父子间传值,传给app修改item的值
        this.$bus.$emit('updateChecked',val,this.item.id)
      }
    }
  },
  watch:{
    checked(val){
      this.className.line=val
    }
  },
  methods:{
    //删除Item,非父子组件间的传值,总线形式
    //每个Item直接是没有任何关系的,你点当前item的删除按钮,在这里传参读值的时候读到的就是这个item的id
    deleteItem(){
      this.$bus.$emit("deleteItem",this.item.id)
    }
  },

}
</script>

<style scoped>
  /* 需求: 
        选中后假条划掉的任务的横线
        删除任务按钮只有在鼠标移入后在显示
  */
.highLight{
  background: pink;
}
/* 利用伪元素模拟横线 */
.line{
  position: relative;
}
.line:before{
  content: '';
  display: block;
  width: 85%;
  height: 1px;
  background:red;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
  position: relative;
  z-index: 1;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>