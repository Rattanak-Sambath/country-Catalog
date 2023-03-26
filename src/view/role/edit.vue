<template>
    <div>
        <q-card class="flex justify-space-between">
          <!-- {{ this.$route.params.car }} -->
                 <q-toolbar>
                    <q-toolbar-title class="text-h6 text-bold"><q-icon name="add"></q-icon> Edit Role</q-toolbar-title>                    
                    <q-space />
                    <q-btn icon="west" outline color="primary" @click="$router.go(-1)">Back</q-btn>
                </q-toolbar>
  
                
        </q-card>
        <q-card class="q-my-md "> 
            <q-card-section class="text-grey-15">
                     Fill the form below to update new Role
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
                                    v-model="form.index"
                                    name="index"
                                  >
                                    <q-input color="orange-14" type="text" readonly outlined :model-value="value" label="Index"  v-bind="field"
                                      :error="!!errorMessage"
                                      :error-message="errorMessage">
                                            <template v-slot:prepend>
                                                <q-icon name="key" color="indigo-10" />
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
                                            <q-icon name="perm_identity" color="indigo-10" />
                                        </template>
                                    </q-input>
                              </validate-field>
                            </div>
                            <div class="col-12">
                              <validate-field
                                v-slot="{ value, field, errorMessage }"
                                v-model="form.module"
                                name="module"
                              >
                                <q-input color="orange-14" type="text"  outlined :model-value="value" label="Module"  v-bind="field"
                                  :error="!!errorMessage"
                                  :error-message="errorMessage">
                                        <template v-slot:prepend>
                                            <q-icon name="view_module" color="indigo-10" />
                                        </template>
                                    </q-input>
                              </validate-field>
                            </div>
                            
                             
                            </div>
                            <!-- end-left-side  -->
                          </div>
                          <div class="col-xs-12 col-md-6 col-lg-6">
                            <div class="row q-col-gutter-y-md ">
                              <!-- start left side -->
                             
                              <div class="col-12">
                                  <validate-field
                                    v-slot="{ value, field, errorMessage }"
                                    v-model="form.moduleRole"
                                    name="moduleRole"
                                  >
                                    <q-input color="orange-14" type="text"  outlined :model-value="value" label="ModuleRole"  v-bind="field"
                                      :error="!!errorMessage"
                                      :error-message="errorMessage">
                                            <template v-slot:prepend>
                                                <q-icon name="key" color="indigo-10" />
                                            </template>
                                        </q-input>
                                  </validate-field>
                            </div>
                            <div class="col-12">
                              <validate-field
                                v-slot="{ value, field, errorMessage }"
                                v-model="form.title"
                                name="title"
                              >
                                <q-input color="orange-14" type="text"  outlined :model-value="value" label="Title"  v-bind="field"
                                  :error="!!errorMessage"
                                  :error-message="errorMessage">
                                        <template v-slot:prepend>
                                            <q-icon name="toc" color="indigo-10" />
                                        </template>
                                    </q-input>
                              </validate-field>
                            </div>
                              
                             
                            </div>
                            <!-- end-left-side  -->
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
                          v-show="showId"
                            push
                            icon="remove"
                            label="Remove"
                            color="negative"
                            no-caps
                            :loading="loading"
                            @click="onRemove()"
                          />
                          <q-btn
                            push
                            icon="cancel"
                            label="Cancel"
                            no-caps
                            
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
import { remove } from 'lodash';
    const formRef = ref('');
    const loading = ref(false)
    const form = ref({
      index: 10,
      name: '',
      module: '',
      moduleRole:'',
      title: '',
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
    const $route = useRoute()
    const rules = object({
      name: string().required().label('Name'),
      module: string().required().label('Module'),
      moduleRole: string().required().label('ModuleRole'),  
      title: string().required().label('Title'),  
    })
    const showId = ref('');
    const cancel = ()=>{
      showId.value = null
        form.value.name = ""
        form.value.module = ""
        form.value.moduleRole = ""
        form.value.title= ""
        loading.value = false
        router.go(-1)
    }
   
    const findDatabyId = async ()=>{
        let id = showId.value;
        // console.log('find', id);
        let res = await api.get(`/role/getRolebyId/`+ $route.params.role)
        if(res){
            // console.log(res);
            form.value.name = res.data.name
            form.value.index = res.data.index
            form.value.module = res.data.module
            form.value.moduleRole= res.data.moduleRole
            form.value.title = res.data.title
        }
    }
    const onUpdate =async ()=>{
      const { valid } = await formRef.value.validate()
        if(valid){  
          // console.log(form.value);      
            loading.value =true
            const res = await api.put(`/role/updateRole/`+$route.params.role,form.value )
            if(res){
              toast.success({message:"Update role successfully"})
              cancel();
            }
            else {
              toast.error({message:"There was somehting wrong to add car"})
              throw('There was something wrong !!')
            }   
        }
    }
    const onRemove = async ()=>{
      let res = await api.delete('/role/removeById/'+ showId.value)
      if(res){
        toast.success({message:"Remove successfully"})
        cancel();
      }
    }
    onMounted(()=>{
      findDatabyId()
        if($route.params.role){
            showId.value = $route.params.role
            // console.log(showId.value);
            // console.log($route.params.car);
        }
    })
  </script>
  
  <style scoped>
  
  </style>