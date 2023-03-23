<template>
  <div>
      <q-card class="flex justify-space-between">
               <q-toolbar>
                  <q-toolbar-title class="text-h6 text-bold"><q-icon name="add"></q-icon> Create Driver</q-toolbar-title>                    
                  <q-space />
                  <q-btn icon="west" outline color="primary" @click="$router.go(-1)">Back</q-btn>
              </q-toolbar>

              
      </q-card>
      <q-card class="q-my-md "> 
          <q-card-section class="text-grey-15">
                   Fill the form below to crate new Driver
              </q-card-section>
              <ValidateForm
                  ref="formRef"
                  :validation-schema="rules"
                >
                    <q-form @submit.prevent.stop="onSubmit()"   class="mt-4 text-center" >
                    
                        <q-card-section>
                      <div class="row q-col-gutter-x-xl q-col-gutter-y-md">
                        <div class="col-xs-12 col-md-6 col-lg-6">
                          <div class="row q-col-gutter-y-md ">
                            <!-- start left side -->
                            <div class="col-12">
                              <validate-field
                                v-slot="{ value, field, errorMessage }"
                                v-model="form.date"
                                name="date"
                              >
                                <q-input color="orange-14" type="date"  outlined :model-value="value" v-bind="field"
                                  :error="!!errorMessage"
                                  :error-message="errorMessage">
                                        <template v-slot:prepend>
                                            <q-icon name="calendar_month" color="indigo-10" />
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
                                <q-input color="orange-14" type="text"  outlined :model-value="value" label="Name"  v-bind="field"
                                  :error="!!errorMessage"
                                  :error-message="errorMessage">
                                        <template v-slot:prepend>
                                            <q-icon name="engineering" color="indigo-10" />
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
                                <q-input color="orange-14" type="text"  outlined :model-value="value" label="Address"  v-bind="field"
                                  :error="!!errorMessage"
                                  :error-message="errorMessage">
                                        <template v-slot:prepend>
                                            <q-icon name="location_on" color="indigo-10" />
                                        </template>
                                    </q-input>
                              </validate-field>
                            </div>
                            
                           
                          </div>
                          <!-- end-left-side  -->
                        </div>

                        <div class="col-xs-12 col-md-6 col-lg-6">
                          <div class="row  q-col-gutter-y-md ">
                            <!-- right-side  -->
                            <div class="col-12">
                              <validate-field
                                v-slot="{ value, field, errorMessage }"
                                v-model="form.gender"
                                name="gender"
                              >
                                <q-select 
                                color="orange-14" 
                                  :model-value="value"                               
                                  :options="genderOpt"
                                  map-options
                                  emit-value
                                  option-label="name"
                                  option-value="name" 
                                  type="text" 
                                   outlined 
                                  label="Gender"  
                                  v-bind="field"
                                  :error="!!errorMessage"
                                  :error-message="errorMessage">
                                        <template v-slot:prepend>
                                            <q-icon name="female" color="indigo-10" />
                                        </template>
                                    </q-select>
                              </validate-field>
                            </div>
                            <div class="col-12">
                              <validate-field
                                v-slot="{ value, field, errorMessage }"
                                v-model="form.position"
                                name="position"
                              >
                                <q-select
                                 olor="orange-14" 
                                  :model-value="value"                               
                                  :options="positionOpt"
                                  map-options
                                  emit-value
                                  option-label="name"
                                  option-value="name" 
                                 color="orange-14" 
                                 type="text"  
                                 outlined 
                                 
                                  label="Position"  
                                  v-bind="field"
                                  :error="!!errorMessage"
                                  :error-message="errorMessage">
                                        <template v-slot:prepend>
                                            <q-icon name="line_weight" color="indigo-10" />
                                        </template>
                                    </q-select>
                              </validate-field>
                            </div>
                            <div class="col-12">
                              <validate-field
                                v-slot="{ value, field, errorMessage }"
                                v-model="form.salary"
                                name="salary"
                              >
                                <q-input color="orange-14" type="text"  outlined :model-value="value" label="Salary"  v-bind="field"
                                  :error="!!errorMessage"
                                  :error-message="errorMessage">
                                        <template v-slot:prepend>
                                            <q-icon name="paid" color="indigo-10" />
                                        </template>
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
  import actions from '../../store/actions';
  import toast from '../../Helper/toast.js'
  import { object, string  } from 'yup'
  import {ref, onMounted,} from 'vue';

  import { useStore } from 'vuex';
  import router from '../../router';
  import dayjs from 'dayjs'
import api from '../../utils/utility';
import axios from 'axios';
// import { number } from 'yup/lib/locale';

  const formRef = ref('');
  const loading = ref(false)
  const form = ref({
    name: '',
    address: '',
    position: '',
    gender: '',
    date: dayjs(new Date()).format('YYYY-MM-DD'),
    salary: ''
  })
  const genderOpt = ref([
    {
      name: 'Female',
      value:'Female'
    },
    {
      name: 'Male',
      value: 'Male'
    }
  ])
  const positionOpt = ref([
    {
      name: 'Pre-driver',
      value:'Pre-driver'
    },
    {
      name: 'Driver',
      value: 'Driver'
    }
  ])
  const rules = object({
    name: string().required().label('Name'),
    address: string().required().label('Address'),
    position: string().required().label('Postion'),
    gender: string().required().label('Gender'),
    salary: string().required().label('Salary'),
    date: string().required().label('Date'),
  })
  const showId = ref('');
  const concel = ()=>{
      showId.value = null
      form.value.name = ""
      form.value.address = ""
      form.value.position = ""
      form.value.gender= ""
      form.value.salary= ""    
      loading.value = false
  }
  const onSubmit =async ()=>{
    const { valid } = await formRef.value.validate()
      if(valid){
          let methods = '/driver/createDriver';
          // if(showId.value){
          //   methods = 'driver/updateDriver'
          // }
          loading.value =true
          let res = await api.post(methods, form.value)
          if(res){
            toast.success({message:"Insert successfully"})
            router.go(-1)
          }
          else {         
            toast.error({message:"There was somehting wrong to add car"})
            throw('There was something wrong !!')
          }   
      }
  }
  const cancel =() =>{
      router.go(-1)
  }
</script>

<style scoped>

</style>