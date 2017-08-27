export const PAGE_SIZE = 5;

class Page {
  constructor(items = [], totalItems = 0, pageNumber = 0) {
    this.items = items;
    this.totalItems = totalItems;
    this.pageNumber = pageNumber;
  }
}

export default Page;