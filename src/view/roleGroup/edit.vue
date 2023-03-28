<template>
  <div>
    <q-card class="flex justify-space-between">
      <!-- {{ this.$route.params.car }} -->
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          ><q-icon name="add"></q-icon> Edit RoleGroup</q-toolbar-title
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
      <q-card-section class="text-grey-15">
        Fill the form below to update new RoleGroup
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
              <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="row q-col-gutter-y-md">
                  <!-- start left side -->
                  <div class="col-12">
                    <div class="row q-col-gutter-y-sm">
                      <div class="col-6">
                        <validate-field
                          v-slot="{ value, field, errorMessage }"
                          v-model="form.name"
                          name="name"
                        >
                          <q-input
                            :model-value="value"
                            label="Name *"
                            outlined
                            dense
                            v-bind="field"
                            :error="!!errorMessage"
                            :error-message="errorMessage"
                          />
                        </validate-field>
                      </div>
                      <div class="col-6">
                        <validate-field
                          v-slot="{ value, field, errorMessage }"
                          v-model="form.status"
                          name="status"
                        >
                          <span
                            class="text-grey-9"
                            style="padding-right: 8px"
                          >
                            Status *
                          </span>

                          <q-radio
                            v-model="form.status"
                            checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye"
                            val="Inactive"
                            label="Inactive"
                          />
                          <q-radio
                            v-model="form.status"
                            checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye"
                            val="Active"
                            label="Active"
                          />

                          <!-- <div
                                        v-if="!!errorMessage"
                                        class="text-negative"
                                        style="font-size: 11px"
                                      >
                                        {{ errorMessage }}
                                      </div> -->
                        </validate-field>
                      </div>
                      <div class="col-12 text-left">
                        <q-checkbox
                          v-model="form.checkAll"
                          label="Check all *"
                          @click="checkAllRole()"
                        ></q-checkbox>
                      </div>

                      <div class="col-12">
                        <validate-field
                          v-slot="{ value, field, errorMessage }"
                          v-model="form.role"
                          name="role"
                        >
                          <fieldset class="text-left">
                            <legend>Roles</legend>
                            <div class="row">
                              <div
                                v-for="role in roleOpts"
                                :key="role._id"
                                class="col-xs-6 col-sm-6 col-md-4"
                              >
                                <q-checkbox
                                  :model-value="value"
                                  :val="role.name"
                                  :label="startCase(role.name)"
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
                push
                icon="remove"
                label="remove"
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
import actions from '../../store/actions'
import toast from '../../Helper/toast.js'
import { object, string } from 'yup'
import { ref, onMounted } from 'vue'
// import store from '../../store/';
// import api from '../../utils/utility'
import { useStore } from 'vuex'
import router from '../../router'
import dayjs from 'dayjs'
import api from '../../utils/utility'
import axios from 'axios'
import { useRoute } from 'vue-router'
import _ from 'lodash'
const formRef = ref('')
const loading = ref(false)
const form = ref({
  name: '',
  status: '',
  role: [],
  checkAll: false,
})
const roleOpts = ref([])
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
const $route = useRoute()
const rules = object({
  name: string().required().label('Name'),
  // role: string().required().label('Role'),
  status: string().required().label('Status'),
})
const startCase = (val) => _.startCase(val)

const checkAllRole = () => {
  // console.log('hi');
  if (form.value.checkAll === true) {
    form.value.role = []
    for (let i = 0; i < roleOpts.value.length; i++) {
      const roleName = roleOpts.value[i].name
      form.value.role.push(roleName)
    }
  } else {
    console.log('else')
    form.value.role = []
  }
}
const onRemove = async () => {
  await api
    .delete('/roleGroup/removeById/' + $route.params.roleGroup)
    .then((res) => {
      if (res) {
        toast.success('RoleGroup deleted successfully')
        cancel()
        // console.log('hi')
      }
    })
    .catch((err) => {
      toast.error({ message: 'Not Found !!!' })
      console.log(err)
    })
  // if (dataRemove) {
  //   console.log('hi')
  //   toast.error({ message: 'Not found' })
  // } else {
  //   toast.success({ message: 'Not found' })
  //   // cancel()
  // }
}
// watch(
//   () => form.value.role,
//   (val) => {
//     if (val.length === roleOpts.value.length) {
//       form.value.checkAll = true
//     } else {
//       form.value.checkAll = false
//     }
//   },
//   { deep: true, immediate: true }
// )
const showId = ref('')
const cancel = () => {
  showId.value = null
  form.value.name = ''
  form.value.address = ''
  form.value.position = ''
  form.value.gender = ''
  form.value.salary = ''
  form.value.date = ''
  loading.value = false
  router.go(-1)
}
const onUpdate = async () => {
  const { valid } = await formRef.value.validate()
  if (valid) {
    // let  methods = 'car/updateCar'
    loading.value = true
    const res = await api.put(
      `roleGroup/updateRoleGroup/` + $route.params.roleGroup,
      form.value
    )
    if (res) {
      toast.success({ message: 'Update driver successfully' })
      cancel()
    } else {
      toast.error({ message: 'There was somehting wrong to add car' })
      throw 'There was something wrong !!'
    }
  }
}
const getRoleOpt = async () => {
  let data = await api.get('/role/getAllRole', [])
  if (data) {
    roleOpts.value = data.data
  }
}
const findDatabyId = async () => {
  let id = showId.value
  // console.log('find', id);
  let res = await api.get(
    `/roleGroup/getRoleGroupbyId/` + $route.params.roleGroup
  )
  if (res) {
    // console.log('data', res)
    form.value.name = res.data.roleGroup.name
    form.value.role = res.data.roleGroup.role
    form.value.status = res.data.roleGroup.status
  }
}
onMounted(() => {
  getRoleOpt()
  findDatabyId()
  if ($route.params.driver) {
    showId.value = $route.params.driver
    // console.log(showId.value);
    // console.log($route.params.car);
  }
})
</script>

<style scoped></style>
