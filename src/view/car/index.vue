<template>
    <div>
       <q-card>
                <q-card-section>
                <div class="text-h6">Car</div>
                <div class="text-subtitle2">list of car</div>
                </q-card-section>
       </q-card>
       <q-card class="q-my-sm">
            <q-table
                    title="Cars"
                    :rows="rows"
                    :columns="columns"
                    row-key="id"
                    :filter="filter"
                    :loading="loading"
                    >

                    <template v-slot:top>
                        <q-btn  push color="primary" :disable="loading" label="Add row" @click="addRow" class="q-mx-md" />

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

<script>
import { exportFile, useQuasar } from 'quasar'
    export default {
        setup (){

                const columns = [
                {
                    name: 'name',
                    required: true,
                    label: 'Dessert (100g serving)',
                    align: 'left',
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                },
                { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
                { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
                { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
                { name: 'protein', label: 'Protein (g)', field: 'protein' },
                { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
                { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
                { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
                ]

                const rows = [
                        {
                            name: 'Frozen Yogurt',
                            calories: 159,
                            fat: 6.0,
                            carbs: 24,
                            protein: 4.0,
                            sodium: 87,
                            calcium: '14%',
                            iron: '1%'
                        },
                    ]

                const exportTable = () =>{
                    const content = [columns.map(col => wrapCsvValue(col.label))].concat(
                                rows.map(row => columns.map(col => wrapCsvValue(
                                    typeof col.field === 'function'
                                    ? col.field(row)
                                    : row[ col.field === void 0 ? col.name : col.field ],
                                    col.format,
                                    row
                                )).join(','))
                                ).join('\r\n')

                                const status = exportFile(
                                'table-export.csv',
                                content,
                                'text/csv'
                                )
                }
            return {
                rows,
                exportTable,
                columns
            }
        }
    }
</script>

<style scoped>

</style>