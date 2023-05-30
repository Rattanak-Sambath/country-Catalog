<template>
  <div>
    <q-card class="flex justify-space-between">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          ><q-icon name="add"></q-icon> Update Sale</q-toolbar-title



          
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
        Fill the form below to update new Sale
      </q-card-section>
      <ValidateForm
        ref="formRef"
        :validation-schema="rules"
      >
        <q-form
          @submit.prevent.stop="onSubmit()"
          class="mt-4 text-center"
        >
        <q-card-section class="">
            <div class="row q-col-gutter-x-xl q-col-gutter-y-md ">
            
              <div class="col-xs-12 col-md-6 col-lg-6 q-mx-auto ">
                <div class="row q-col-gutter-y-sm q-mx-auto">
                 
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
                      v-model="form.code"
                      name="code"
                    >
                    <q-input
                    readonly
                        :model-value="value"
                        label="Code *"
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
                      v-model="form.customerId"
                      name="customerId"
                    >
                    <q-select
                        :model-value="value"
                        :options="customerOpt"
                        map-options
                        emit-value
                        option-label="label"
                        option-value="_id"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Customer *"
                        v-bind="field"
                        :error="!!errorMessage"
                        :error-message="errorMessage"
                      >
                      </q-select>
                    </validate-field>
                  </div>   
                  <div class="col-12 q-my-sm text-left bg-blue-grey-2 text-gray-4 q-pa-md rounded-borders" >
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.type"
                      name="type"                    
                    >
                   
                      <span>Sale Type : </span>
                      <q-radio
                        :model-value="value"
                        checked-icon="task_alt"
                        v-bind="field"
                        unchecked-icon="panorama_fish_eye"
                        val="Cash"
                        label="Cash"
                      />
                      <q-radio
                        :model-value="value"
                        checked-icon="task_alt"
                        v-bind="field"
                        unchecked-icon="panorama_fish_eye"
                        val="Invoice"
                        label="Invoice"
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
                </div>
              </div>

              <div class="col-xs-12 col-md-6 col-lg-6">
                <div class="row q-col-gutter-y-sm">
                  <div class="col-12">
                    <validate-field
                      v-slot="{ value, field, errorMessage }"
                      v-model="form.staffId"
                      name="staffId"
                    >
                    <q-select
                        :model-value="value"
                        :options="staffOpt"
                        map-options
                        emit-value
                        option-label="label"
                        option-value="_id"
                        color="orange-14"
                        type="text"
                        outlined
                        label="Staffs *"
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
                      v-model="form.note"
                      name="note"
                    >
                    <q-input
                       type="textarea"
                        :model-value="value"
                        label="Note *"
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

            <!-- item detail  -->
            <div class="q-my-md ">
              <q-markup-table
    flat
    bordered
  >
    <thead>
      <tr class="bg-primary text-white">
        <template
          v-for="(it, i) in titles"
          :key="i"
        >
          <th :class="it.class">{{ it.label }}</th>
        </template>
      </tr>
    </thead>
    <tbody>
        <tr
        v-for="(it, idx) in formDetail"
        :key="idx"
      >
        <td
          class="text-left"
          style="width: 30px"
        >
          {{  idx + 1 }}
        </td>
        <td
          class="text-left"
          style="width: 450px"
        >
          <q-select
            v-model="it.productId"
            :options="productOpt"
            map-options
            emit-value
            clearable
            option-label="name"
            option-value="_id"
            dense
            outlined
            @update:model-value="rowChange(it, 'productId')"
          />
        </td>
        <td
          class="text-left"
          style="width: 250px"
        >
        <q-input
            v-model.number="it.qty"
            type="number"
            dense
            outlined
            @update:model-value="rowChange(it, 'qty')"
          />
       <!-- <q-input
            readonly
            v-model="it.oilName"
            outlined
            dense
            @update:model-value="rowChange(it, 'oil')"
          />  -->
        </td>
        
        <td
          class="text-left"
          style="width: 180px"
        >
          <q-input
            readonly
            v-model.number="it.price"
            type="number"
            dense
            outlined
            @update:model-value="rowChange(it, 'price')"
          />
        </td>
        
         <td
          class="text-left"
          style="width: 180px"
        >
          <span>{{ it.amount }} $</span>
        </td> 
         <td
          class="text-left q-gutter-x-md"
          style="width: 30px"
        >
        <!-- v-show="visibleRemove() && disableSubmit" -->
          <q-btn
            v-show="formDetail.length > 1"
            icon="delete"
            round
            color="negative"
            size="8px"
            @click="onRemoveRow(it, index)"
          />
          <!-- v-show="visibleAdd(index) && disableSubmit" -->
          <q-btn
            icon="add"
            color="green"
            dense
            round
            no-caps
            size="8px"
            @click="addEmptyRow"
          />
        </td>
      </tr> 
    </tbody>
  </q-markup-table>
            </div>
            <!-- total sub -->
            <div>
              <div class="row justify-end q-px-md">
          <div class="flex justify-end q-mb-md">
            <q-list
              bordered
              style="width: 300px"
            >
              <q-item>
                <q-item-section avatar>
                  <q-icon
                    name="payments"
                    color="green"
                  />
                </q-item-section>
                <q-item-section class="text-subtitle2">Total: </q-item-section>
                <q-item-section
                  side
                  class="text-black"
                >
                  {{ decimalNumber(totalAmount, 2) }} $
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon
                    name="payments"
                    color="green"
                  />
                </q-item-section>
                <q-item-section class="text-subtitle2">Total: </q-item-section>
                <q-item-section
                  side
                  class="text-black"
                >
                  {{ decimalNumber(form.totalRiel, 2)}} ៛
                </q-item-section>
              </q-item>
              <!-- <q-item>
                <q-item-section avatar>
                  <q-icon
                    name="payments"
                    color="green"
                  />
                </q-item-section>
                <q-item-section class="text-subtitle2">Balance:</q-item-section>
                <q-item-section
                  side
                  class="text-black"
                >
                  {{ balance }}
                </q-item-section>
              </q-item> -->
            </q-list>
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
import { ref, onMounted, watch, computed } from 'vue'
import { useStore } from 'vuex'
import router from '../../router'
import dayjs from 'dayjs'
import api from '../../utils/utility'
import _ from 'lodash'
import { useRoute } from 'vue-router'
// import { number } from 'yup/lib/locale';

