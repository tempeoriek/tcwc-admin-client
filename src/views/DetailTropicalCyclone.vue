<template>
  <b-container fluid>
    <b-row class="pt-5">
      <b-col cols="3" md="3" offset-md="3" class="my-1">
        <div class="file-upload">
          <input type="file" @change="onFileChange" />
          <button @click="onUploadFile" class="upload-button"
          :disabled="!this.selectedFile">Upload file</button>
        </div>
        <br><br>
        <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show">

          <b-form-file v-model="form.file" class="mt-3" plain></b-form-file>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TropicalCyclone from '@/api/TropicalCycloneApi'
// import moment from 'moment'

export default {
  data() {
    return {
      Model: null,
      items: [],
      id: this.$route.params._id,
      selectedFile: "",
      form: {
        _id: '',
        status: '',
        area: '',
        name: '',
        year: '',
        file: null
      },
      show: true
    }
  },
  created() {
    this.Model = TropicalCyclone
    this.getAllData();
  },
  computed: {
    
  },
  mounted() {
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
    },
    onUploadFile: async function () {
      const formData = new FormData();
      
      formData.append("file", this.selectedFile);  // appending file
      formData.set("test", {test:`test`});  // appending file
      console.log(formData)

     // sending file to the backend
     let res = await this.Model.createData(formData);
    console.log(res)
    },
    onSubmit: async function (evt) {
      evt.preventDefault()
      console.log(this.form.file)
      let res = await this.Model.createData({
        file: this.form.file
      });
      console.log(res.data)
      // alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.year = ''
      this.form.name = ''
      this.form.area = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },

    getAllData: async function () {
      let res = await this.Model.getData({id: this.id});

      if(res.data.status == 200 && res.data.data) {
        let data = res.data.data;
          this.form._id = data._id,
          this.form.name = data.name,
          this.form.year = data.year,
          this.form.area = data.area,
          this.form.status = data.is_active
      }
    }
  }
}
</script>