<template>
  <button
    class="btn"
    :style="{ color: color, backgroundColor: background }"
    v-on="$listeners"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    background: {
      type: String,
    },
  },
};
</script>

<style>
.btn {
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.6rem 0.8rem;
  border-radius: 0.325rem;
  border: none;
}
</style>
