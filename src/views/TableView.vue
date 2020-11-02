<template>
  <b-container fluid>

    <!-- User Interface controls -->
    <b-row class="mt-5">

      <b-col cols="3" md="3" offset-md="3" class="my-1">
        <b-form-group
          label="Search"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col cols="3" md="3" offset-md="1" class="my-1">
        <b-form-group
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="left"
          label-size="sm"
          description="Leave all unchecked to filter on all data"
          class="mb-0">
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox v-for="(fields, index) in fields" :key="index" :value=fields.key>
              {{fields.label}}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-row class="mt-3">
      <b-col cols="8" md="8" offset-md="3" class="my-1">
        <b-table
          show-empty
          selectable
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-direction="sortDirection"
          head-variant="light"
          @filtered="onFiltered"
          @row-clicked="onClicked"
        >
          <!-- <template v-slot:cell(name)="row">
            {{ row.value.first }} {{ row.value.last }}
          </template> -->

          <template v-slot:cell(actions)="row">
            <!-- <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
              Info modal
            </b-button> -->
            <b-button size="sm" @click="row.toggleDetails">
              {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            </b-button>
          </template>

          <template v-slot:row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
              </ul>
            </b-card>
          </template>
        </b-table>
      </b-col>
    </b-row>

     <!-- User Interface controls -->
    <b-row>
      <b-col cols="2" md="2" offset-md="3" class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="8"
          label-cols-md="8"
          label-cols-lg="8"
          label-align-sm="left"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
    
      <b-col cols="2" md="2" offset-md="4" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
          pills
          first-number
          last-number
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal> -->
  </b-container>
</template>

<script>
import CycloneName from '@/api/CycloneNameApi'
import TropicalCyclone from '@/api/TropicalCycloneApi'
import CycloneOutlook from '@/api/CycloneOutlookApi'
import AfterEventReport from '@/api/AfterEventReportApi'
import AnnualReport from '@/api/AnnualReportApi'
import Publication from '@/api/PublicationApi'
import About from '@/api/AboutApi'

export default {
  data() {
    return {
      Model: null,
      items: [],
      fields: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      /* infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      } */
    }
  },
  created() {
    if (this.$route.path == `/cyclonename`) {
      this.Model = CycloneName
    } else if (this.$route.path == `/tropicalcyclone`) {
      this.Model = TropicalCyclone
    } else if (this.$route.path == `/cycloneoutlook`) {
      this.Model = CycloneOutlook
    } else if (this.$route.path == `/report`) {
      this.Model = AfterEventReport
    } else if (this.$route.path == `/annual_report`) {
      this.Model = AnnualReport
    } else if (this.$route.path == `/publication`) {
      this.Model = Publication
    } else if (this.$route.path == `/about`) {
      this.Model = About
    }
    this.getAllData();
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted() {
    this.totalRows = this.items.length
  },
  methods: {
    /* info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    }, */
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    onClicked(item) {
      this.$router.push({name: `DetailTropicalCyclone`, params: { _id: item._id}})
    },

    getAllData: async function () {
      let res = await this.Model.getAllData();
      if(res.data.status == 200 && res.data.data) {
        console.log(res.data)
        res.data.data.forEach((data) => {
          this.items.push(data)
        });

        res.data.fields.forEach((data) => {
          this.fields.push(
            {
              key: data.key,
              label: data.label,
              formatter: (data.formatter) ? (value) => { return value ? 'Active' : 'Passive' } : false,
              sortable: (data.sortable) ? data.sortable : false,
              sortDirection: (data.sortDirection) ? data.sortDirection : `asc`,
              class: (data.class) ? data.class : `text-center`,
              sortByFormatted: (data.sortByFormatted) ? data.sortByFormatted : false,
              filterByFormatted: (data.filterByFormatted) ? data.filterByFormatted : false,
            }
          )
        });
      }
    }
  }
}
</script>