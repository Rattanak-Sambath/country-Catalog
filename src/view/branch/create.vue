<template>
  <div>
    <q-card class="flex justify-space-between">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          ><q-icon name="add"></q-icon> Create Branch</q-toolbar-title
        >
        <q-space />
        <q-btn
          icon="west"
          outline
          color="primary"
          @click="$router.go(-1)"
          >Back</q-btn
        >
      </q-toolbar>
    </q-card>
    <q-card class="q-my-md">
      <q-card-section class="text-grey-15">
        Fill the form below to crate new Branch
      </q-card-section>
      <ValidateForm
        ref="formRef"
        :validation-schema="rules"
      >
        <q-form
          @submit.prevent.stop="onSubmit()"
          class="mt-4 text-center"
        >
          <q-card-section>
            <div class="row q-col-gutter-x-xl q-col-gutter-y-md">
              <div class="col-xs-12 col-md-6 col-lg-6">
                <div class="row q-col-gutter-y-md">
                  <!-- start left side -->
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.date"
                      name="date"
                    >
                      <q-input
                        color="orange-14"
                        type="date"
                        outlined
                        :model-value="value"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="calendar_month"
                            color="indigo-10"
                          />
                        </template>
                      </q-input>
                    </validate-field>
                  </div>
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.code"
                      name="code"
                    >
                      <q-input
                        color="orange-14"
                        readonly
                        type="text"
                        outlined
                        :model-value="value"
                        label="Code"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="qr_code"
                            color="indigo-10"
                          />
                        </template>
                      </q-input>
                    </validate-field>
                  </div>
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.name"
                      name="name"
                    >
                      <q-input
                        color="orange-14"
                        type="text"
                        label="Name"
                        outlined
                        :model-value="value"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="account_balance"
                            color="indigo-10"
                          />
                        </template>
                      </q-input>
                    </validate-field>
                  </div>
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.address"
                      name="address"
                    >
                      <q-input
                        color="orange-14"
                        type="text"
                        label="Address"
                        outlined
                        :model-value="value"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="location_on"
                            color="indigo-10"
                          />
                        </template>
                      </q-input>
                    </validate-field>
                  </div>
                </div>
                <!-- end-left-side  -->
              </div>

              <div class="col-xs-12 col-md-6 col-lg-6">
                <div class="row q-col-gutter-y-md">
                  <!-- right-side  -->
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.type"
                      name="type"
                    >
                      <q-select
                        :model-value="value"
                        :options="typeOpt"
                        map-options
                        emit-value
                        option-label="name"
                        option-value="value"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Type"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="location_city"
                            color="indigo-10"
                          />
                        </template>
                      </q-select>
                    </validate-field>
                  </div>
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.map"
                      name="map"
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d971.5026057685144!2d103.2045611003532!3d13.09852584544261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2skh!4v1679559975596!5m2!1sen!2skh"
                      width="600"
                      height="450"
                      style="border: 0"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    >
                      <q-input
                        color="orange-14"
                        type="textarea"
                        outlined
                        :model-value="value"
                        label="Map"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                      </q-input>
                    </validate-field>
                  </div>
                  <!-- end-right-side  -->
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-right q-gutter-x-md">
              <q-btn
                push
                icon="add"
                :label="showId ? 'Update' : 'Save'"
                color="primary"
                no-caps
                :disable="invisibleBtn"
                :loading="loading"
                @click="onSubmit()"
              />
              <q-btn
                v-if="showId"
                color="negative"
                push
                icon="remove"
                label="Remove"
                no-caps
                :loading="loading"
                @click="onRemove()"
              />
              <q-btn
                push
                icon="cancel"
                label="Cancel"
                no-caps
                :loading="loading"
                @click="cancel()"
              />
            </div>
          </q-card-section>
        </q-form>
      </ValidateForm>
    </q-card>
  </div>
</template>

<script setup>
import { Form as ValidateForm, Field as ValidateField } from 'vee-validate'
import actions from '../../store/actions'
import toast from '../../Helper/toast.js'
import { object, string } from 'yup'
import { ref, onMounted, watch } from 'vue'
// import store from '../../store/';
// import api from '../../utils/utility'
import { useStore } from 'vuex'
import router from '../../router'
import dayjs from 'dayjs'
import api from '../../utils/utility'
import axios from 'axios'
const formRef = ref('')
const loading = ref(false)
// const name = ref('')
const form = ref({
  code: Date.now() + Math.random().toString(36).substring(2, 3).toUpperCase(),
  name: '',
  address: '',
  map: '',
  type: '',
  date: dayjs(new Date()).format('YYYY-MM-DD'),
})
const typeOpt = ref([
  {
    name: 'Agency',
    value: 'Agency',
  },
  {
    name: 'Company',
    value: 'Company',
  },
])
const driverOpt = ref([])
const invisibleBtn = ref(false)
const rules = object({
  code: string().required().label('Code'),
  name: string().required().label('Name'),
  address: string().required().label('Address'),
  date: string().required().label('Date'),
  type: string().required().label('Type'),
})
const showId = ref('')
const concel = () => {
  showId.value = null
  form.value.name = ''
  form.value.model = ''
  form.value.weight = ''
  form.value.color = ''
  form.value.driverId = ''
  loading.value = false
}
const dataTable = ref([])
watch(
  form.value,
  (newValue, oldValue) => {
    if (newValue) {
    }
  },
  { immediate: true }
)
const onSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (valid) {
    let methods = '/branch/createBranch'
    if (showId.value) {
      methods = 'car/updateCar'
    }
    loading.value = true
    // console.log(form.value);
    let res = await api.post('branch/createBranch', form.value)
    if (res) {
      toast.success({ message: 'Insert successfully ' })
      loading.value = false
      router.go(-1)
    } else {
      toast.error({ message: 'There was somehting wrong to add car' })
      // throw('There was something wrong !!')
    }
  }
}
const getDataTable = async () => {
  let data = await api.get('/branch/countDriver')
  if (data) {
    // console.log(data.data.length)
    // form.value.code = data.data.length + 1
    // form.code= data.data.length + 1
  }
}
const cancel = () => {
  router.go(-1)
}
const findDriver = async () => {
  await api.get('/driver/getDriver').then((res) => {
    if (res) {
      // console.log(res.data.items);
      driverOpt.value = res.data.items
    }
  })
}
onMounted(() => {
  findDriver()
  getDataTable()
  // if(dataTable){
  //   form.value.code = dataTable.value.length + 1
  // }
})
</script>

<style scoped></style>
