<template>
  <div>
    <q-card>
      <q-card-section v-if="loading === false" class="flex">
        <q-breadcrumbs
          v-for="(i, index) in breadcrumbs"
          :key="index"
          class="q-mx-md"
        >
          <q-breadcrumbs-el :label="i.label" :icon="i.icon" :to="i.route" />
        </q-breadcrumbs>
      </q-card-section>
      <q-skeleton style="100%" height="100px" v-else>
        <q-skeleton class="text-h6 q-mb-md"></q-skeleton>
        <q-skeleton class="text-subtitle2"></q-skeleton>
      </q-skeleton>
    </q-card>
    <q-card class="q-my-sm">
      <q-dialog v-model="diaglogDelete" max-width="500">
        <q-card>
          <q-card-section>
            <div class="text-h6">Confirm</div>
            <div class="text-subtitle2">
              are you sure you want to remove ? [ {{ removeName }} ]
            </div>
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
        <template #body-cell-status="props">
          <q-td :props="props">
            {{ props.row.status ? props.row.status : "No Status" }}
          </q-td>
        </template>
        <template #body-cell-describtion="props">
          <q-td :props="props">
            {{
              props.row.describtion ? props.row.describtion : "No Describtion"
            }}
          </q-td>
        </template>
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
              @click="onEdit(props.row._id)"
            ></q-btn>
            <!-- <span
                            class="ra-text-link "
                            @click="editCompo(props.row.id)"
                            style="color: dodgerblue;"
                            >
                            {{ props.row.name }}
                            </span> -->
          </q-td>
        </template>
        <template #body-cell-salary="props">
          <q-td :props="props"> $ {{ props.row.salary }} </q-td>
        </template>

        <template v-slot:top>
          <q-btn
            color="blue-10"
            icon="add"
            label="Add Color"
            @click="addRow"
            class="q-mx-md"
            :to="{ name: 'color.create' }"
          />

          <!-- <q-btn
            color="green-14"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable()"
          /> -->

          <q-space />
          <q-input dense debounce="500" outlined v-model="filter" style="">
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
import { success } from "@brenoroosevelt/toast/lib/cjs/toast";
import { onMounted, ref, watch } from "vue";
import toast from "../../Helper/toast";
import router from "../../router";
import api from "../../utils/utility";
import _ from "lodash";
import { Loading } from "quasar";
import { useStore } from "vuex";
const store = useStore();
const pagination = ref({
  sortBy: "name",
  descending: false,
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0,
});
const filter = ref("");
const loading = ref(false);
const showId = ref("");
const diaglogDelete = ref(false);
const removeName = ref("");
const breadcrumbs = ref([
  {
    label: "Dashboard / Color",
    icon: "dashboard",
    route: "/color",
  },
  // {
  //     label: 'Car',
  //     icon:'local_shippings',
  //     route:'/car/create'
  // }
]);
const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
    sortable: true,
  },
  { name: "action", label: "Action", field: "" },
];
watch(
  filter,
  _.debounce(function (val) {
    Loading.value = false;
    getDataTable();
  }, 0)
);
const dataTable = ref([]);
const getDataTable = async () => {
  // loading.value = true
  removeName.value = "";
  dataTable.value = [];
  const { page, rowsPerPage } = pagination.value;

  let data = await api.get("/color/getColor", {
    params: {
      page,
      rowsPerPage,
      search: filter.value,
      branchId: store.state.auth.branchId,
    },
  });
  loading.value = false;
  if (data) {
    console.log(data.data);
    dataTable.value = data.data.items;
    pagination.value.rowsNumber = data.data.totalItems;
  }
};
const onChangePagination = (val) => {
  console.log("kdmbro", val);

  pagination.value.page = val.pagination.page;
  pagination.value.rowsPerPage = val.pagination.rowsPerPage;
  getDataTable();
};
const editCompo = (param) => {
  showId.value = param;
  router.push({ name: "color.edit" });
  // console.log(param);
};
const onRemove = async (param) => {
  showId.value = param._id;
  removeName.value = param.name;
  diaglogDelete.value = true;
};
const onConfirmDelete = async () => {
  let data = await api.delete("/color/removeColor/" + showId.value);
  if (data) {
    console.log("data", data);
    toast.success(data.data.status);
    getDataTable();
    diaglogDelete.value = false;
  } else {
    removeName.value = "";
    toast.error(err.data.status);
  }
};
const onEdit = async (param) => {
  // console.log(param);
  router.push({ name: "color.edit", params: { id: param } });
};
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
};
onMounted(() => {
  getDataTable();
  if (!dataTable) {
    loading.value = true;
  }
});
</script>

<style scoped></style>
