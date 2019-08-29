<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
div,section,p,span{
  padding: 0;
  margin: 0;
  font-size: 14px;
  box-sizing: border-box;
}
button{
  outline: none;
  border: none;
}
table{
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.title-tr{
  background-color: #f3f3f3;
  height: 37px;
}
.common-tr{
  background: #fff;
  height: 60px;
}
td{
  border: 1px solid #ddd;
  text-align: center;
  padding: 0 5px;
}
</style>
