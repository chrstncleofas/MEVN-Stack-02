<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Students</h1>
    <table class="table-auto w-full mb-4">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Age</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student._id" class="mb-2">
          <td class="border px-4 py-2">{{ student.name }}</td>
          <td class="border px-4 py-2">{{ student.age }}</td>
          <td class="border px-4 py-2">{{ student.email }}</td>
          <td class="border px-4 py-2">
            <button @click="editStudent(student)" class="bg-yellow-500 text-white px-2 py-1 mr-2">
              <font-awesome-icon :icon="['fas', 'edit']" />
            </button>
            <button @click="deleteStudent(student._id)" class="bg-red-500 text-white px-2 py-1">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h2 class="text-xl font-bold mb-2">{{ editMode ? 'Edit' : 'Add' }} Student</h2>
    <form @submit.prevent="editMode ? updateStudent() : addStudent()" class="mb-4">
      <input v-model="name" placeholder="Name" required class="border p-2 mb-2 w-full text-cyan-800" />
      <input v-model="age" type="number" placeholder="Age" required class="border p-2 mb-2 w-full text-cyan-800" />
      <input v-model="email" placeholder="Email" required class="border p-2 mb-2 w-full text-cyan-800" />
      <button type="submit" class="bg-blue-500 text-white p-2">{{ editMode ? 'Update' : 'Add' }}</button>
      <button type="button" @click="cancelEdit" v-if="editMode" class="bg-gray-500 text-white p-2 ml-2">Cancel</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      students: [],
      name: '',
      age: '',
      email: '',
      editMode: false,
      currentStudentId: null
    };
  },
  created() {
    this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        this.students = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addStudent() {
      try {
        const newStudent = {
          name: this.name,
          age: this.age,
          email: this.email
        };
        await axios.post('http://localhost:5000/api/students', newStudent);
        this.fetchStudents();
        this.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
    editStudent(student) {
      this.name = student.name;
      this.age = student.age;
      this.email = student.email;
      this.currentStudentId = student._id;
      this.editMode = true;
    },
    async updateStudent() {
      try {
        await axios.put(`http://localhost:5000/api/students/${this.currentStudentId}`, {
          name: this.name,
          age: this.age,
          email: this.email
        });
        this.fetchStudents();
        this.resetForm();
        this.editMode = false;
        this.currentStudentId = null;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteStudent(id) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        this.fetchStudents();
      } catch (error) {
        console.error(error);
      }
    },
    cancelEdit() {
      this.resetForm();
      this.editMode = false;
      this.currentStudentId = null;
    },
    resetForm() {
      this.name = '';
      this.age = '';
      this.email = '';
    }
  }
};
</script>
  