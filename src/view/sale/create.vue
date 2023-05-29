<template>
  <div>
    <q-card class="flex justify-space-between">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          ><q-icon name="add"></q-icon> Create Sale</q-toolbar-title
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
    <q-card class="q-my-md  ">
      <div class="flex justify-between">
        <q-card-section class="text-grey-15 text-bold">
        Fill the form below to crate new Sale
      </q-card-section>
      <q-card-section class="text-grey-15 text-bold"> 
        Current Exchange 1$ =  {{currentExchage  }}៛
      </q-card-section>
      </div>
      <div class="q-mx-auto">
      <ValidateForm
        ref="formRef"
        :validation-schema="rules"
      >
        <q-form
          @submit.prevent.stop="onSubmit()"
          class="mt-4 text-center q-mx-auto"
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
            option-label="label"
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
    </div>
    </q-card>
  </div>
</template>

<script setup>
import { Form as ValidateForm, Field as ValidateField } from 'vee-validate'
import toast from '../../Helper/toast.js'
import { date, object, string } from 'yup'
import { ref, onMounted, watch , computed} from 'vue'
import { useStore } from 'vuex'
import router from '../../router'
import dayjs from 'dayjs'
import api from '../../utils/utility'
import axios from 'axios'
import _, { has } from 'lodash'

import decimalNumber from '../../lib/numeral.js'; 
// import { number } from 'yup/lib/locale';
const store = useStore()
const formRef = ref('')
const loading = ref(false)
const productOpt = ref([])
const currentExchage = 4100;
// const categoryOpt = ref([])
const formDetail = ref([
  {
    index:1,
    productId: '',
    qty: 1,
    price: 0,
    amount:0
    
  }
]
)
const form = ref({
  code: '001',
  customerId: '',
  staffId: '',
  type: '',
  note: '',
  date:  dayjs(new Date()).format('YYYY-MM-DD'),
  totalAmount: 0,
  totalRiel: 0
  
})
const roleFetch = ref([])
const roleGroupOpts = ref([])
const staffOpt = ref([])
const modelOpt = ref([])
const customerOpt = ref([])

const rules = object({
  customerId: string().required().label('Customer'),
  staffId: string().required().label('Staff'),
  type: string().required().label('Type'),
  code: string().required().label('Code'),
  date: date().required().label('Date'),
})
const addEmptyRow = () => {
  const row = {
    index:0,
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
    formDetail.value.splice(index,1)
}
const rowChange =async (it, index)=>{
    let selector = it.productId;
    await api
    .get('/product/getProductById/' +  selector)
    .then((res) => {
    
      it.price = res.data.price
      it.amount = it.price * it.qty   
      if(it.productId === null){
        console.log('welcome' );
      }  
      // formDetail.value.price = res.data.price
    })
    .catch((err) => {
      it.price = 0
      it.amount = 0
      console.log(err)
    })
}
// watch(()=>formDetail.value.productId,(newValue)=>{
//   if(newValue !== null){
//     totalAmount()
//   }else {
//     totalAmount()
//   }
// },{deep: true, immediate: true })
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
const visibleRemove = () => {
  // return !(form.value.length <= props.minRow)
}
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
const countSale = async()=>{

    await  api.get('sale/countSale',{
      params:{
         branchId: store.state.auth.branchId
      }
    }).then((res)=>{
      if(res){
          form.value.code = res.data.length + 1;
      }
    }).catch((err)=>{
      console.log(err);
    })
}
const onSubmit = async () => {
  const { valid } = await formRef.value.validate()
  // console.log('form', form.value)
  const check =  formDetail.value.forEach((item)=>{
      let data = '';
      if(!item.productId){
        data = false;
        toast.error({message: 'Please Check Product Again !!'})
      }
      return data;
  })
  if(check !==  false){
      if (valid) {
      form.value.branchId = store.state.auth.branchId
      
      let res = await api.post('/sale/createSale',
        {
        form: form.value, details: formDetail.value
        }
        )
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



// get staff
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

// get product
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
// productOpt

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
  getProduct()
  getStaff()
  fetchAllRoleGroups()
  getCustomer()
  countSale()
 
})
</script>

<style scoped></style>
