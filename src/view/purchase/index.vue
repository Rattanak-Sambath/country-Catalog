<template>
  <div>
    <q-card>
      <q-card-section
        v-if="loading === false"
        class="flex"
      >
        <q-breadcrumbs
          v-for="(i, index) in breadcrumbs"
          :key="index"
          class="q-mx-md"
        >
          <q-breadcrumbs-el
            :label="i.label"
            :icon="i.icon"
            :to="i.route"
          />
        </q-breadcrumbs>
      </q-card-section>
      <q-skeleton
        style="100%"
        height="100px"
        v-else
      >
        <q-skeleton class="text-h6 q-mb-md"></q-skeleton>
        <q-skeleton class="text-subtitle2"></q-skeleton>
      </q-skeleton>
    </q-card>

    <q-card class="q-my-sm">
      <q-dialog
        v-model="diaglogDelete"
        max-width="500"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6">Confirm</div>
            <div class="text-subtitle2">are you sure you want to remove ? [ {{ removeName }} ] </div>
          </q-card-section>

          <q-separator dark />

          <div class="text-right q-mx-md q-my-lg flex justify-center">
            <q-btn
              name="remove"
              color="secondary"
              outlined
              :disabled="deleting"
              @click="diaglogDelete = false"
              >Cancel</q-btn
            >
            <q-btn
              class="q-mx-md"
              name="confirm"
              color="negative"
              @click="onConfirmDelete"
              >Confirm</q-btn
            >
          </div>
        </q-card>
      </q-dialog>
      <q-table
        class="text-centers"
        title="Cars"
        :rows="dataTable"
        :columns="columns"
        row-key="_id"
        :filter="filter"
        :loading="loading"
        @request="onChangePagination"
        v-model:pagination="pagination"
      >
        <!-- <template #body-cell-index="props">
                                <q-td :props="props">
                                    {{ props.row.index + 1 }}
                                </q-td>
                            </template> -->
        <template #body-cell-action="props">
          <q-td :props="props">
            <q-btn
              icon="delete"
              color="negative"
              @click="onRemove(props.row)"
            ></q-btn>
            <q-btn
              icon="edit"
              color="primary"
              class="q-mx-md"
            ></q-btn>
          </q-td>
        </template>
      
        <template #body="props" >
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                v-show="props.row.productDoc.length > 0"
                size="sm"
                color="primary"
                round
                flat
                dense
                :icon="props.row.visible ? 'remove' : 'add'"
                @click="props.row.visible = !props.row.visible"
              />
            </q-td>
            <q-td
              class="ra-text-link text-blue text-center"
              key="code"
              :props="props.code"
            >
              <span
                class="ra-text-link"
                @click="onEdit(props.row._id)"
              >
                {{ props.row.code }}
              </span>
            </q-td>
            <q-td
              key="customerName"
              :props="props.supplierName"
              class="text-center"
            >
              {{ props.row.supplierName }}
            </q-td>
            <q-td
              class="text-center"
              key="staffName"
              :props="props.staffName"
            >
              {{ props.row.staffName }}
            </q-td>
            <q-td
              class="text-center"
              key="totalAmount"
              :props="props.totalAmount"
            >
              {{ decimalNumber(props.row.totalAmount, 2)  }} $
            </q-td>
            <q-td
              class="text-center"
              key="totalAmount"
              :props="props.totalRiel"
            >
              {{ decimalNumber(props.row.totalRiel, 2)  }} $
            </q-td>
            <q-td
              class="text-center"
              key="type"
              :props="props.type"
            >
            <span> <q-badge outline align="middle" :color="props.row.type === 'Cash' ? 'teal': 'negative' ">
                {{ props.row.type }}
              </q-badge></span>
            </q-td>
            <q-td
              class="text-center"
              key="note"
              :props="props.note"
            >
              {{ props.row.note ?  props.row.note : 'No Note' }}
            </q-td>
            <q-td
              class="text-center"
              key="date"
              :props="props.date"
            >
              {{ props.row.date }}
            </q-td>
          </q-tr>
          <q-tr
            v-show="props.row.visible"
            :props="props.row"
          >
            <q-td colspan="100%">
              <q-markup-table
                bordered
                flat
              >
                <thead>
                  <tr>
                    <th class="text-left">No</th>
                    <th class="text-left">Product</th>
                    <th class="text-left">Qty</th>
                    <th class="text-left">Cost</th>
                    <th class="text-left">Amount</th>
                  </tr>
                </thead>
                <tbody> 
                   <tr
                    v-for="(item, index) in props.row.productDoc"
                    :key="index">

                    <td class="text-left">{{ index + 1 }}</td>
                    <td class="text-left">{{ item.name }}</td>
                    <td class="text-left">{{ item.qty }}</td>
                    <td class="text-left">{{ item.cost }} $ </td>
                    <td class="text-left">{{ item.amount }} $</td>
                  </tr>
                </tbody>
              </q-markup-table>
              <!-- <div
                class="text-left"
                v-for="(item, i) in props.row.items"
                :key="i"
              >
                {{ item.retailPrice }}
              </div> -->
            </q-td>
          </q-tr>
        </template>
        <!-- :props="props" -->
        
        <template v-slot:top >
          <q-btn
            color="blue-10"
            icon="add"
            label="Add Purchase"
            @click="addRow"
            class="q-mx-md"
            :to="{ name: 'purchase.create' }"
          />

          <!-- <q-btn
            color="green-14"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable()"
          /> -->

          <q-space />
          <q-input
            dense
            debounce="500"
            outlined
            v-model="filter"
            style=""
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template>
          asdasdasd
        </template>

      </q-table>
      
     
    </q-card>

  </div>
