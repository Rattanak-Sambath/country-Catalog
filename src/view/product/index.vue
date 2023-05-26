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
            <!-- @click="onEdit(props.row._id)" -->
            <!-- <span
                                    class="ra-text-link "
                                    @click="editCompo(props.row.id)"
                                    style="color: dodgerblue;"
                                    >
                                    {{ props.row.name }}
                                    </span> -->
          </q-td>
        </template>
        <template #body-cell-name="props">
          <q-td
            class="text-primary cursor-pointer"
            :props="props"
            @click="onEdit(props.row._id)"
          >
            <span> {{ props.row.name }}</span>
          </q-td>
        </template>
        <template #body-cell-image_path="props">
          <q-td    
            :props="props"        
          >
            <span> {{ props.row.image_path ? props.row.image_path : 'No Image'  }}</span>
          </q-td>
        </template>
        <template #body-cell-status="props">
          <q-td
            class="text-primary cursor-pointer"
            :props="props"          
          >
            <span> <q-badge outline align="middle" color="teal">
                {{ props.row.status }}
              </q-badge></span>
          </q-td>
        </template>
       
        <template v-slot:top>
          <q-btn
            color="blue-10"
            icon="add"
            label="Add Product"
            @click="addRow"
            class="q-mx-md"
            :to="{ name: 'product.create' }"
          />

          <q-btn
            color="green-14"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable()"
          />

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
const breadcrumbs = ref([
  {
    label: 'Dashboard / Product',
    icon: 'dashboard',
    route: '/product',
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
    name: 'name',
    align: 'center',
    label: 'Name',
    field: 'name',
    sortable: true,
  },

  {
    name: 'modelName',
    align: 'center',
    label: 'Model',
    field: 'modelName',
    sortable: true,
  },
  {
    name: 'image_path',
    align: 'center',
    label: 'Image',
    field: 'image_path',
    sortable: true,
  },
  {
    name: 'colorName',
    align: 'center',
    label: 'Color',
    field: 'colorName',
    sortable: true,
  },
  {
    name: 'brandName',
    align: 'center',
    label: 'Brand',
    field: 'brandName',
    sortable: true,
  },
  {
    name: 'categoryName',
    align: 'center',
    label: 'Category',
    field: 'categoryName',
    sortable: true,
  },
  {
    name: 'cost',
    align: 'center',
    label: 'Cost',
    field: 'cost',
    sortable: true,
  },
  {
    name: 'price',
    align: 'center',
    label: 'Price',
    field: 'price',
    sortable: true,
  },

  {
    name: 'spec',
    align: 'center',
    label: 'Spec',
    field: 'spec',
    sortable: true,
  },
  {
    name: 'status',
    align: 'center',
    label: 'Status',
    field: 'status',
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

const getDataTable = async () => {
  // loading.value = true
  dataTable.value = []
  const { page, rowsPerPage } = pagination.value

  let data = await api.get('/product/getProduct', {
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
  let data = await api.delete('/product/removeProduct/' + showId.value)
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
  router.push({ name: 'product.edit', params: { id: param } })
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
