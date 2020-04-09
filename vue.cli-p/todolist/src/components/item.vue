<template>
  <li :class="{highlight:highlight ,line:checked}"
  @mouseenter="highlight=!highlight" 
  @mouseleave="highlight=false"
  >
    <label>
      <input type="checkbox" v-model="checked"/>
      <span>{{item.text}}</span>
    </label>
    <button class="btn btn-danger" @click="deleteItem" :style="{display:highlight ? 'block' :'none'}">删除</button>
  </li>
</template>

<script>
  export default {
    name: 'Item',
    data(){
      return{
        highlight:false
      }
    },
    props:{
      item:{
        type:Object
      }
    },
    computed:{
      checked:{
        get(){
          return this.item.checked
        },
        set(val){
          // console.log(val,this.item.id)
          //val就是想要改变成的值,传递给父组件去修改
          this.$bus.$emit('updateChecked',val,this.item.id)
        }
      }

    },
    methods:{
      deleteItem(){
        console.log(this)//vue 实例
        this.$bus.$emit("deleteItem",this.item.id)
      }
    }
  }

</script>

<style scoped>
  /* line类就代表那个li */
  .line{
    position: relative;
  }
  /* 伪元素是行内元素 */
  .line:after{
    content: '';
    display: block;
    background: red;
    height: 1px;
    width: 90%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
 .highlight{
  background-color: pink;
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
