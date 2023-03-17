<template>
    <div>
       <q-card>
                <q-card-section v-if="loading === false" class="flex ">
                    <q-breadcrumbs v-for="(i, index) in breadcrumbs" :key="index" class="q-mx-md">                           
                            <q-breadcrumbs-el :label="i.label" :icon="i.icon" :to="i.route" />                      
                    </q-breadcrumbs>
                </q-card-section>
                <q-skeleton style="100%" height="100px" v-else>
                    <q-skeleton class="text-h6 q-mb-md"></q-skeleton>
                    <q-skeleton class="text-subtitle2"></q-skeleton> 
                </q-skeleton>
       </q-card>
       <q-card class="q-my-sm">
            <q-table
                    title="Cars"
                    :rows="dataTable"
                    :columns="columns"
                    row-key="_id"
                    :filter="filter"
                    :loading="loading"
                     @request="onChangePagination"                               
                     :pagination="pagination"
                     >

                     <template #body-cell-name="props">
                        <q-td :props="props">
                            <span
                            class="ra-text-link"
                            @click="edit(props.row.name)"
                            >
                            {{ props.row.name }}
                            </span>
                        </q-td>
                        </template>
                    <template v-slot:top>
                        <q-btn   color="blue-10" icon="add" label="Add row" @click="addRow" class="q-mx-md" :to="{name: 'car.create'}" />

                        <q-btn
                         
                        color="green-14"
                        icon-right="archive"
                        label="Export to csv"
                        no-caps
                        @click="exportTable()"
                        />
   
                        <q-space />
                        <q-input borderless dense debounce="300" color="primary" v-model="filter">
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
    import { onMounted, ref } from 'vue';
import api from '../../utils/utility';
            const pagination = ref({
                sortBy: 'name',
                descending: false,
                page: 1,
                rowsPerPage: 5,
                rowsNumber: 0,
            })
            const filter = ref('')
            const loading = ref(false)
            const showId = ref('')
            const breadcrumbs = ref([
                {
                    label: 'Dashboard / Car',
                    icon:'dashboard',
                    route:'/dashboard'
                },
                // {
                //     label: 'Car',
                //     icon:'local_shippings',
                //     route:'/car/create'
                // }
            ])
             const columns = [
                {
                    name: 'name',
                    required: true,
                    label: 'Name',
                    align: 'left',
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                },
                { name: 'model', align: 'center', label: 'Model', field: 'model', sortable: true },
                { name: 'weight', label: 'weight', field: 'name', sortable: true },
                { name: 'color', label: 'Color', field: 'color' },
                { name: 'date', label: 'Date', field: 'date' },
                { name: '', label: 'Action', field: 'date' },
                ]

                const dataTable = ref([])     
                const getDataTable = async()=>{
                    loading.value = true
                    dataTable.value = []
                    const { page, rowsPerPage } = pagination.value
                    
                    const selector = {                 
                        page,
                        rowsPerPage,
                        search: filter.value,
                    }
                    // console.log('selector', selector);
                     let data = await api.get('/car/getCar', selector)
                     if(data){
                        loading.value = false
                        dataTable.value = data.data.items
                     }
                         
                }               
                const onChangePagination = (val) => {
                    console.log('row', val);
                    pagination.value = val.pagination
                    getDataTable()
                }
                const edit  = (param)=>{
                    showId.value = param
                    // console.log(param);
                }
                const exportTable = () =>{
                    // const content = [columns.map(col => wrapCsvValue(col.label))].concat(
                    //             rows.map(row => columns.map(col => wrapCsvValue(
                    //                 typeof col.field === 'function'
                    //                 ? col.field(row)
                    //                 : row[ col.field === void 0 ? col.name : col.field ],
                    //                 col.format,
                    //                 row
                    //             )).join(','))
                    //             ).join('\r\n')

                    //             const status = exportFile(
                    //             'table-export.csv',
                    //             content,
                    //             'text/csv'
                    //             )
                }
                onMounted(()=>{
                    getDataTable()
                    if(!dataTable){
                        loading.value=true
                    }
                })
</script>

<style scoped>

</style>