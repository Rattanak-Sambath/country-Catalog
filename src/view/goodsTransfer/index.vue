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
    <q-card class="q-my-sm q-py-sm">
      <div>
        <q-btn
          dense
          color="indigo-10"
          :disable="loading"
          @click="addRow"
          class="q-mx-md q-pa-sm"
          icon-right="add"
          >Add New Goods Transfer</q-btn
        >

        <q-btn
          class="q-mx-md q-pa-sm"
          dense
          color="negative"
          icon-right="add"
          label="Add New Goods Transfer(Express)"
          no-caps
          @click="exportTable()"
        />
      </div>
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
      >
      </q-table>
    </q-card>
  </div>
</template>

<script>
import { exportFile, useQuasar } from 'quasar'
import { ref } from 'vue'
export default {
  setup() {
    const breadcrumbs = ref([
      {
        label: 'Dashboard / GoodsTransfer',
        icon: 'dashboard',
        route: '/staff',
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
        label: 'Dessert (100g serving)',
        align: 'left',
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'calories',
        align: 'center',
        label: 'Calories',
        field: 'calories',
        sortable: true,
      },
      { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
      { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
      { name: 'protein', label: 'Protein (g)', field: 'protein' },
      { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
      {
        name: 'calcium',
        label: 'Calcium (%)',
        field: 'calcium',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      },
      {
        name: 'iron',
        label: 'Iron (%)',
        field: 'iron',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      },
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
        iron: '1%',
      },
    ]

    const exportTable = () => {
      const content = [columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          rows.map((row) =>
            columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format,
                  row
                )
              )
              .join(',')
          )
        )
        .join('\r\n')

      const status = exportFile('table-export.csv', content, 'text/csv')
    }
    const loading = ref(false)
    const filter = ref('')
    return {
      breadcrumbs,
      filter,
      loading,
      rows,
      exportTable,
      columns,
    }
  },
}
</script>

<style scoped></style>
