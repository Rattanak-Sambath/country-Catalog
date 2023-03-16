<template>
    <div>
       <q-card>
                <q-card-section v-if="loading === false">
                    <div class="text-h6">Car</div>
                    <div class="text-subtitle2">list of car</div>
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
                    row-key="id"
                    :filter="filter"
                    :loading="loading"
                     @request="onChangePagination"
                     :v-model:pagination="pagination"

                    >

                    <template v-slot:top>
                        <q-btn  push color="primary"  label="Add row" @click="addRow" class="q-mx-md" :to="{name: 'car.create'}" />

                        <q-btn
                        push 
                        color="primary"
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
            rowsPerPage: 10,
            rowsNumber: 0,
            })
            const filter = ref('')
            const loading = ref(false)
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

                const dataTable = ref([
                    {
                        name:'G1',
                        model: 'Hyundia',
                        weight: 14,
                        color:'Orange',
                        date:122
                    },
                    {
                        name:'G1',
                        model: 'Hyundia',
                        weight: 14,
                        color:'Orange',
                        date:122
                    },
                    {
                        name:'G1',
                        model: 'Hyundia',
                        weight: 14,
                        color:'Orange',
                        date:122
                    },
                    {
                        name:'G2',
                        model: 'Hyundia',
                        weight: 14,
                        color:'Orange',
                        date:122
                    },
                    {
                        name:'G1',
                        model: 'Hyundia',
                        weight: 14,
                        color:'Orange',
                        date:122
                    },
                    {
                        name:'G5',
                        model: 'Hyundia',
                        weight: 14,
                        color:'Orange',
                        date:122
                    },
                    {
                        name:'G7',
                        model: 'Hyundia',
                        weight: 14,
                        color:'Orange',
                        date:122
                    }
                    
                ])     
                const getDataTable = async ()=>{
                    loading.value = true
                    dataTable.value = []
                    const { page, rowsPerPage } = pagination.value
                    const selector = {
                    // branchId: currentBranchId.value,
                        page,
                        rowsPerPage,
                        search: filter.value,
                    }
                    let res = await api.get('/car/getCar')
                    if(res){
                        console.log(res);
                    }
                }               
                const onChangePagination = (val) => {
                    pagination.value = val.pagination
                    getDataTable()
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
                })
</script>

<style scoped>

</style>