<template>
  <div>
    <BaseInput
      v-model="search"
      placeholder="Search For products"
      class="input"
    />
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";
import { debounce } from "lodash";

export default {
  components: {
    BaseInput,
  },
  data() {
    return {
      search: "", // This is the search query bound to the input field
    };
  },
  /**
   * Watcher for the 'search' property.
   * This method is triggered every time the 'search' data property changes.
   * It calls the debounced function to emit the search event.
   *
   * @param {string} newSearch - The new value of the search query.
   * @returns {void}
   */
  watch: {
    search(newSearch) {
      this.debouncedEmitSearch(newSearch);
    },
  },
  /**
   * Lifecycle hook called when the component is created.
   * This method initializes the debouncedEmitSearch function with a debounce delay of 2500 milliseconds.
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    this.debouncedEmitSearch = debounce((query) => {
      this.$emit("xyz", query);
    }, 2500);
  },
};
</script>

<style scoped>
.input {
  width: 40vw;
  height: 4vh;
  margin-top: 0.2rem;
  border-radius: 5px;
  border: 1px solid lightgray;
  padding: 1.2rem;
  margin-left: 7.5rem;
}
</style>
