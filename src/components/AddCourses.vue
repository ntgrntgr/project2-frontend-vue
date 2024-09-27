<script setup>
defineProps({

})
</script>

<template>
 <div class="course-container">
    <h1 class="green">Add a New Course</h1>
   
    <div class="add-course">
        <div>
        <label>Course Title</label><br>
        <input type="text" placeholder="Enter Course Title" />
        </div>
        <br>
<div>
        <label>Course Description</label><br>
      <textarea style="width: 200px; height:100px;">  </textarea>
      </div>
      <div>
        <label>Enrollment</label><br>
      <input type="number" value=""/>
      </div>
       <div>
        <label>Department</label><br>
      <input type="text" value=""/>
      </div>
       <div>
        <label>Semester</label><br>
      <input type="text" value=""/>
      </div>
      <br>
     <div>
      <button style="margin: auto;">Add</button>
    </div>
  </div>
  </div>
</template>

<style scoped>
.course-container{
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

}

 button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  margin-left: 2px; /* Added margin to move the button 5px to the right */
}
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
