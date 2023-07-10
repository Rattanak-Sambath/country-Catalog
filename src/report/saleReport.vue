<template>
    <div>
        <q-card class="q-mb-lg">
            <div class="report-name  q-mx-lg q-mb-md text-bold"  style="font-size: 20px;">
                    {{ startCase($route.name) }} 
             </div>
        </q-card>
      <q-card class="my-card">

        <ValidateForm
          ref="formRef"
          :validation-schema="rules"
        >
          <q-form class="q-gutter-md">
            <q-card-section>
              <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                <div class="col-xs-12 col-md-6 col-lg-6 q-my-md">
                  <!-- <validate-field
                    v-slot="{ value, field, errorMessage }"
                    v-model="form.branchId"
                    name="branchId"
                  >
                    <q-select
                      :model-value="value"
                      label="Branch *"
                      :options="allowedBranch"
                      option-value="value"
                      option-label="label"
                      outlined
                      map-options
                      emit-value
                      dense
                      v-bind="field"
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                    />
                  </validate-field> -->
  
                  <fieldset style="margin-bottom: 25px">
                    <legend>Date</legend>
                    <div
                      class="row justify-between"
                      style="align-items: center"
                    >
                      <div class="col-xs-12 col-md-6 col-lg-6">
                        <validate-field
                          v-slot="{ value, field, errorMessage }"
                          v-model="form.fromDate"
                          name="fromDate"
                        >
                          <q-input
                            :model-value="value"
                            filled
                            dense
                            v-bind="field"
                          >
                            <!-- :error="!!errorMessage"
                            :error-message="errorMessage" -->
                            <template #append>
                              <q-icon
                                name="event"
                                class="cursor-pointer"
                              >
                                <q-popup-proxy
                                  cover
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date v-model="form.fromDate">
                                    <div class="row items-center justify-end">
                                      <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="primary"
                                        flat
                                      />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </validate-field>
                      </div>
                      <div class="col-xs-12 col-md-6 col-lg-5">
                        <ValidateField
                          v-slot="{ value, field, errorMessage }"
                          v-model="form.toDate"
                          name="toDate"
                        >
                          <q-input
                            :model-value="value"
                            class="q-my-md"
                            filled
                            dense
                            v-bind="field"
                          >
                            <!-- :error="!!errorMessage"
                            :error-message="errorMessage" -->
                            <template #append>
                              <q-icon
                                name="event"
                                class="cursor-pointer"
                              >
                                <q-popup-proxy
                                  cover
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date v-model="form.toDate">
                                    <div class="row items-center justify-end">
                                      <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="primary"
                                        flat
                                      />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </ValidateField>
                      </div>
                    </div>
                  </fieldset>
                  <q-select
                    v-model="form.customerId"
                    :options="customerOpts"
                    multiple
                    option-value="_id"
                    option-label="label"
                    use-chips
                    style="margin-bottom: 25px"
                    clearable
                    map-options
                    emit-value
                    label="Customer"
                    outlined
                    dense
                    @update:model-value="handleCustomerChange"
                    @clear="customerNameOpts = []"
                  />
                  <q-select
                    v-model="form.staffId"
                    :options="staffOpts"
                    option-value="_id"
                    option-label="label"
                    multiple
                    use-chips
                    use-input
                    clearable
                    map-options
                    emit-value
                    label="Staff"
                    outlined
                    dense
                    style="margin-bottom: 25px"
                    @update:model-value="handleStaffChange"
                    @clear="staffNameOpts = []"
                  />
                </div>
  
                <div class="col-xs-12 col-md-6 col-lg-6 q-my-md">
                 
                  <!-- <q-select
                    v-model="form.status"
                    label="Status"
                    :options="statusOpts"
                    option-value="value"
                    option-label="label"
                    outlined
                    map-options
                    emit-value
                    dense
                    clearable
                    use-chips
                    multiple
                    style="margin-bottom: 25px"
                    @clear="form.status = []"
                  /> -->
  
                  <q-select
                    v-model="form.saleType"
                    label="Sale Type"
                    :options="saleTypeOpts"
                    option-value="value"
                    option-label="label"
                    outlined
                    map-options
                    emit-value
                    dense
                    clearable
                    use-chips
                    multiple
                    style="margin-bottom: 25px"
                    @clear="form.saleType = []"
                  />
                  <q-select
                    v-model="form.productOpt"
                    label="Product"
                    :options="ProductOpts"
                    option-value="_id"
                    option-label="label"
                    outlined
                    map-options
                    emit-value
                    dense
                    clearable
                    use-chips
                    multiple
                    style="margin-bottom: 25px"
                    @clear="productNameOpts= []"
                  />
                </div>
              </div>
            </q-card-section>
            <div class="text-right q-pb-md q-pr-md">
              <q-btn
                icon="search"
                label="Submit"
                color="primary"
                @click="onSubmit()"
              />
            </div>
          </q-form>
        </ValidateForm>
      </q-card>
      <ReportLayoutVue
        class="q-my-md"
        :exec-time="execTime"
        :report-title="`Testing`"
        :paper-size="paperSize"
        :css-text="cssText"
        :columns="columns"
        :active-columns="checkedColumns"
        @changeColumn="changeColumn"
      >
        <!--REPORT HEADER-->
        <template #header>
          <div class="report-name text-center q-mb-md" >
            {{ reportName }} {{ branchName ? branchName: 'No Branch' }}
          </div>
          <div class="report-name text-center  q-mb-md" style="font-size: 20px; font-weight: bold; font-family: 'Times New Roman', Times, serif; ">
            {{ startCase($route.name) }} 
          </div>
        </template>
  
        <!--REPORT FILTER-->
        <template #filter>
          <div class="row">
            <div class="col colspan-8">
              <span class="title"> Date : </span>
              {{ form.fromDate }} - {{ form.toDate }}
              <div class="ra-mt-sm" />
            </div>
            <div class="col colspan-4">
              <span class="title"> Customer : </span>
              {{ customerNameOpts }}
              <div class="ra-mt-sm" />
            </div>
            <div class="col colspan-4">
              <span class="title"> Product : </span>
              {{ productNameOpts }}
              <div class="ra-mt-sm" />
            </div>
            <div class="col colspan-4">
              <span class="title"> Staff : </span>
              {{ staffNameOpts }}
              <div class="ra-mt-sm" />
            </div>
          </div>
          <div class="row">
            <div class="col col-span-4">
              <div class="col colspan-4">
                <span class="title"> Status : </span>
                {{ form.status }}
                <div class="ra-mt-sm" />
              </div>
            </div>
            <div class="col colspan-4">
              <span class="title"> Sale Type : </span>
              {{ form.saleType }}
              <div class="ra-mt-sm" />
            </div>
            <div class="col colspan-4">
              <div class="ra-mt-sm" />
            </div>
            <div class="col colspan-4">
              <div class="ra-mt-sm" />
            </div>
          </div>
        </template>
  
        <!--REPORT CONTENT-->
        <div>
          <table
            id="myTable"
            class="table-content"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Date</th>
                <th>Customer</th>
               
                <th v-if="showMoreHeader('staff')">Staff</th>
                <th v-if="showMoreHeader('saleType')">Sale Type</th>
                <th v-if="showMoreHeader('status')">Status</th>
                <th v-if="showMoreHeader('product')">Product</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Price</th>
                <th class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(doc, index) in reportData"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  <span
                    class="ra-text-link"
                    @click="onRoute(doc.router)"
                  >
                    {{ doc.code }}
                  </span>
                </td>
                <td>{{ doc.date }}</td>
                <td>
                  <b>
                    {{ doc.customer }}
                  </b>
                </td>
                <td v-if="showMoreHeader('staff')">{{ doc.staff }}</td>
                <td v-if="showMoreHeader('saleType')">{{ doc.type }}</td>
                <td v-if="showMoreHeader('status')">{{ doc.status }}</td>
                <td v-if="showMoreHeader('oil')">{{ doc.oil }}</td>
  
                <td class="text-right">{{ decimalNumber(doc.qty, 2) }}</td>
                <td class="text-right">{{ decimalNumber(doc.price, 2) }}</td>
                <td class="text-right">{{ decimalNumber(doc.amount, 2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ReportLayoutVue>
    </div>
  </template>
  <script>
  import dayjs from 'dayjs'
  import { includes } from 'lodash'
  import { onMounted, ref, computed, nextTick, watch } from 'vue'
  import ReportLayoutVue from '../layouts/ReportLayout.vue'
  import { Form as ValidateForm, Field as ValidateField } from 'vee-validate'
  import { object, string , date} from 'yup'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import decimalNumber from '../lib/numeral'
  import api from '../utils/utility'
  import _, { has } from 'lodash'
  

  export default {
    name: 'SaleReport',
    components: {
      ReportLayoutVue,
      ValidateForm,
      ValidateField,
    },
    setup() {
      const store = useStore()
      const router = useRouter()
      const startCase = (val) => _.startCase(val)
      const currentCompanyId = computed(() => {
        return store.state.auth.branchId
      })
      //
    //   const allowedCompanies = computed(() => {
    //     const allowedCompanies = store.state.app.allowedCompanies
    //     const items = []
    //     allowedCompanies.forEach((it) => {
    //       const doc = {
    //         label: `${it.code} : ${it.name}`,
    //         value: it._id,
    //         shortName: it.shortName,
    //       }
    //       items.push(doc)
    //     })
    //     return items
    //   })
      //
      const execTime = ref(0)
      const paperSize = ref('a4-p')
      const reportName = ref('ហាងលក់ទូរស័ព្ទដែ ')
      const reportNameEn = ref('Sale')
      const columns = ref([
        {
          label: 'Product',
          value: 'product',
        },
        {
          label: 'Staff',
          value: 'staff',
        },
        {
          label: 'Sale Type',
          value: 'saleType',
        },
        {
          label: 'Status',
          value: 'status',
        },
        // {
        //   label: 'Pump',
        //   value: 'pump',
        // },
        // {
        //   label: 'Oil',
        //   value: 'oil',
        // },
      ])
  
      const checkedColumns = ref([
        'product',
        'staff',
        'saleType',
        'status',
        'pump',
        'oil',
      ])
  
      const reportData = ref([])
      const cssText = ref(``)
      const form = ref({
        name: '',
        fromDate: dayjs(new Date()).startOf('month').format('YYYY/MM/DD'),
        toDate: dayjs(new Date()).endOf('month').format('YYYY/MM/DD'),
        saleType: [],
        customerId: [],
        staffId: [],
        status: [],
        
        job: [],
        productOpt: [],
      })
  
      const formRef = ref('')
      const rules = object({
        // fromDate: date().required(),
        // toDate: date().required(),
        // branchId: string().required().label('Company'),
      })
      const customerNameOpts = ref([])
      const staffNameOpts = ref([])
      const jobNameOpts = ref([])
      const branchName = ref('')  
      const saleTypeOpts = ref([
        {
          label: 'Cash',
          value: 'Cash',
        },
        {
          label: 'Invoice',
          value: 'Invoice',
        },
      ])
      const statusOpts = ref([
        {
          label: 'Open',
          value: 'Open',
        },
        {
          label: 'Partial',
          value: 'Partial',
        },
        {
          label: 'Closed',
          value: 'Closed',
        },
      ])
  
      const jobOpts = ref([])
  
    //   const getJobOpts = () => {
    //     const doc = {
    //       companyId: form.value.companyId,
    //     }
    //     const { call } = useMethod('gas.getJobOpts', [])
    //     call({ doc })
    //       .then((res) => (jobOpts.value = res))
    //       // eslint-disable-next-line no-console
    //       .catch((error) => console.log(error))
    //   }
  
      const changeColumn = (val) => {
        checkedColumns.value = val
      }
      const showMoreHeader = (field) => {
        return includes(checkedColumns.value, field)
      }
  
      const onSubmit = async () => {
        const { valid } = await formRef.value.validate()
        if (valid) {
          const {
            customerId,
            staffId,
            status,
            saleType,
            fromDate,
            toDate,
            productDetailId,
          } = form.value
         
          //
          const doc = {
            customerId,
            staffId,
            status,
            saleType,
            productDetailId,
            fromDate,
            toDate
          }
          doc.branchId  = store.state.auth.branchId;
          //
          // doc.fromDate = dayjs(fromDate).startOf('day').toDate()
          // doc.toDate = dayjs(toDate).endOf('day').toDate()
          // console.log('doc', doc);
          await api.get('/sale/saleReport', {
            params: doc
          }).then((res)=>{
            if(res){
              console.log('res', res.data.data);
                reportData.value = res.data.data;
            }
          }).catch((err)=>{
            console.log('err', err);
          })
        }
      }
  
      //find product
      const ProductOpts = ref([])
      const getProductOpts = async () => {
        // const selector = {
        //   branchId: store.state.auth.branchId,     
        // }
        // console.log(selector);
        await api
                .get('/product/getProductReport' , {
                  params: {
                    branchId: store.state.auth.branchId
                  }
                })
                .then((res) => {   
                    if (res) {
                      // console.log('res', res.data);
                      ProductOpts.value = res.data
                    }
                    })
                .catch((err) => {
                console.log(err)
                })
        
      }  
      const productNameOpts = ref([])
      const handleProductChange = (newVal) => {
        let customerName = []
        if (newVal) {
          customerName = ProductOpt.value
            .filter((it) => newVal.includes(it._id))
            .map((it) => it.name)
          productNameOpts.value = customerName
        } else {
          form.value.customerId = []
        }
      }
      // find customer
      const customerOpts = ref([])
      const getCustomerOpts = async () => {
        const selector = {
          branchId: store.state.auth.branchId,     
        }
        await api
                .get('/customer/getCustomerReport' , selector)
                .then((res) => {   
                    if (res) {
                       customerOpts.value = res.data
                    }
                    })
                .catch((err) => {
                console.log(err)
                })
        
      }  
      const handleCustomerChange = (newVal) => {
        let customerName = []
        if (newVal) {
          customerName = customerOpts.value
            .filter((it) => newVal.includes(it._id))
            .map((it) => it.name)
          customerNameOpts.value = customerName
        } else {
          form.value.customerId = []
        }
      }
      const staffOpts = ref([])
      const findStaffs = async () => {
        const selector = {
          companyId: form.value.companyId,
        }
        await api
                .get('/staff/getStaffReport' , selector)
                .then((res) => {   
                    if (res) {
                        staffOpts.value = res.data
                    }
                    })
                .catch((err) => {
                console.log(err)
                })
      }
      const handleStaffChange = (newVal) => {
        let staffName = []
        if (newVal) {
          staffName = staffOpts.value
            .filter((it) => newVal.includes(it._id))
            .map((it) => it.name)
          staffNameOpts.value = staffName
        } else {
          form.value.staffId = []
        }
      }
   
      const onRoute = (route) => {
        router.push(route)
      }
      watch(currentCompanyId, (value) => {
        form.value.branchId = value
        nextTick(() => {
          getCustomerOpts()
          findStaffs()
       
        })
      })
      watch(
        () => form.value.branchId,
        (value) => {
          form.value.branchId = value
          nextTick(() => {
            getCustomerOpts()
            findStaffs()
           
          })
        }
      )
      const getBranch = async () => {
                await api
                    .get('branch/getCurrentBranch/' + store.state.auth.branchId)
                    .then((res) => {
                    // console.log(res.data)
                    if (res) {
                        branchName.value = res.data.name 
                    }
                    })
                    .catch((err) => {
                    console.log(err)
                    })
                }
      onMounted(() => {
        getBranch()
        getCustomerOpts()
        findStaffs()
        getProductOpts()
        // getOilMachineOpts()
      })
  
      return {
        reportNameEn,
        branchName,
        saleTypeOpts,
        onSubmit,
        form,
        execTime,
        paperSize,
        columns,
        reportName,
        reportData,
        checkedColumns,
        cssText,
        changeColumn,
        showMoreHeader,
        customerOpts,
        staffOpts,
        rules,
        formRef,
        ProductOpts,
        productNameOpts,
        statusOpts,
        decimalNumber,
        jobOpts,
        onRoute,
  
        handleCustomerChange,
        handleStaffChange,
        handleProductChange,
        customerNameOpts,
        staffNameOpts,
        jobNameOpts,
        startCase
      }
    },
  }
  </script>
  <style
    lang="scss"
    scoped
  >
  .report-card {
  margin-top: 10px;
  width: 100%;
  padding-bottom: 15px;
  overflow: unset !important;
  :deep(.header) {
    padding: 4px 10px !important;
    .card-header {
      display: flex;
      flex-flow: row nowrap;
      .header-left {
        flex: 1;
      }
      .header-right {
        flex: 1;
        text-align: right;
      }
    }
  }
}

// Show part checkbox title
.part-title {
  text-transform: capitalize;
}

$body-color: #34495e;
$title-color: #2c3e50;
$filters-border-bottom-color: #ddd;
$table-th-bgcolor: #f5f7fa;
$table-th-color: #2c3e50;
$table-td-color: #34495e;
$table-border-bottom-color: #ddd;
.report-body {
  color: $body-color;
  font-size: 12px !important;
  // Kh font
  .kh-moul {
    font-family: Khmer OS Moul, Moul !important;
  }
  .kh-battambang {
    font-family: Khmer OS Battambang, Battambang !important;
  }
  // Header
  .header {
    text-align: center;
    padding-bottom: 10px;
    color: $title-color;
    .company-name {
      font-size: 20px;
      font-weight: 600;
      padding-bottom: 5px;
    }
    .report-name {
      font-family: Khmer OS Moul, Moul !important;
      font-size: 20px;
      font-weight: 600;
      text-transform: uppercase;
      padding-bottom: 5px;
    }
    .report-period {
      font-size: 14px;
      font-weight: 500;
      padding-bottom: 5px;
    }
    .company-address {
      // .table-content': {
      //   'border-collapse': 'collapse',
      //   width: '100%',}
    }
  }
  // Filter
  .filter {
    padding-bottom: 0px;
    .title {
      font-size: 12px !important;
      color: $title-color;
      font-weight: 500;
    }
  }
  // Content
  .content {
    padding-bottom: 5px;
  }
  .table-content {
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;
    line-height: 23px;
    thead {
      th {
        color: $table-th-color;
        border-bottom: 1px solid $table-border-bottom-color;
        padding: 2px 5px;
        background-color: $table-th-bgcolor;
        text-align: left;
        text-transform: uppercase;
        position: sticky;
        top: 0px;
        box-shadow: 0.25em 0.25em 0.25em lightgray;
      }
    }
    tbody {
      th {
        color: $table-th-color;
        border-bottom: 1px solid $table-border-bottom-color;
        padding: 2px 5px;
        background-color: $table-th-bgcolor;
        text-align: left;
        text-transform: uppercase;
      }
    }
    td {
      color: $table-td-color;
      border-bottom: 1px solid $table-border-bottom-color;
      padding: 2px 5px;
      text-align: left;
      vertical-align: top;
    }
    tbody {
      tr:hover {
        background-color: #f4f7fa;
      }
    }
  }
  // Timestamp
  .timestamp {
    font-size: 10px;
    font-weight: 300;
    font-style: italic;
    padding-bottom: 10px;
  }
  // Footer
  .footer {
    padding-bottom: 10px;
    .title {
      font-size: 13px !important;
      color: $title-color;
      font-weight: 600;
    }
  }
  // Signature
  .signature {
    padding-top: 20px;
    clear: both;
    text-align: center;
    font-weight: 500;
  }
  .note-textarea {
    text-align: right;
    margin: 0;
  }
  // Grid layout
  .colspan-6 {
    flex-direction: column;
    width: 25%;
    font-size: 12px;
    float: left;
  }
  .colspan-8 {
    flex-direction: column;
    width: 33%;
    font-size: 12px;
    float: left;
  }
  .colspan-12 {
    flex-direction: column;
    width: 50%;
    font-size: 12px;
    float: left;
  }
  // Text align
  .text-left {
    text-align: left !important;
  }
  .text-right {
    text-align: right !important;
  }
  .text-center {
    text-align: center !important;
  }
  .ra-text-left {
    text-align: left !important;
  }
  .ra-text-right {
    text-align: right !important;
  }
  .ra-text-center {
    text-align: center !important;
  }
  .ra-text-underline {
    text-decoration-line: underline;
    text-decoration-style: solid;
  }
  .ra-text-dblunderline {
    text-decoration-line: underline;
    text-decoration-style: double;
  }
  // Text bold
  .text-bold {
    font-weight: bold;
  }
  .ra-text-bold {
    font-weight: bold;
  }
  // Text italic
  .text-italic {
    font-style: italic;
  }
  .ra-text-italic {
    font-style: italic;
  }
  // Text transform
  .ra-text-capital {
    text-transform: capitalize;
  }
  .ra-text-lower {
    text-transform: lowercase;
  }
  .ra-text-upper {
    text-transform: uppercase;
  }
  // Word break
  .ra-break-all {
    word-break: break-all;
  }
  .ra-break-work {
    word-break: break-word;
  }
}
.collapse-list {
  // .collapse-title {
  //   font-size: 18px;
  //   font-weight: 500;
  // }

  // .el-col {
  //   width: 30.5%;
  //   max-width: 100%;
  //   margin: 0px !important;
  //   padding: 10px 5px 10px 5px;
  //   line-height: 20px;
  //   // border-bottom: 1px solid #ececec;
  //   border-bottom: 1px solid #f3f3f3;
  //   margin-right: 2.5%;
  //   margin: 0px !important;
  // }
  // .el-col:hover {
  //   background: #f4f5f8;
  // }

  .list-title {
    display: inline-block;
    font-size: 14px;
    color: #393a3d;

    .content-panel {
      width: 100% !important;
      padding: 10px 5px 10px 5px;
      line-height: 20px;
      border-bottom: 1px solid #f3f3f3;
      margin-right: 2.5%;
    }

  }
  .list-title:hover {
    color: #409eff;
    cursor: pointer;
    transition: 0.15s ease-out;
    transition-property: initial;
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: initial;
  }
  .list-title {
    display: inline-block;
    font-size: 14px;
    color: #393a3d;
    // margin-bottom: 7px;
  }
  .list-title:hover {
    color: #409eff;
    cursor: pointer;
    transition: 0.15s ease-out;
    transition-property: initial;
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: initial;
  }
  .list-title.disabled,
  .list-title.disabled:hover {
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .list-memo {
    font-size: 12px;
    font-weight: 300;
    color: #606266;
  }
}
  /* @import '../styles/report-center.scss'; */
  </style>
  