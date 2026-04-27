<template>
  <RouterView />
</template>

<style>
  *::-webkit-scrollbar {
    height: 7px;
    width: 7px;
  }

  *::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: #FAFAFA;
  }

  *::-webkit-scrollbar-track:hover {
    background-color: #F5F5F5;
  }

  *::-webkit-scrollbar-track:active {
    background-color: #E5E5E5;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #A3A3A3;
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: #737373;
  }

  *::-webkit-scrollbar-thumb:active {
    background-color: #737373;
  }
</style>
