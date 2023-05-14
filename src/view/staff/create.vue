<template>
  <div>
    <q-card class="flex justify-space-between">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          ><q-icon name="add"></q-icon> Create Staff</q-toolbar-title
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
        Fill the form below to crate new Staff
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
                  <!-- <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.branchId"
                      name="branchId"
                    >
                      <q-input
                        color="orange-14"
                        type="text"
                        outlined
                        :model-value="value"
                        label="Branch"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="apartment"
                            color="indigo-10"
                          />
                        </template>
                      </q-input>
                    </validate-field>
                  </div> -->
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.name"
                      name="name"
                    >
                      <q-input
                        color="orange-14"
                        type="text"
                        outlined
                        :model-value="value"
                        label="Name"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="person"
                            color="indigo-10"
                          />
                        </template>
                      </q-input>
                    </validate-field>
                  </div>
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.phone"
                      name="phone"
                    >
                      <q-input
                        color="orange-14"
                        type="text"
                        outlined
                        :model-value="value"
                        label="Phone"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="phone"
                            color="indigo-10"
                          />
                        </template>
                      </q-input>
                    </validate-field>
                  </div>
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.positionId"
                      name="positionId"
                    >
                      <q-select
                        :model-value="value"
                        :options="positionOpt"
                        map-options
                        emit-value
                        option-label="name"
                        option-value="value"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Position"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="picture_in_picture"
                            color="indigo-10"
                          />
                        </template>
                      </q-select>
                    </validate-field>
                  </div>
                </div>
                <!-- end-left-side  -->
              </div>

              <div class="col-xs-12 col-md-6 col-lg-6">
                <div class="row q-col-gutter-y-md">
                  <!-- right-side  -->
                  <!-- <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.positionId"
                      name="positionId"
                    >
                      <q-select
                        :model-value="value"
                        :options="positionOpt"
                        map-options
                        emit-value
                        option-label="name"
                        option-value="value"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Position"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="picture_in_picture"
                            color="indigo-10"
                          />
                        </template>
                      </q-select>
                    </validate-field>
                  </div> -->
                  <div class="col-12 q-mb-lg" v-show="branchOpt.length != 0">
                    
                       <q-input
                       readonly
                       class="text-bold"
                        color="orange-14"
                        type="text"
                        outlined
                        v-model="preBranchId"
                        >
                        <!-- v-bind="field"                        -->
                      
                        <template v-slot:prepend>
                          <q-icon
                            name="account_balance"
                            color="indigo-10"
                          />
                        </template>
                        </q-input>
                   
                  </div>
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.code"
                      name="code"
                    >
                      <q-input
                        readonly
                        color="orange-14"
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
                            name="money"
                            color="indigo-10"
                          />
                        </template>
                      </q-input>
                    </validate-field>
                  </div>
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.gender"
                      name="gender"
                    >
                      <q-select
                        :model-value="value"
                        :options="genderOpt"
                        map-options
                        emit-value
                        option-label="name"
                        option-value="value"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Gender"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="transgender"
                            color="indigo-10"
                          />
                        </template>
                      </q-select>
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
                        outlined
                        :model-value="value"
                        label="Address"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="place"
                            color="indigo-10"
                          />
                        </template>
                      </q-input>
                    </validate-field>
                  </div>
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.salary"
                      name="salary"
                    >
                      <q-input
                        color="orange-14"
                        type="text"
                        outlined
                        :model-value="value"
                        label="Salary"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="money"
                            color="indigo-10"
                          />
                        </template>
                      </q-input>
                    </validate-field>
                  </div>
                  <!-- end-right-side  -->
                </div>
              </div>
            </div>
          </q-card-section>
          <!-- {{ getBranch() }} -->
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
    <!-- {{ store.state.auth.branchId }} -->
  </div>
</template>

<script setup>
import { Form as ValidateForm, Field as ValidateField } from 'vee-validate'
import actions from '../../store/actions'
import toast from '../../Helper/toast.js'
import { object, string, date } from 'yup'
import { ref, onMounted, watch } from 'vue'
// import store from '../../store/'
// import api from '../../utils/utility'
import { useStore } from 'vuex'
import router from '../../router'
import dayjs from 'dayjs'
import api from '../../utils/utility'
import axios from 'axios'
const formRef = ref('')
const loading = ref(false)
const store = useStore()
const branchOpt = ref([])
const preBranchId = ref('')
// const name = ref('')
const form = ref({
  code: '001',
  name: '',
  phone: '',
  positionId: '',
  gender: '',
  address: '',
  salary: '',
  date: dayjs(new Date()).format('YYYY-MM-DD'),
})
const positionOpt = ref([
  {
    name: 'Cashier',
    value: 'Cashier',
  },
  {
    name: 'Teller',
    value: 'Teller',
  },
])
const genderOpt = ref([
  {
    name: 'Male',
    value: 'Male',
  },
  {
    name: 'Female',
    value: 'Female',
  },
])
const driverOpt = ref([])
const invisibleBtn = ref(false)
// const rules = object({
//   name: string().required().label('Name'),
//   positionId: string().required().label('Position'),
//   phone: string().required().label('Phone'),
//   gender: string().required().label('Gender'),
//   address: string().required().label('Address'),
//   salary: string().required().label('Salary'),
//   date: date().required().label('Date'),
// })
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
watch(
  form.value,
  (newValue, oldValue) => {
    if (newValue) {
    }
  },
  { immediate: true }
)
const getBranch = async () => {
  await api
    .get('branch/getCurrentBranch/' + store.state.auth.branchId)
    .then((res) => {
      console.log(res.data);
      if (res) {
          branchOpt.value  = res.data
          preBranchId.value = res.data.name + ' [ ' + res.data.code + ' ] ' ;
           // return res.data.name;
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const onSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (valid) {
    let methods = '/car/createCar'
    let doc = form.value
    doc.branchId = store.state.auth.branchId

    // if (showId.value) {
    //   methods =  'car/updateCar'
    // }
    // loading.value = true
    let res = await api.post('staff/createStaff', doc)
    if (res) {
      toast.success({ message: 'Insert successfully ' })
      loading.value = false
      router.go(-1)
    } else {
      toast.error({ message: 'There was somehting wrong to add car' })
      router.go(-1)
    }
  }
}
const cancel = () => {
  router.go(-1)
}
const findDriver = async () => {
  await api.get('/driver/getDriver').then((res) => {
    if (res) {
      console.log(res.data.items)
      driverOpt.value = res.data.items
    }
  })
}

// count for increase code 
const countStaff = async ( )=>{
  await api.get('staff/countStaff').then((res) => {
    if(res){
      form.value.code = res.data.length + 1;
        // console.log('hi', res);
    }
  })
}
onMounted(() => {
  findDriver()
  countStaff()
  
  // if (store.state.auth.branchId) {
    getBranch()
  // }
})
</script>

<style scoped></style>
