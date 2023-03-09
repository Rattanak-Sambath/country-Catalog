<script setup>
import {  onMounted } from 'vue';
import axios from 'axios';
const getTable = async ()=>{  
     let res = await axios.get('http://localhost:3001/api/auth/getUser')
     console.log(res.data);
}
onMounted(()=>{
    getTable();
})
</script>

<template>
  <div>
    <p>{{ $t('title.dashboard') }}</p>
  </div>
</template>

<style scoped>
</style>
