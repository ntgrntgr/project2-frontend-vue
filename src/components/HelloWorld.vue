<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Find the perfect course to enhance your skills
    </h3>
    <div class="search-bar">
      <input type="text" placeholder="Search for courses..." />
      <button>Search</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.search-bar input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

.search-bar button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  margin-left: 2px; /* Added margin to move the button 5px to the right */
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }

  .search-bar {
    justify-content: flex-start;
  }
}
</style>