import decimalNumber from '../../lib/numeral.js'; 
const $route = useRoute()
const store = useStore()
const formRef = ref('')
const loading = ref(false)
const diaglogDelete = ref(false)
const deleting = ref(false)
const dataDoc = ref([]);

const productOpt = ref([])
const customerOpt = ref([])
const staffOpt = ref([])
const removeName = ref('')
const form = ref({
  code: '',
  customerId: '',
  staffId: '',
  type: '',
  note: '',
  date:'',
  totalAmount: 0,
  totalRiel: 0
  
})
const formDetail = ref([
{
  
    productId: '',
    qty: 1,
    price: 0,
    amount:0
    
  }
]);
const titles = ref([
  {
    label: 'No',
    class: 'text-left',
  },
  {
    label: 'Product',
    class: 'text-left',
  },

  {
    label: 'Qty',
    class: 'text-left',
  },
  {
    label: 'Price',
    class: 'text-left',
  },
  {
    label: 'Amount',
    class: 'text-left',
  },
  {
    label: 'Actions',
    class: 'text-left',
  },
])
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
  // name: string().required().label('Name'),
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
  

  form.value.name = ''
  form.value.address = ''
  form.value.position = ''
  form.value.gender = ''
  form.value.salary = ''
  loading.value = false
}
const addEmptyRow = () => {
  const row = {
    
    productId: '',   
    qty: 1,
    price: 0,
    amount: 0
  }
  formDetail.value.push(row)
}
const totalAmount = computed(()=>{
  let total = 0 ;
  formDetail.value.forEach((it)=>{
    total += it.amount;
   form.value.totalRiel = total * 4100; 
    form.value.totalAmount = total 
  })
  return total ;
})

const onRemoveRow = (it, index)=>{
    console.log('index', it);
    formDetail.value.splice(it,1)
}
const rowChange =async (it, index)=>{
    
    let selector = it.productId;
    await api
    .get('/product/getProductById/' +  selector)
    .then((res) => {
      it.price = res.data.price
      it.amount = it.price * it.qty

      // formDetail.value.price = res.data.price
    })
    .catch((err) => {
      console.log(err)
    })
}
// find Product
const getProduct = async () => {
  let doc = {
    status: 'Active',
    branchId: store.state.auth.branchId
  };

  await api
    .get('/product/getAllProduct', {
      params:{
          branchId: store.state.auth.branchId,
          status : 'Active',
      }
    })
    .then((res) => {
      console.log('find product', res.data);
      productOpt.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
const getCustomer = async () => {
  await api
    .get('customer/getAllStaff', {
      params:{
        branchId: store.state.auth.branchId,
        status: 'Active'
      }
    })
    .then((res) => {
      console.log('find customer', res.data);
      customerOpt.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
const getStaff = async () => {
  await api
    .get('staff/getAllStaff', {
      params:{
        branchId: store.state.auth.branchId,
        status: 'Active'
      }
    })
    .then((res) => {
      console.log('find staff', res.data);
      staffOpt.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const findDatabyId = async () => {

  let res = await api.get("/sale/getSaleById/" + $route.params.id)
  if (res) {
    console.log('by id ', res.data)
    removeName.value = res.data.sale.name
    form.value.code = res.data.sale.code
    form.value.date= res.data.sale.date
    form.value.customerId = res.data.sale.customerId
    form.value.staffId = res.data.sale.staffId
    form.value.type = res.data.sale.type
    form.value.note = res.data.sale.note
    formDetail.value = res.data.detail
   
  }
}

// get product

const startCase = (val) => _.startCase(val)
const onRemove = async () => { 
  showId.value = $route.params.id
  // removeName.value = param.name;
  diaglogDelete.value = true
}
const onConfirmDelete = async () => {
  let data = await api.delete('/sale/removeSale/' + showId.value)
  if (data) {
      router.go(-1)
      diaglogDelete.value = false
      toast.success({ message: '' })
  } else {
    toast.error(err.data.status)
  }
}   

// onSubmit

const onSubmit = async () => {
  const { valid } = await formRef.value.validate()
     dataDoc.value = []
    // check if productId is select
    formDetail.value.forEach((item)=>{
      if(item.productId){
        dataDoc.value.push(item)
      }
      if(formDetail.value[0].productId === "" ){
        toast.error({message: 'Please Check Product Again !!'})
      }
    })
    if(dataDoc.value.length){
        if (valid) {
          form.value.branchId = store.state.auth.branchId   
          loading.value = true
          let res = await api.put('/sale/updateSale/' + $route.params.id,
            {form:form.value, details : dataDoc.value}
          )
          if (res) {
            toast.success({ message: 'Updated Sale successfully' })
            router.go(-1)
          } else {
            toast.error({ message: 'There was somehting wrong to add car' })
            throw 'There was something wrong !!'
          }
        }
    }
}

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
  getProduct()
  getCustomer()
  getStaff()
  
})
</script>

<style scoped></style>
