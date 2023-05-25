<template>
  <div>
    <q-card class="flex justify-space-between">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          ><q-icon name="add"></q-icon> Create Purchase</q-toolbar-title
        >
        <q-space />
        <q-btn
          icon="west"
          outline
          color="primary"
          @click="router.go(-1)"
          >Back</q-btn
        >
      </q-toolbar>
    </q-card>
    <q-card class="q-my-md">
      <q-card-section class="text-grey-15 text-bold">
        Fill the form below to crate new Purchase
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
                              <!-- <validate-field
                                v-slot="{ value, field, errorMessage }"
                                v-model="form.image_path"
                                name="image_path"> -->
                                <q-input
                                       v-model="form.image_path"
                                      @update:model-value="val => { file = val[0] }"
                                      filled
                                      type="file"
                                      hint="Native file"
                                    />
                                <!-- <q-input
                                    :model-value="value"                      
                                    type="file"
                                    outlined
                                    v-bind="field"
                                    :error="!!errorMessage"
                                    :error-message="errorMessage"
                                  /> -->
                              
                            <!-- </validate-field> -->
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
const store = useStore()
const formRef = ref('')
const loading = ref(false)
const brandOpt = ref([])
const categoryOpt = ref([])
const form = ref({
  name: '',
  model_id: '',
  color_id: '',
  image_path: [],
  describtion: '',
  price: '',
  status: '',
  qty: '',
  brand_id:'',
  category_id:'',
  date:  dayjs(new Date()).format('YYYY-MM-DD'),
  
})
const roleFetch = ref([])
const allowedBranchOpts = ref([])
const roleGroupOpts = ref([])
const staffOpt = ref([])
const modelOpt = ref([])
const colorOpt = ref([])
const rules = object({
  name: string().required().label('Name'),
  // image_path: string().required().label('Image'),
  // // staffId: string().required().label('Staff'),
  // fullname: string().required().label('Role'),
  // email: string().required().label('Status'),
  // password: string().required().label('Password'),
  // allowedBranch: string().required().label('Allowed branches'),
  // roleGroupId: string().required().label('Role group'),
  // expiryDay: string().required().label('Expiry day'),
  // status: string().required().label('Status'),
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
    let methods = '/product/createProduct'
    form.value.branchId = store.state.auth.branchId
    loading.value = true
    console.log(form.value);
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
// get staff
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

// get model 

const getModel = async () => {
  await api
    .get('/model/getAllModel/' + store.state.auth.branchId)
    .then((res) => {    
      console.log('Get model', res.data);
      modelOpt.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

// get Color
const getColor = async () => {
  await api
    .get('/color/getAllColor/' + store.state.auth.branchId)
    .then((res) => {    
      console.log('Get model', res.data);
      colorOpt.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
// get brand
const getBrand = async () => {
  await api
    .get('/brand/getAllBrand/' + store.state.auth.branchId)
    .then((res) => {    
      console.log('Get brand', res.data);
      brandOpt.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
// get Category
const getCategory = async () => {
  await api
    .get('/category/getAllCategory/' + store.state.auth.branchId)
    .then((res) => {    
      console.log('Get category', res.data);
      categoryOpt.value = res.data
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
  getModel()
  getColor()
  getBrand()
  getCategory()
 
})
</script>

<style scoped></style>
