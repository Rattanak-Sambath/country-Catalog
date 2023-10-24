<template>
  <div>
    <q-card class="flex justify-space-between">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          >Country Catalog</q-toolbar-title
        >
        <q-space />
       
      </q-toolbar>
    </q-card>
    <q-card class="q-my-sm q-pa-md">
                  <q-table
                    title="Cars"
                    :rows="rows"
                    :columns="columns"
                    row-key="_id"
                    :filter="filter"
                    :loading="loading"
                    v-model:pagination="pagination"
                    grid
                    grid-header
                  >
                  <template v-slot:item="props">
                    <div class="q-pa-xs  col-xs-12 col-sm-4 col-md-3 col-lg-2">
                      <q-card  style="min-height: 560px;" @click="onPopup(props.row)">
                        <img :src="props.row.flags.png" style="width: 100%; height: 200px; object-fit: fill ;" alt="" set="">
                        <q-card-section>
                           <div class="text-h6 text-center">{{ props.row.name.official }}</div>
                        </q-card-section>
                        <div class="q-px-md q-pb-md" > 
                            <p ><span class="text-bold">Two Charactor : </span>{{ props.row.cca2 }}</p>
                            <p><span class="text-bold">Three Charactor : </span>{{ props.row.cca3 }}</p>
                            <div v-if="props.row.name.nativeName">            
                                <p>
                                  <span class="text-bold">Native : </span>  {{ nativeNames(props.row.name.nativeName) }}   
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
                        clearable=""
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                </q-table>
    </q-card>
    <q-dialog
      v-model="popUpDialog"
    >
     <q-card class="q-pa-md"  :style="$q.screen.lt.md ? ' max-width: 60vw' : 'max-width: 60vw'">
          <img :src="popupData.flags.png" :style="$q.screen.lt.sm ? 'width: 100%;': 'width: 100%; height: 350px;'" alt="" srcset="">
          <div class="text-h6 text-center q-pa-md">{{popupData.name.official }}</div>
          <q-card-section :style="$q.screen.lt.md ? '' : 'display: flex; justify-content: space-around'">        
                <div>                  
                    <p><span class="text-bold">Two Charactor : </span>{{ popupData.cca2 }}</p>
                    <p><span class="text-bold">Three Charactor : </span>{{ popupData.cca3 }}</p>
                    <p v-if="popupData.name.nativeName" >
                        <span class="text-bold">Native : </span>  {{ nativeNames(popupData.name.nativeName) }}   
                     </p>
                     <p v-else >
                        <span class="text-bold">Native : </span>  No Native 
                     </p>
                    <p><span class="text-bold">Three Charactor : </span>{{ popupData.altSpellings[0] }}</p>
                    <p><span class="text-bold">Calling-Code :</span> {{ popupData.idd.root ? popupData.idd.root : 'No Calling Code' }}</p>


                </div>
                <div>                    
                     <p><span class="text-bold">Population : </span>{{ popupData.population }}</p>
                    <p><span class="text-bold">Capital City : </span>{{ popupData.capital ? popupData.capital[0] : 'No Capital' }}</p>
                    <p v-if="popupData.languages"><span class="text-bold">Language : </span>{{ language(popupData.languages ) }}</p>
                    <p v-else >
                        <span class="text-bold">Language : </span>  No Language 
                     </p>
                </div>
              
               
          </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import _ from "lodash";
import { Loading } from "quasar";
import { useStore } from "vuex";
import axios from "axios";
const store = useStore();
const popUpDialog = ref(false)
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
  { name: 'native', label: '', field:row =>  `Native :  ${ row.name.nativeName}`  },
  { name: 'alternative', label: '', field: row =>  `AlterNative :  ${row.altSpellings[0]}` },
  { name: 'callingCode', label: '', field:  row => `Calling Code  :  ${row.idd.root}` },
]

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
const popupData = ref([]);
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
    rows.value = data.data;
    pagination.value.rowsNumber = data.data.totalItems;
  }
};

const onPopup = (item)=>{
    popUpDialog.value = true;
    popupData.value = item
}

const nativeNames = (nativeName) => {
  const nativeArr = [];
  if (nativeName) {
    Object.keys(nativeName).forEach((it) => {
      const name = nativeName[it]?.official;
      nativeArr.push(name);
      
    });
  }
  
  return nativeArr;
  
} 
const language = (lange) => {
  const languageArr = [];
  if (lange) {
    Object.keys(lange).forEach((key, index) => {
      const name =  lange[key];
      languageArr.push(name); 
    });
  }
  else {
    languageArr = "No Language"
  }
  return languageArr;
  
} 

onMounted(() => {
  getDataTable();
  if (!dataTable) {
    loading.value = true;
  }
});
</script>

<style scoped></style>
