<template>
  <div>
    <h3>Result :</h3>
    <!-- 
      > Result

        > Employee ( can be multiple )
          > Form
            > Name
            > Tax code
            > Hour rate
            > Hours per week
            > PAYE
            > Student loan
            > NET
     -->
     <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Rate</th>
          <th scope="col">Hours</th>
          <th scope="col">PAYE</th>
          <th scope="col">SL</th>
          <th scope="col">NET</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ employee.name }}</td>
          <td>${{ employee.rate }}</td>
          <td>{{ employee.hours }}</td>
          <td>{{ employee.paye }}</td>
          <td>{{ employee.studentLoan }}</td>
          <td>{{ employee.net }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'YourResult',
  computed: {
    employees() {
      return this.$store.getters.getEmployees;
    }
  }
}
</script>