<script>
export default {
name: "ButtonComponent"
}
</script>

<template>
  <button class="button" :class="type" @click="$emit('click')">
    {{ name }}
  </button>
</template>

<style scoped>

</style>