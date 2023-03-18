<template>
    <div>
        <q-card class="flex justify-space-between">
          <!-- {{ this.$route.params.car }} -->
                 <q-toolbar>
                    <q-toolbar-title class="text-h6 text-bold"><q-icon name="add"></q-icon> Edit Car</q-toolbar-title>                    
                    <q-space />
                    <q-btn icon="west" outline color="primary" @click="$router.go(-1)">Back</q-btn>
                </q-toolbar>
  
                
        </q-card>
        <q-card class="q-my-md "> 
            <q-card-section class="text-grey-15">
                     Fill the form below to crate new Staff
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
                                              <q-icon name="local_shipping" color="indigo-10" />
                                          </template>
                                      </q-input>
                                </validate-field>
                              </div>
                              <div class="col-12">
                                <validate-field
                                  v-slot="{ value, field, errorMessage }"
                                  v-model="form.driver"
                                  name="driver"
                                >
                                  <q-input color="orange-14" type="text"  outlined :model-value="value" label="Driver"  v-bind="field"
                                    :error="!!errorMessage"
                                    :error-message="errorMessage">
                                          <template v-slot:prepend>
                                              <q-icon name="engineering" color="indigo-10" />
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
                                  v-model="form.model"
                                  name="model"
                                >
                                  <q-input color="orange-14" type="text"  outlined :model-value="value" label="Model"  v-bind="field"
                                    :error="!!errorMessage"
                                    :error-message="errorMessage">
                                          <template v-slot:prepend>
                                              <q-icon name="type_specimen" color="indigo-10" />
                                          </template>
                                      </q-input>
                                </validate-field>
                              </div>
                              <div class="col-12">
                                <validate-field
                                  v-slot="{ value, field, errorMessage }"
                                  v-model="form.weight"
                                  name="weight"
                                >
                                  <q-input color="orange-14" type="text"  outlined :model-value="value" label="Weight"  v-bind="field"
                                    :error="!!errorMessage"
                                    :error-message="errorMessage">
                                          <template v-slot:prepend>
                                              <q-icon name="line_weight" color="indigo-10" />
                                          </template>
                                      </q-input>
                                </validate-field>
                              </div>
                              <div class="col-12">
                                <validate-field
                                  v-slot="{ value, field, errorMessage }"
                                  v-model="form.color"
                                  name="color"
                                >
                                  <q-input color="orange-14" type="text"  outlined :model-value="value" label="Color"  v-bind="field"
                                    :error="!!errorMessage"
                                    :error-message="errorMessage">
                                          <template v-slot:prepend>
                                              <q-icon name="format_color_fill" color="indigo-10" />
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
                            @click="onUpdate()"
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
    import { object, string } from 'yup'
    import {ref, onMounted,} from 'vue';
    // import store from '../../store/';
    // import api from '../../utils/utility'
    import { useStore } from 'vuex';
    import router from '../../router';
    import dayjs from 'dayjs'
  import api from '../../utils/utility';
  import axios from 'axios';
import { useRoute } from 'vue-router';
    const formRef = ref('');
    const loading = ref(false)
    const form = ref({
      name: '',
      model: '',
      weight: '',
      color: '',
      driver: 'Sopheak',
      date: dayjs(new Date()).format('YYYY-MM-DD')
    })
    const $route = useRoute()
    const rules = object({
     
      name: string().required().label('Name'),
      model: string().required().label('Model'),
      weight: string().required().label('Weight'),
      color: string().required().label('Color'),
      driver: string().required().label('Driver'),
      date: string().required().label('Date'),
    })
    const showId = ref('');
    const cancel = ()=>{
        showId.value = null
        form.value.name = ""
        form.value.model = ""
        form.value.weight = ""
        form.value.color= ""
        form.value.driver= ""
        loading.value = false
        router.go(-1)
    }
    const onUpdate =async ()=>{
      const { valid } = await formRef.value.validate()
        if(valid){
            let methods = '/car/createCar';
            if(showId.value){
              methods = 'car/updateCar'
            }
            loading.value =true
            let res = await api.post('car/createCar', form.value)
            if(res){
              toast.success({message:"Add car successfully"})
              cancel();
            }
            else {
              toast.error({message:"There was somehting wrong to add car"})
              throw('There was something wrong !!')
            }   
        }
    }
    const findDatabyId = async ()=>{
        let id = showId.value;
        // console.log('find', id);
        let data = await api.get('/car/getCarbyId/' + showId.value  )
        if(data){
            // form.value = data.data.data
            // console.log(data);
        }
    }
    onMounted(()=>{
      findDatabyId()
        if($route.params.car){
            showId.value = $route.params.car
            // console.log($route.params.car);
        }
    })
  </script>
  
  <style scoped>
  
  </style>