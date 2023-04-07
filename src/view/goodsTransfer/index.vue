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
      <ValidateForm
        ref="formRef"
        :validation-schema="rules"
      >
        <q-form
          @submit.prevent.stop="onSubmit()"
          class="mt-4 text-center"
        >
          <div
            class="row justify-between"
            style="align-items: center"
          >
            <div>
              <q-btn
                color="indigo-10"
                :disable="loading"
                @click="addRow"
                class="q-mx-md q-pa-sm"
                icon-right="add"
                :to="{ name: 'goodsTransfer.create' }"
                >Add New Goods Transfer</q-btn
              >
              <q-btn
                icon-right="add"
                class="q-mx-md q-pa-sm"
                color="negative"
                label="Add New Goods Transfer(Express)"
                no-caps
                @click="exportTable()"
              />
            </div>
            <q-space />
            <validate-field
              v-slot="{ value, field, errorMessage }"
              v-model="form.destination"
              name="destination"
            >
              <q-input
                dense=""
                color="orange-14"
                type="text"
                outlined
                :model-value="value"
                label="Destination"
                v-bind="field"
              />
              <!-- :error="!!errorMessage"
                :error-message="errorMessage" -->
            </validate-field>
            <!-- <q-input
              outlined=""
              class="q-mx-md q-pa-sm"
              dense
              color="negative"
              icon-right="add"
              label="Destination "
              no-caps
            /> -->
            <validate-field
              v-slot="{ value, field, errorMessage }"
              v-model="form.code"
              name="code"
            >
              <q-input
                class="q-mx-xs"
                dense=""
                color="orange-14"
                type="text"
                outlined
                :model-value="value"
                label="Code/Receive/Sender"
                v-bind="field"
              />
              <!-- :error="!!errorMessage"
                :error-message="errorMessage" -->
            </validate-field>
            <!-- <q-input
              outlined=""
              class="q-mx-md q-pa-sm"
              dense
              color="negative"
              icon-right="add"
              label="Code/Receive/Sender "
              no-caps
            /> -->
            <validate-field
              v-slot="{ value, field, errorMessage }"
              v-model="form.status"
              name="status"
            >
              <q-select
                class="q-mx-xs"
                style="width: 100px"
                :model-value="value"
                map-options
                emit-value
                option-label="name"
                option-value="value"
                :options="statusOpt"
                dense=""
                color="orange-14"
                type="text"
                outlined
                label="Type"
                v-bind="field"
              />
              <!-- :error="!!errorMessage"
                :error-message="errorMessage" -->
            </validate-field>
            <validate-field
              v-slot="{ value, field, errorMessage }"
              v-model="form.dateSelect"
              name="date"
            >
              <q-select
                class="q-mx-xs"
                style="width: 150px"
                :model-value="value"
                map-options
                emit-value
                option-label="name"
                option-value="value"
                :options="selectDate"
                dense=""
                color="orange-14"
                type="text"
                outlined
                label="select"
                v-bind="field"
              />
              <!-- :error="!!errorMessage"
                :error-message="errorMessage" -->
            </validate-field>

            <q-input
              :disable="form.dateSelect !== 'all'"
              v-model="form.date"
              type="date"
              outlined=""
              class="q-mx-md q-pa-sm"
              dense
              color="negative"
              icon-right="add"
              no-caps
            />
            <q-btn
              icon-right="add"
              class="q-mx-md q-pa-sm"
              color="primary"
              label="Search"
              no-caps
              @click="onSearch()"
            />
          </div>
        </q-form>
      </ValidateForm>
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

<script setup>
import dayjs from 'dayjs'
import { exportFile, useQuasar } from 'quasar'
import { ref } from 'vue'
import { Form as ValidateForm, Field as ValidateField } from 'vee-validate'
import { object, string, date } from 'yup'
import Toast from '../../Helper/toast'
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
const statusOpt = ref([
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Open',
    value: 'open',
  },
  {
    name: 'Delivery',
    value: 'delivery',
  },
  {
    name: 'Complete',
    value: 'complete',
  },
  {
    name: 'Void',
    value: 'void',
  },
])
// const rules = object({
//   destination: string().required().label('Name'),
//   // positionId: string().required().label('Position'),
//   // phone: string().required().label('Phone'),
//   // gender: string().required().label('Gender'),
//   // address: string().required().label('Address'),
//   // salary: string().required().label('Salary'),
//   // date: date().required().label('Date'),
// })
const form = ref({
  date: dayjs(new Date()).format('YYYY-MM-DD'),
  dateSelect: '',
})
const selectDate = ref([
  {
    name: 'Today',
    value: dayjs(new Date()).format('YYYY-MM-DD'),
  },
  {
    name: 'All',
    value: 'all',
  },
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
const formRef = ref({})
const onSearch = async () => {
  const { valid } = await formRef.value.validate()
  if (form.value !== []) {
    console.log(form.value)
  } else {
    // console.log('hi')
    Toast.error({ message: 'Please input' })
  }
}
const loading = ref(false)
const filter = ref('')
</script>

<style scoped></style>
