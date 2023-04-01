<template>
  <div class="">
    <q-card>
      <q-btn @click="OnClick()" />
    </q-card>
  </div>
  {{ $store.state.auth.branchId }}
</template>

<script setup>
import Toast from '../Helper/toast'

const OnClick = () => {
  Toast.info({})
}
</script>

<style scoped></style>
