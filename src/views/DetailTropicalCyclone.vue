<template>
  <b-container fluid>
    <b-row class="pt-5">
      <b-col cols="3" md="3" offset-md="3" class="my-1">
        TEst
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CycloneName from '@/api/CycloneNameApi'
import TropicalCyclone from '@/api/TropicalCycloneApi'
import moment from 'moment'

export default {
  data() {
    return {
      Model: null
    }
  },
  created() {
    console.log(this.$route)
    if (this.$route.path == `/cyclonename`) {
      this.Model = CycloneName
    } else if (this.$route.path == `/tropicalcyclone`) {
      this.Model = TropicalCyclone
    }
    this.getAllData();
  },
  computed: {
    
  },
  mounted() {
  },
  methods: {
    getAllData: async function () {
      let res = await this.Model.getData({id: `5f7f0bcb19d00e3770570a62`});

      if(res.data.status == 200 && res.data.data) {
        res.data.data.forEach((data) => {
          this.items.push({
            _id: data._id,
            name: data.name,
            year: moment(data.year).format(`YYYY`),
            area: data.area,
            status: data.is_active
          })
        });
      }
    }
  }
}
</script>