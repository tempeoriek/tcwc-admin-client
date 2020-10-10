<template>
  <b-container>
    <b-row>
      <b-col class="mt-5" cols="4" md="4" lg="4" offset-md="2" offset-lg="2">
        <p>Product</p>
        <b-table :items="items" :fields="fields" head-variant="light"/>
      </b-col>

      <b-col class="mt-5" cols="4" md="4" lg="4" offset-md="2" offset-lg="2">
        <p>Calendar</p>
        <b-table :items="items" :fields="fields" head-variant="light" />
      </b-col>
    </b-row>

    <b-row>
      <b-col class="mt-5" cols="4" md="4" lg="4" offset-md="2" offset-lg="2">
        <p>Payment</p>
        <b-table :items="items" :fields="fields" head-variant="light" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vendor from '@/api/VendorAdminApi'

export default {
  name: 'Home',
  data() {
    return {
      fields: ['first_name', 'last_name', 'age'],
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald', status: 'awesome' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
      ]
    }
  },
  created () {
    this.loadStart();
  },
  methods: {
    loadStart: async function () {
      let res = await Vendor.get();
      console.log(res);
    }
  }
}
</script>

<style scoped>
</style>
