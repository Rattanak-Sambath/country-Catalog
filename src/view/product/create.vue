<template>
  <div>
    <q-card class="flex justify-space-between">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          ><q-icon name="add"></q-icon> Create Product</q-toolbar-title
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
      <q-card-section class="text-grey-15 text-bold">
        Fill the form below to crate new Product
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
                <div class="row q-col-gutter-y-sm">
                 
                  <!-- <q-uploader
                  outlined
                    v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                    :model-value="value"
                    url="http://localhost:4444/upload"
                   
                  /> -->

                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.name"
                      name="name"
                    >
                    <q-input
                        :model-value="value"
                        label="Name"
                        outlined
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      />
                    </validate-field>
                  </div>

                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.model_id"
                      name="model_id"
                    >
                    <q-select
                        :model-value="value"
                        :options="allowedBranchOpts"
                        map-options
                        emit-value
                        option-label="name"
                        option-value="_id"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Model"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                      </q-select>
                    </validate-field>
                  </div>

                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.color_id"
                      name="color_id"
                    >
                    <q-select
                        :model-value="value"
                        :options="allowedBranchOpts"
                        map-options
                        emit-value
                        option-label="name"
                        option-value="_id"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Color"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                      </q-select>
                    </validate-field>
                  </div>     

                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.qty"
                      name="qty"
                    >
                    <q-input
                        type="number"
                        :model-value="value"
                        label="Qty"
                        outlined
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      />
                    </validate-field>
                  </div>
                  
                </div>
              </div>

              <div class="col-xs-12 col-md-6 col-lg-6">
                <div class="row q-col-gutter-y-sm">
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.allowedBranch"
                      name="allowedBranch"
                    >
                      <q-select
                        :model-value="value"
                        :options="allowedBranchOpts"
                        map-options
                        emit-value
                        option-label="label"
                        option-value="_id"
                        color="orange-14"
                        type="text"
                        outlined
                        label="allowed Branch"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                      </q-select>
                    </validate-field>
                  </div>

                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.roleGroupId"
                      name="roleGroupId"
                    >
                      <q-select
                        :model-value="value"
                        :options="roleGroupOpts"
                        map-options
                        emit-value
                        option-label="name"
                        option-value="_id"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Role group"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="engineering"
                            color="indigo-10"
                          />
                        </template>
                      </q-select>
                    </validate-field>
                  </div>

                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model.number="form.expiryDay"
                      name="expiryDay"
                    >
                      <q-input
                        :model-value="value"
                        label="Expiry day *"
                        type="number"
                        outlined
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      />
                      <!-- :suffix="form.expiryDate"
                        @update:model-value="expiryDayChange" -->
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
                        style="font-size: 11px"
                      >
                        {{ errorMessage }}
                      </div>
                    </validate-field>
                  </div>
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.roles"
                      name="roles"
                    >
                      <fieldset class="text-left">
                        <legend>Roles</legend>
                        <div class="row">
                          <div
                            v-for="role in roleFetch"
                            :key="role.name"
                            class="col-xs-6 col-sm-6 col-md-4"
                          >
                            <q-checkbox
                              :model-value="value"
                              :val="role.name"
                              :label="startCase(role)"
                              v-bind="field"
                            />
                          </div>
                        </div>
                      </fieldset>
                      <!-- v-if="!!errorMessage && value.length === 0" -->
                      <div
                        class="text-negative"
                        style="font-size: 11px"
                      >
                        {{ errorMessage }}
                      </div>
                    </validate-field>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <!-- <q-card-section> {{}} </q-card-section> -->
          <q-card-section>
            <div class="text-right q-gutter-x-md">
              <q-btn
                push
                icon="add"
                :label="showId ? 'Update' : 'Save'"
                color="primary"
                no-caps
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

import { useStore } from 'vuex'
import router from '../../router'
import dayjs from 'dayjs'
import api from '../../utils/utility'
import axios from 'axios'
import _, { has } from 'lodash'

// import { number } from 'yup/lib/locale';

const formRef = ref('')
const loading = ref(false)
const form = ref({
  name: '',
  model_id: '',
  color_id: '',
  image_path: '',
  describtion: '',
  price: '',
  status: '',
  qty: '',
  date:  dayjs(new Date()).format('YYYY-MM-DD'),
  
})
const roleFetch = ref([])
const allowedBranchOpts = ref([])
const roleGroupOpts = ref([])
const staffOpt = ref([])
const rules = object({
  name: string().required().label('Name'),
  type: string().required().label('Type'),
  // staffId: string().required().label('Staff'),
  fullname: string().required().label('Role'),
  email: string().required().label('Status'),
  password: string().required().label('Password'),
  allowedBranch: string().required().label('Allowed branches'),
  roleGroupId: string().required().label('Role group'),
  expiryDay: string().required().label('Expiry day'),
  status: string().required().label('Status'),
})

const showId = ref('')
const concel = () => {
  showId.value = null
  form.value.name = ''
  form.value.address = ''
  form.value.position = ''
  form.value.gender = ''
  form.value.salary = ''
  loading.value = false
}
const startCase = (val) => _.startCase(val)

const onSubmit = async () => {
  const { valid } = await formRef.value.validate()
  // console.log('form', form.value)
  if (valid) {
    let methods = '/auth/register'
    // if(showId.value){
    //   methods = 'driver/updateDriver'
    // }
       loading.value = true
    let res = await api.post(methods, form.value)
    if (res) {
      toast.success({ message: 'Insert successfully' })
      router.go(-1)
      loading.value = false
    } else {
      toast.error({ message: 'There was somehting wrong to add car' })
      throw 'There was something wrong !!'
    }
  }
}
// const val = form.value.roleGroupId
watch(
  () => form.value.roleGroupId,
  (newValue) => {
    if (newValue) {
      api
        .get('roleGroup/getRoleGroupbyId/' + newValue)
        .then((res) => {
          roleFetch.value = []
          roleFetch.value = res.data.roleGroup.role
          form.value.roles = roleFetch.value
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  { deep: true, immediate: true }
)

watch(()=>form.value.type, (newValue)=>{
  if(newValue){
      form.value.staffId = null
  }
})
const fetchAllowBranch = async () => {
  await api
    .get('/branch/fetchAllBranch', [])
    .then((res) => {
      // console.log(res.data)
      allowedBranchOpts.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
const getStaff = async () => {
  await api
    .get('/staff/getAllStaff', [])
    .then((res) => {
      console.log('find staff', res.data);
      console.log(res.data)
      staffOpt.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
const fetchAllRoleGroups = async () => {
  await api
    .get('roleGroup/getAllRoleGroup', [])
    .then((res) => {
      console.log('roleGroup', res.data)
      roleGroupOpts.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
const cancel = () => {
  router.go(-1)
}
onMounted(() => {
  fetchAllowBranch()
  getStaff()
  fetchAllRoleGroups()
 
})
</script>

<style scoped></style>
