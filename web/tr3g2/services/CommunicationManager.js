export default {
  async fetchItems() {
    const response = await fetch("http://localhost:3001/shopSkins");
    const data = await response.json();
    return data;
  },
};
