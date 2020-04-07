<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <header></header>
        <list></list>
        <footer></footer>
      </div>
    </div>
  </div>
</template>

<script>
import header from './components/header'
import list from './components/list'
import footer from './components/footer'

  export default {
    name: 'App'
  }

</script>

<style>
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
