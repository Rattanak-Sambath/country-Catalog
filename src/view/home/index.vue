<template>
  <div>
    <q-card class="q-my-sm q-pa-md">
                  <q-table
                    title="Cars"
                    :rows="rows"
                    :columns="columns"
                    row-key="_id"
                    :filter="filter"
                    :loading="loading"
                    :card-container-class="cardContainerClass"
                    @request="onChangePagination"
                    v-model:pagination="pagination"
                    grid
                    grid-header
                  >
                  <template v-slot:item="props">
                    <div class="q-pa-xs  col-xs-6 col-sm-4 col-md-3 col-lg-2">
                      <q-card  style="min-height: 480px;">
                        <img :src="props.row.flags.png" style="width: 100%; height: 200px;" alt="" set="">
                        <q-card-section>
                           <div class="text-h6 text-center">{{ props.row.name.official }}</div>
                        </q-card-section>
                        <!-- <h6 class="text-center "></h6> -->
                        <div class="q-px-md q-pb-md" > 
                            <p ><span class="text-bold">Two Charactor : </span>{{ props.row.cca2 }}</p>
                            <p><span class="text-bold">Two Charactor : </span>{{ props.row.cca3 }}</p>
                            <div v-if="props.row.name.nativeName">
                                <p v-for ="native in props.row.name.nativeName[1] ">                                 
                                    Native : [ {{ native }} ]                       
                                </p>
                             </div> 
                             <div v-else>
                                <p><span class="text-bold">Native :</span>  No Native </p>
                             </div>                          
                            <p><span class="text-bold">Alternative : </span>{{ props.row.altSpellings[0] }}</p>
                            <p><span class="text-bold">Calling-Code :</span> {{ props.row.idd.root ? props.row.idd.root : 'No Calling Code' }}</p>
                        </div>
                      </q-card>
                     
                    </div>
                  </template>
                  <template v-slot:top>
                              
                      <q-input
                        dense
                        debounce="500"
                        outlined
                        v-model="filter"
                        label="Country Name "
                        style="width: 100%;"
                        
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                </q-table>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import _ from "lodash";
import { Loading } from "quasar";
import { useStore } from "vuex";
import axios from "axios";
const store = useStore();
const pagination = ref({
  sortBy: "name",
  descending: false,
  page: 1,
  rowsPerPage: 25,
  rowsNumber: 0,
});

const columns = [
  {
    
    name: 'flag',
    required: true,
    label: '',
    align: 'left',
    field: row => `${row.flags.png}`,
    format: val => `${val}`,
    // sortable: true,
  },
  { name: 'name', align: 'center', label: 'Sort', field: row => row.name.official, sortable: true },
  { name: 'twoCharacter', label: '', field: row => `Two Charactor :   ${row.cca2}`,},
  { name: 'threeCharacter', label: '', field: row =>  `Three Charactor :   ${row.cca3}` },
  { name: 'native', label: '', field:row => `Native :  ${row.name.nativeName}`  },
  { name: 'alternative', label: '', field: row =>  `AlterNative :  ${row.altSpellings[0]}` },
  { name: 'callingCode', label: '', field:  row => `Calling Code  :  ${row.idd.root}` },
]

// const rows = [
//   {
//     name: 'Frozen Yogurt',
//     calories: 159,
//     fat: 6.0,
//     carbs: 24
//   },
//   {
//     name: 'Ice cream sandwich',
//     calories: 237,
//     fat: 9.0,
//     carbs: 37
//   },
//   {
//     name: 'Eclair',
//     calories: 262,
//     fat: 16.0,
//     carbs: 23
//   },
//   {
//     name: 'Cupcake',
//     calories: 305,
//     fat: 3.7,
//     carbs: 67
//   },
//   {
//     name: 'Gingerbread',
//     calories: 356,
//     fat: 16.0,
//     carbs: 49
//   },
//   {
//     name: 'Jelly bean',
//     calories: 375,
//     fat: 0.0,
//     carbs: 94
//   },
//   {
//     name: 'Lollipop',
//     calories: 392,
//     fat: 0.2,
//     carbs: 98
//   },
//   {
//     name: 'Honeycomb',
//     calories: 408,
//     fat: 3.2,
//     carbs: 87
//   },
//   {
//     name: 'Donut',
//     calories: 452,
//     fat: 25.0,
//     carbs: 51
//   },
//   {
//     name: 'KitKat',
//     calories: 518,
//     fat: 26.0,
//     carbs: 65
//   }
// ]
const rows = ref([]);
const filter = ref("");
const loading = ref(false);
const breadcrumbs = ref([
  {
    label: "Country Catalog",
    icon: "flag",
    route: "/",
  },
]);

watch(
  filter,
  _.debounce(function (val) {
    Loading.value = false;
    getDataTable();
  }, 0)
);
const dataTable = ref([]);
const getDataTable = async () => {
  loading.value = true
  dataTable.value = [];
  const { page, rowsPerPage } = pagination.value;

  let data = await axios.get("https://restcountries.com/v3.1/all", {
    params: {
      page,
      rowsPerPage,
      search: filter.value,
      
    },
  });
  loading.value = false;
  if (data) {
    console.log(data.data);
    rows.value = data.data;
    // console.log('data', dataTable.value[0]); 
   
    pagination.value.rowsNumber = data.data.totalItems;
  }
};
// const onChangePagination = (val) => {
//   pagination.value.page = val.pagination.page;
//   pagination.value.rowsPerPage = val.pagination.rowsPerPage;
//   getDataTable();
// };

onMounted(() => {
  getDataTable();
  if (!dataTable) {
    loading.value = true;
  }
});
</script>

<style scoped></style>
