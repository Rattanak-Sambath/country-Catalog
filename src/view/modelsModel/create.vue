<template>
  <div>
    <q-card class="flex justify-space-between">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          ><q-icon name="add"></q-icon> Create Model</q-toolbar-title
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
        Fill the form below to crate new Model
      </q-card-section>
      <ValidateForm
        ref="formRef"
        :validation-schema="rules"
      >
        <q-form
          @submit.prevent.stop="onSubmit()"
          class="mt-4 text-center"
        >
          <q-card-section class="q-my-lg">
            <div class=" row q-col-gutter-x-xl q-col-gutter-y-md">
              <div class="q-mx-auto col-xs-12 col-md-12 col-lg-8">
                <div class="row q-col-gutter-y-md q-mx-auto ">
                  <!-- start left side -->      
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
                </div>
                <!-- end-left-side  -->
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
// const name = ref('')
const form = ref({
  name: '',
  status: '',
})

const driverOpt = ref([])
const invisibleBtn = ref(false)
const rules = object({
  name: string().required().label('Name'),
  status: string().required().label('Status'),
})
const showId = ref('')
const concel = () => {
  showId.value = null
  form.value.name = ''
  form.value.status = ''
  loading.value = false
}
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
    let doc = form.value
    doc.branchId = store.state.auth.branchId
    
    // if (showId.value) {
    //   methods =  'car/updateCar'
    // }
    // loading.value = true
    let res = await api.post('model/createModel', doc)
    if (res) {
      toast.success({ message: 'Insert successfully ' })
      loading.value = false
      router.go(-1)
    } else {
      toast.error({ message: 'There was somehting wrong to add car' })
      router.go(-1)
    }
  }
}
const cancel = () => {
  router.go(-1)
}
const findDriver = async () => {
  await api.get('/driver/getDriver').then((res) => {
    if (res) {
      console.log(res.data.items)
      driverOpt.value = res.data.items
    }
  })
}

// count for increase code 

onMounted(() => {
  findDriver()

  // if (store.state.auth.branchId) {
    
  // }
})
</script>

<style scoped></style>
