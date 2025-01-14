<script setup>
defineProps(['modelValue','name', 'type'])
defineEmits(['update:modelValue'])

</script>
<template>
  <label :for="name">{{ this.name }}</label>
  <input :type="type" :name="name" :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)" :placeholder="name">

</template>

<style scoped>
label{
  display: block;
  margin-bottom: 5px;
  color: white;
  font-size: 40px;
}
input{
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  box-sizing: border-box;
  background-color: #1f1f1f;
  color: #ff6088;
  font-size: 24px;
}

</style>