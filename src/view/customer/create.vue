<template>
  <div>
    <q-card class="flex justify-space-between">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          ><q-icon name="add"></q-icon> Create Customer</q-toolbar-title
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
        Fill the form below to crate new Customer
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
                 
                
                </div>
                <!-- end-left-side  -->
              </div>

              <div class="col-xs-12 col-md-6 col-lg-6">
                <div class="row q-col-gutter-y-md">
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
                      v-model="form.status"
                      name="status"
                      
                    >
                      <!-- <q-option-group
                        :model-value="value"
                        :options="statusOpts"
                        v-bind="field"
                        color="primary"
                        inline
                        style="display: inline-block"
                      /> -->
                      <span>Status : </span>
                      <q-radio
                        :model-value="value"
                        checked-icon="task_alt"
                        v-bind="field"
                        unchecked-icon="panorama_fish_eye"
                        val="Active"
                        label="Active"
                      />
                      <q-radio
                        :model-value="value"
                        checked-icon="task_alt"
                        v-bind="field"
                        unchecked-icon="panorama_fish_eye"
                        val="Inactive"
                        label="Inactive"
                      />
                      <div
                        v-if="!!errorMessage"
                        class="text-negative"
                        style="font-size: 14px"
                      >
                        {{ errorMessage }}
                      </div>
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
// const preBranchId = ref('')
// const name = ref('')
const form = ref({
  date: dayjs(new Date()).format('YYYY-MM-DD'),
  code: '001',
  name: '',
  phone: '',
  address: '',
  status: '',
})

const driverOpt = ref([])
const invisibleBtn = ref(false)
const rules = object({
  name: string().required().label('Name'),
  phone: string().required().label('Phone'),
  code: string().required().label('Code'),
  address: string().required().label('Address'),
  status: string().required().label('Status'),
  date: date().required().label('Date'),
})
const showId = ref('')
// const concel = () => {
//   showId.value = null
//   form.value.name = ''
//   form.value.model = ''
//   form.value.weight = ''
//   form.value.color = ''
//   form.value.driverId = ''
//   loading.value = false
// }
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
    form.value.branchId = store.state.auth.branchId
    // console.log('form', form.value);
    await api.post('customer/createCustomer', form.value).then((res)=>{
     if(res){
      toast.success({ message: 'Insert customer successfully ' })
      loading.value = false
      router.go(-1)
     }
    }).catch((err)=>{
      if(err.response.status == 500 ){
        toast.error({ message: err.response.data })
      }
      else {
        toast.error({ message: err.data })
        router.go(-1)
      }
    
    })
    // if (res) {
    //  toast.error({ message: err.message })
    //   router.go(-1)
    // } else {
      
    // }
  }
}
const cancel = () => {
  router.go(-1)
}

onMounted(() => {

})
</script>

<style scoped></style>
