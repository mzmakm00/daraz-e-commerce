<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination mt-5 justify-content-center">
      <li class="page-item" @click="previousPage">
        <a class="page-link" href="#">Previous</a>
      </li>
      <li
        v-for="pageNumber in pagesToShow"
        :key="pageNumber"
        :class="{ 'page-item': true, active: pageNumber === currentPage }"
        @click="goToPage(pageNumber)"
      >
        <a class="page-link" href="#">{{ pageNumber }}</a>
      </li>
      <li class="page-item" @click="nextPage">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>
  
  <script>
export default {
  name: "PaginationComponent",
  props: {
    totalPages: Number,
    currentPage: Number,
    pageRange: {
      type: Number,
      default: 5,
    },
  },
  computed: {
  /**
   * This property to determine the range of pages to display in the pagination control
   * It calculates the start and end page numbers based on the current page and the page range
   * Ensures that the page numbers stay within the valid range from 1 to totalPages
   * 
   * @param {none}
   * @returns {Array} - Array of page numbers to be displayed
   */
  pagesToShow() {
    // Calculate the starting page number by subtracting half of the page range from the current page
    // Ensures the starting page is at least 1
    const startPage = Math.max(
      1,
      this.currentPage - Math.floor(this.pageRange / 2)
    );
    
    // Calculate the ending page number by adding the page range to the starting page
    // Ensures the ending page does not exceed the total number of pages
    const endPage = Math.min(this.totalPages, startPage + this.pageRange - 1);

    // Create an array to hold the page numbers
    const pages = [];
    
    // Populate the array with the page numbers from startPage to endPage
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Return the array of page numbers to be displayed
    return pages;
  },
},
methods: {
  /**
   * This methods check if the current page is greater than 1 to prevent negative paage numbers
   * And Emit a custom event 'page-change' with the new page number 
   *  @param  {none}
   *  @returns {void}
   */
  previousPage() {
    if (this.currentPage > 1) {
      this.$emit("page-change", this.currentPage - 1);
    }
  },

  /**
   * This methods to navigate to the next page
   * Check if the current page is less than totalpages to prevent exceeding the page limit 
   *  @param  {none}
   *  @returns {void}
   */
  nextPage() {
    // Check if current page is less than the total pages to prevent exceeding the page limit
    if (this.currentPage < this.totalPages) {
      // Emit a custom event 'page-change' with the new page number
      this.$emit("page-change", this.currentPage + 1);
    }
  },
  /**
   * Method to navigate to a specific page 
   *  @param  {none}
   *  @returns {void}
   */
  goToPage(pageNumber) {
    // Emit a custom event 'page-change' with the specified page number
    this.$emit("page-change", pageNumber);
  },
},
};
</script>
  
  <style scoped>
.active {
  font-weight: bold;
}
</style>
  