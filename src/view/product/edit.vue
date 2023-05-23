<template>
  <div>
    <q-card class="flex justify-space-between">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          ><q-icon name="add"></q-icon> Update User</q-toolbar-title
        >
        <q-space />
        <q-btn
          icon="west"
          outline
          color="primary"
          @click="cancel()"
          >Back</q-btn
        >
      </q-toolbar>
    </q-card>
    <q-card class="q-my-md">
      <q-card-section class="text-grey-15">
        Fill the form below to update new Driver
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
            
              <div class="col-xs-12 col-md-6 col-lg-4">
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
                      v-model="form.name"
                      name="name"
                    >
                    <q-input
                        :model-value="value"
                        label="Name *"
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
                        :options="modelOpt"
                        map-options
                        emit-value
                        option-label="name"
                        option-value="_id"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Model *"
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
                        :options="colorOpt"
                        map-options
                        emit-value
                        option-label="name"
                        option-value="_id"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Color *"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                      </q-select>
                    </validate-field>
                  </div>     

                  <!-- <div class="col-12">
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
                  </div> -->
                  
                </div>
              </div>

              <div class="col-xs-12 col-md-6 col-lg-4">
                <div class="row q-col-gutter-y-sm">
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.brand_id"
                      name="brand_id"
                    >
                    <q-select
                        :model-value="value"
                        :options="brandOpt"
                        map-options
                        emit-value
                        option-label="name"
                        option-value="_id"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Brand *"
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
                      v-model="form.category_id"
                      name="category_id"
                    >
                    <q-select
                        :model-value="value"
                        :options="categoryOpt"
                        map-options
                        emit-value
                        option-label="name"
                        option-value="_id"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Category *"
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
                      v-model="form.cost"
                      name="cost"
                    >
                    <q-input
                        :model-value="value"
                        label="Cost *"
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
                      v-model="form.price"
                      name="price"
                    >
                    <q-input
                        :model-value="value"
                        label="Price *"
                        outlined
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      />
                    </validate-field>
                  </div>   
                </div>
              </div>
  
              <div class="  col-xs-12 col-md-6 col-lg-4">
                   <div class="column q-col-gutter-y-sm">
                    <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model.number="form.describtion"
                      name="describtion"
                    >
                      <q-input
                        :model-value="value"
                        label="Describtion"
                        type="text"
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
                      v-model="form.spec"
                      name="spe"
                    >
                    <q-input
                        :model-value="value"
                        label="Privide spec of product *"
                        outlined
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      />
                    </validate-field>
                  </div>
                    <div class="col-12 q-my-sm">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.status"
                      name="status"
                    >
                   
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
                        <div class="col-12 items-center q-mx-auto">
                              <validate-field
                                v-slot="{ value, field, errorMessage }"
                                v-model="form.image_path"
                                name="image_path">
                                <!-- <q-uploader
                                  v-model="form.image_path"                        
                                  url="http://localhost:4444/upload"
                                  style="max-width: 300px"
                                /> -->
                                <q-input
                                    :model-value="value"                      
                                    type="file"
                                    outlined
                                    v-bind="field"
                                    :error="!!errorMessage"
                                    :error-message="errorMessage"
                                  />
                              
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
                :disable="deleting"
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
    </q-card>
  </div>
</template>

<script setup>
import { Form as ValidateForm, Field as ValidateField } from 'vee-validate'
import toast from '../../Helper/toast.js'
import { object, string } from 'yup'
import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import router from '../../router'
import dayjs from 'dayjs'
import api from '../../utils/utility'
import _ from 'lodash'
import { useRoute } from 'vue-router'
// import { number } from 'yup/lib/locale';
const $route = useRoute()
const formRef = ref('')
const loading = ref(false)
const diaglogDelete = ref(false)
const deleting = ref(false)
const form = ref({
  name: '',
  model_id: '',
  color_id: '',
  image_path: '',
  describtion: '',
  price: '',
  status: '',
  qty: '',
  brand_id:'',
  category_id:'',
  date: '',
  
})
const roleFetch = ref([])
const allowedBranchOpts = ref([])
const roleGroupOpts = ref([])
const statusOpts = ref([
  {
    name: 'Inactive',
    value: 'Inactive',
  },
  {
    name: 'Active',
    value: 'Active',
  },
])
// const positionOpt = ref([
//   {
//     name: 'Pre-driver',
//     value:'Pre-driver'
//   },
//   {
//     name: 'Driver',
//     value: 'Driver'
//   }
// ])
// password: '',
// confirmPassword: '',

const rules = object({
  name: string().required().label('Name'),
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
  

  form.value.name = ''
  form.value.address = ''
  form.value.position = ''
  form.value.gender = ''
  form.value.salary = ''
  loading.value = false
}
const findDatabyId = async () => {

  let res = await api.get("/product/getProductById/" + $route.params.id)
  if (res) {
    console.log('data', res)
    form.value.name = res.data.name
    form.value.date= res.data.date
    form.value.model_id = res.data.model_id
    form.value.color_id = res.data.color_id
    form.value.brand_id = res.data.brand_id
    form.value.category_id = res.data.category_id 
    form.value.cost = res.data.cost
    form.value.price = res.data.price
    form.value.describtion = res.data.describtion
    form.value.spec = res.data.spec
    form.value.status= res.data.status
    // form.value.image_path = res.data.image_path
  }
}
const startCase = (val) => _.startCase(val)
const onRemove = async () => { 
  showId.value = $route.params.id
  // removeName.value = param.name;
  diaglogDelete.value = true
}
const onConfirmDelete = async () => {
  let data = await api.delete('/product/removeProduct/' + $route.params.id)
  if (data) {
      router.go(-1)
      diaglogDelete.value = false
      toast.success({ message: '' })
  } else {
    toast.error(err.data.status)
  }
}
const onSubmit = async () => {
  const { valid } = await formRef.value.validate()
  console.log('form', form.value)
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
// watch to get showId
watch(()=> $route.params, (newValue)=>{
  if(newValue){
      showId.value = newValue;
      console.log('hi', newValue);
  }
}, { deep: true, immediate: true })

// get Allow Branch

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
// fetchRole
const fetchAllRoleGroups = async () => {
  await api
    .get('roleGroup/getAllRoleGroup', [])
    .then((res) => {
      // console.log('roleGroup', res.data)
      roleGroupOpts.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
const cancel = () => {
  router.go(-1)
}
// count User
const countUser = async () =>{
    await api.get('auth/countUser', [])
    .then((res)=>{
       if(res.data <= 1){
          deleting.value = true
       }
    }).catch((err)=>{
      console.log(err);
    })
}
onMounted(() => {
  findDatabyId()
  fetchAllowBranch()
  fetchAllRoleGroups()
  countUser()
})
</script>

<style scoped></style>