</template>

<script setup>
import { success } from '@brenoroosevelt/toast/lib/cjs/toast'
import { onMounted, ref, watch } from 'vue'
import toast from '../../Helper/toast'
import router from '../../router'
import api from '../../utils/utility'
import _ from 'lodash'
import { Loading } from 'quasar'
import VueJsonPretty from 'vue-json-pretty'
import { useStore } from 'vuex'
import { decimalNumber } from '../../lib/numeral.ts'
const store  = useStore()
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
const diaglogDelete = ref(false)
const expand =ref(false)
const breadcrumbs = ref([
  {
    label: 'Dashboard / Purchase ',
    icon: 'dashboard',
    route: '/purchase',
  },
  // {
  //     label: 'Car',
  //     icon:'local_shippings',
  //     route:'/car/create'
  // }
])
const columns = [
  // { name: 'index', align: 'center', label: 'Index', field: 'index', sortable: true },

  // {
  //     name: 'code',
  //     required: true,
  //     label: 'Code',
  //     align: 'left',
  //     field: row => row.code,
  //     format: val => `${val}`,
  //     sortable: true
  // },
  {
    name: 'actions',
    align: 'center',
    label: '',
    field: 'actions',
    sortable: true,
  },
  {
    name: 'code',
    align: 'center',
    label: 'Code',
    field: 'code',
    sortable: true,
  },
  {
    name: 'supplierName',
    align: 'center',
    label: 'Supplier_Name',
    field: 'supplierName',
    sortable: true,
  },

  {
    name: 'staffName',
    align: 'center',
    label: 'Staff_Name',
    field: 'staffName',
    sortable: true,
  },
  {
    name: 'totalAmount',
    align: 'center',
    label: 'TotalAmount',
    field: 'totalAmount',
    sortable: true,
  },
  {
    name: 'totalRiel',
    align: 'center',
    label: 'totalRiel',
    field: 'totalRiel',
    sortable: true,
  },
  {
    name: 'type',
    align: 'center',
    label: 'Type',
    field: 'type',
    sortable: true,
  },
  {
    name: 'note',
    align: 'center',
    label: 'Note',
    field: 'note',
    sortable: true,
  },
  
  {
    name: 'date',
    align: 'center',
    label: 'Date',
    field: 'date',
    sortable: true,
  },
]
watch(
  filter,
  _.debounce(function (val) {
    Loading.value = false
    getDataTable()
  }, 0)
)
const dataTable = ref([])
const onExpand = ()=>{
    expand.value  = !expand.value
    console.log(expand.value);
}
const getDataTable = async () => {
  // loading.value = true
  dataTable.value = []
  const { page, rowsPerPage } = pagination.value

  let data = await api.get('/purchase/getPurchase', {
    params: {
      page,
      rowsPerPage,
      search: filter.value,
      branchId: store.state.auth.branchId,
    },
  })
  loading.value = false
  if (data) {
    console.log(data.data)
    dataTable.value = data.data.items
    pagination.value.rowsNumber = data.data.totalItems
    for(item in dataTable){
        item.visible = false
    }
  }
}
const onChangePagination = (val) => {
  pagination.value.page = val.pagination.page
  pagination.value.rowsPerPage = val.pagination.rowsPerPage
  getDataTable()
}
const editCompo = (param) => {
  showId.value = param
  router.push({ name: 'car.edit' })
  // console.log(param);
}
const onRemove = async (param) => {
  showId.value = param._id
  removeName.value = param.name;
  diaglogDelete.value = true
}
const onConfirmDelete = async () => {
  let data = await api.delete('/sale/removeSale/' + showId.value)
  if (data) {
    toast.success({ message: '' })
    getDataTable()
    diaglogDelete.value = false
  } else {
    toast.error(err.data.status)
  }
}
const onEdit = async (param) => {
  // console.log(param);
  router.push({ name: 'purchase.edit', params: { id: param } })
}
const exportTable = () => {
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
onMounted(() => {
  getDataTable()
  if (!dataTable) {
    loading.value = true
  }
})
</script>

<style scoped></style>
