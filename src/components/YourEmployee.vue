<template>
  <div class="mb-5">
    <!-- 
      > Employees 
        > Employee ( can be multiple )
          > Form
            > Name
            > Tax code
            > Hour rate
            > Hours per week
     -->
     <!-- 
      After this
        choose day `Mon, Tue, ... , Sun`
        calculate hours from `start time ~ finish time`
      -->
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2">
          <div class="employee-form">
            <div class="controls">
              <div class="row mb-2">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="form_name">Name</label>
                    <input 
                      v-model="employee.name"
                      id="form_name" 
                      type="text" 
                      name="name" 
                      class="form-control" 
                      placeholder="Please enter employee name" 
                      required="required" 
                      data-error="name is required."
                    >
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="tax_code">Tax code</label>
                    <select 
                      v-model="employee.taxcode"
                      id="tax_code" 
                      class="form-select" 
                      aria-label="Default select example" 
                      required="required" 
                      data-error="tax code is required."
                    >
                      <option value="null" disabled>Select tax code</option>
                      <option value="m">M</option>
                      <option value="me">ME</option>
                      <option value="msl">MSL</option>
                      <option value="mesl">MESL</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="hourly-rate">Hourly rate</label>
                    <input 
                      v-model="employee.rate"
                      id="hourly-rate" 
                      type="number" 
                      name="name" 
                      class="form-control" 
                      min="1"
                      placeholder="Enter hourly rate" 
                      required="required" 
                      data-error="hourly rate is required."
                    >
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="hours">Hours in week</label>
                    <input
                      v-model="employee.hours"
                      id="hours" 
                      type="number" 
                      name="hours" 
                      class="form-control" 
                      min="1"
                      placeholder="hours" 
                      required="required" 
                      data-error="hours is required."
                    >
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div 
                    class="btn btn-success btn-send"
                    @click="saveForm"
                  >Result <span><img :src="enterIcon"/></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'YourEmployees',
  data() {
    return {
      enterIcon: require('../assets/EnterIcon.svg'),
      employee: {
        hours: null,
        name: '',
        net: 0, 
        paye: 0,
        rate: null,
        studentLoan: 0,
        taxcode: null,
      }
    }
  },
  computed: {
    employees() {
      return this.$store.getters.getEmployees;
    }
  },
  methods: {
    saveForm() {

      const gross = parseFloat(this.employee.rate),
            hours = parseFloat(this.employee.hours),
            weekly = gross*hours,
            salary = weekly*52,
            tax1 = 14000,
            tax2 = 48000,
            tax3 = 70000,
            tax4 = 139384,
            tax5 = 180000;

      let add_more = 0,
          paye = 0,
          studentLoan = 0,
          take_off = 0,
          tax_percentage = 0,
          validation = true;

      if(salary <= tax1) {
        tax_percentage = 0.1203;
        // (총 금액의 * 0.1203)
      } else if (salary > tax1 && salary <= tax2) {
        tax_percentage = 0.1903,
        add_more = 32.3884;
        take_off = tax1;
        // ((총금액-14000) * 0.1903)+32.3884
      } else if (salary > tax2 && salary <= tax3) {
        tax_percentage = 0.3153,
        add_more = 156.8153;
        take_off = tax2;
        // ((총금액의-48000) * 0.3153)+124.4269+32.3884
      } else if (salary > tax3 && salary <= tax4) {
        tax_percentage = 0.3453,
        add_more = 290.2114;
        take_off = tax3;
        // ((70824-70000)*0.3453/52)+133.3961+124.4269+32.3884
      } else if (salary > tax4 && salary <= tax5) {
        tax_percentage = 0.33,
        add_more = 750.9478;
        take_off = tax4;
        // ((총금액의-139384) * 0.33) + 460.7364+133.3961+124.4269+32.3884
      } else {
        tax_percentage = 0.39,
        add_more = 1008.7031;
        take_off = tax5;
        // ((총금액의 - 180000) * 0.39) + 257.7553+460.7364+133.3961+124.4269+32.3884
      }

      paye = ((salary - take_off)*tax_percentage/52) + add_more;
      // console.log('HERE !!! ', 'Take off: ', take_off ,' salary: ', salary, ' Tax: ',tax_percentage, ' Add: ', add_more, '   PAYE: ', paye);
      
      if(this.employee.taxcode.includes('sl') && weekly > 439) {
        studentLoan = (weekly-439)*0.12
        console.log('Student loan: ', studentLoan, ' ', weekly );
        paye = ((salary - take_off)*tax_percentage/52) + add_more;
      }

      this.employee.net = Math.round(((weekly - paye - studentLoan) + Number.EPSILON) * 100) / 100;
      this.employee.paye = Math.round((paye + Number.EPSILON) * 100) / 100;
      this.employee.studentLoan = Math.round((studentLoan + Number.EPSILON) * 100) / 100;

      // check all inputs and selects are filled
      if (this.employee.name === '') {
        validation = false;
        // show error
      } 

      if (this.employee.taxcode === null) {
        validation = false;
        // show error
      } 
      
      if (this.employee.rate === null) {
        validation = false;
        // show error
      } 
      
      if (this.employee.hours === 0) {
        validation = false;
        // show error
      } 

      // check there are same usename then update details
      if(validation) {
        this.$store.commit("addEmployee", this.employee);

        // after saving 
        this.employee = {
          hours: null,
          name: '',
          net: 0, 
          paye: 0,
          rate: null,
          studentLoan: 0,
          taxcode: null,
        }
      }
    }
  }
}
</script>
<style lang="scss">
  .employee-form {
    label {
      margin-bottom: 4px;
    }
    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: darkgray;
    }
    ::-moz-placeholder { /* Firefox 19+ */
      color: darkgray;
    }
    :-ms-input-placeholder { /* IE 10+ */
      color: darkgray;
    }
    :-moz-placeholder { /* Firefox 18- */
      color: darkgray;
    }
  }
</style>