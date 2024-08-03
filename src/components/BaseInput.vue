<template>
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    
  />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: {
      type: String,
    },
  },
};
</script>

