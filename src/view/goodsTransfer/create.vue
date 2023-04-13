<template>
  <div>
    <q-card class="flex justify-space-between">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          ><q-icon name="add"></q-icon> Create GoodsTransfer
        </q-toolbar-title>
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
      <ValidateForm
        ref="formRef"
        :validation-schema="rules"
      >
        <q-form
          @submit.prevent.stop="onSubmit()"
          class="mt-4 text-center"
        >
          <q-card-section>
            <!-- q-col-gutter-x-xl q-col-gutter-y-md -->
            <div class="row">
              <!-- Change Password
                        <q-toggle v-model="isUpdatePassword" /> -->

              <div class="col-xs-12 col-md-4 col-lg-4">
                <fieldset class="q-pa-md text-left">
                  <legend>
                    <span
                      style="font-size: 30px"
                      class="text-bold q-mx-md"
                      +
                      >1</span
                    >
                    sender / receive information
                  </legend>
                  <div
                    class="row q-col-gutter-y-md"
                    style="width: auto; height: 600px"
                  >
                    <div class="col-12 flex justify-between q-my-md">
                      <div>
                        Date:
                        <span
                          class="text-bold q-mx-md"
                          style="font-size: 18px"
                          >{{ form.date }}
                        </span>
                      </div>
                      <div>
                        From:
                        <span
                          class="text-bold q-mx-md"
                          style="font-size: 18px"
                          >{{ branchName }}
                        </span>
                      </div>
                      <div>
                        Customer:
                        <span
                          class="text-bold q-mx-md"
                          style="font-size: 18px"
                          >{{ customerType }}
                        </span>
                      </div>
                    </div>
                    <div>Sender Telephone *</div>
                    <div class="col-12">
                      <validate-field
                        v-slot="{ value, field, errorMessage }"
                        v-model="form.sender"
                        name="sender"
                      >
                        <q-input
                          dense
                          color="orange-14"
                          type="text"
                          outlined
                          :model-value="value"
                          label="Please provide sender "
                          v-bind="field"
                          :error="!!errorMessage"
                          :error-message="errorMessage"
                        >
                          <template v-slot:prepend>
                            <q-icon
                              name="phone"
                              color="indigo-10"
                            />
                          </template>
                        </q-input>
                      </validate-field>
                    </div>
                    <span>Receive Telephone * </span>
                    <div class="col-12">
                      <validate-field
                        v-slot="{ value, field, errorMessage }"
                        v-model="form.receiver"
                        name="receiver"
                      >
                        <q-input
                          dense
                          color="orange-14"
                          type="text"
                          outlined
                          :model-value="value"
                          label="Please provide receive "
                          v-bind="field"
                          :error="!!errorMessage"
                          :error-message="errorMessage"
                        >
                          <template v-slot:prepend>
                            <q-icon
                              name="phone_callback"
                              color="indigo-10"
                            />
                          </template>
                        </q-input>
                      </validate-field>
                    </div>
                    <span> <q-radio>ទិសដៅ (Destination)</q-radio> </span>
                    <div class="col-12 row">
                      <div
                        style="width: 120px"
                        class="q-mx-xs"
                      >
                        <span>Area * </span>
                        <q-select
                          dense
                          v-model="form.area"
                          :options="areaOpt"
                          map-options
                          emit-value
                          option-label="name"
                          option-value="value"
                          color="orange-14"
                          type="text"
                          outlined
                          label="Area"
                          v-bind="field"
                          :error="!!errorMessage"
                          :error-message="errorMessage"
                        />
                      </div>
                      <div style="width: 250px">
                        <span>Destination to * </span>
                        <validate-field
                          v-slot="{ value, field, errorMessage }"
                          v-model="form.destination"
                          name="destination"
                        >
                          <q-select
                            dense
                            :model-value="value"
                            :options="destinationOpt"
                            map-options
                            emit-value
                            option-label="name"
                            option-value="name"
                            color="orange-14"
                            type="text"
                            outlined
                            label="destination"
                            v-bind="field"
                            :error="!!errorMessage"
                            :error-message="errorMessage"
                          />
                        </validate-field>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div
                class="col-xs-12 col-md-4 col-lg-4"
                style="height: 670px"
              >
                <fieldset class="text-left">
                  <legend>
                    <span
                      style="font-size: 30px"
                      class="text-bold q-mx-md"
                      >2</span
                    >
                    Item Information
                  </legend>
                  <div
                    class="row q-col-gutter-y-md"
                    style="width: auto; height: 620px"
                  >
                    <div class="col-12 q-my-lg text-center">
                      <span
                        class="text-bold"
                        style="font-size: 40px"
                      >
                        បញ្ញើធម្មតា (Standart)
                      </span>
                    </div>
                    <span>Items Type * </span>
                    <div class="col-12">
                      <validate-field
                        v-slot="{ value, field, errorMessage }"
                        v-model="form.itemType"
                        name="itemType"
                      >
                        <q-select
                          dense=""
                          :model-value="value"
                          :options="itemTypeOpt"
                          map-options
                          emit-value
                          option-label="name"
                          option-value="value"
                          color="orange-14"
                          type="text"
                          outlined
                          label=""
                          v-bind="field"
                          :error="!!errorMessage"
                          :error-message="errorMessage"
                        >
                          <template v-slot:prepend>
                            <q-icon
                              name="dashboard"
                              color="indigo-10"
                            />
                          </template>
                        </q-select>
                      </validate-field>
                    </div>
                    <div>Items Name</div>
                    <div class="col-12">
                      <validate-field
                        v-slot="{ value, field, errorMessage }"
                        v-model="form.itemName"
                        name="itemName"
                      >
                        <q-input
                          dense=""
                          color="orange-14"
                          type="text"
                          outlined
                          :model-value="value"
                          label=""
                          v-bind="field"
                          :error="!!errorMessage"
                          :error-message="errorMessage"
                        >
                          <template v-slot:prepend>
                            <q-icon
                              name="sticky_note_2"
                              color="indigo-10"
                            />
                          </template>
                        </q-input>
                      </validate-field>
                    </div>
                    <div>Items Value *</div>
                    <div class="col-12">
                      <validate-field
                        v-slot="{ value, field, errorMessage }"
                        v-model="form.itemValue"
                        name="itemValue"
                      >
                        <q-input
                          dense=""
                          color="orange-14"
                          type="text"
                          outlined
                          :model-value="value"
                          label=""
                          v-bind="field"
                          :error="!!errorMessage"
                          :error-message="errorMessage"
                        >
                          <template v-slot:prepend>
                            <q-icon
                              name="attach_money"
                              color="indigo-10"
                            />
                          </template>
                        </q-input>
                      </validate-field>
                    </div>

                    <div class="col-12 row">
                      <div
                        style="width: 120px"
                        class="q-mx-xs"
                      >
                        <span>Qty * </span>
                        <validate-field
                          v-slot="{ value, field, errorMessage }"
                          v-model="form.qty"
                          name="qty"
                        >
                          <q-input
                            dense=""
                            :model-value="value"
                            type="number"
                            color="orange-14"
                            outlined
                            v-bind="field"
                            :error="!!errorMessage"
                            :error-message="errorMessage"
                          />
                        </validate-field>
                      </div>
                      <div style="width: 250px">
                        <div>please select oUM *</div>
                        <validate-field
                          v-slot="{ value, field, errorMessage }"
                          v-model="form.oum"
                          name="oum"
                        >
                          <q-select
                            dense
                            :model-value="value"
                            :options="OumOpt"
                            map-options
                            emit-value
                            option-label="name"
                            option-value="value"
                            color="orange-14"
                            type="text"
                            outlined
                            label="Position"
                            v-bind="field"
                            :error="!!errorMessage"
                            :error-message="errorMessage"
                          />
                        </validate-field>
                      </div>
                    </div>
                    <!-- end-right-side  -->
                  </div>
                </fieldset>
              </div>
              <div
                class="col-xs-12 col-md-4 col-lg-4"
                style="height: 665px"
              >
                <fieldset
                  class="text-left"
                  style="height: 665px"
                >
                  <legend>
                    <span
                      style="font-size: 30px"
                      class="text-bold q-mx-md"
                    >
                      3
                    </span>
                    Fee
                  </legend>
                  <div class="row">
                    <div class="col-12">
                      <validate-field
                        v-slot="{ value, field, errorMessage }"
                        v-model="form.fee"
                        name="fee"
                      >
                        <q-input
                          dense=""
                          style="font-size: bold"
                          :model-value="value"
                          color="orange-14"
                          type="text"
                          outlined
                          v-bind="field"
                          :error="!!errorMessage"
                          :error-message="errorMessage"
                        >
                          <template v-slot:prepend>
                            <q-icon
                              name="attach_money"
                              color="indigo-10"
                            />
                          </template>
                        </q-input>
                      </validate-field>
                    </div>
                    <div class="col-12 row q-my-md">
                      <div
                        v-for="(fee, index) in feesOpt"
                        @click="clickFee(fee)"
                      >
                        <q-chip
                          square
                          class="text-indigo text-bold q-pa-md cursor-pointer"
                          >{{ fee.name }}</q-chip
                        >
                      </div>
                    </div>
                    <div>Delivery</div>
                    <div class="col-12 row">
                      <div>
                        <validate-field
                          v-slot="{ value, field, errorMessage }"
                          v-model="form.delivery"
                          name="delivery"
                        >
                          <q-select
                            dense=""
                            color="orange-14"
                            type="text"
                            outlined
                            :options="deliveryOpt"
                            option-label="name"
                            option-value="value"
                            :model-value="value"
                            label=""
                            v-bind="field"
                            :error="!!errorMessage"
                            :error-message="errorMessage"
                          >
                            <template v-slot:prepend>
                              <q-icon
                                name="place"
                                color="indigo-10"
                              />
                            </template>
                          </q-select>
                        </validate-field>
                      </div>
                      <div class="q-mx-xs">
                        <q-input
                          readonly=""
                          dense=""
                          color="orange-14"
                          type="text"
                          outlined
                          v-model="form.deliveryPrice"
                          label=""
                        />
                      </div>
                    </div>
                    <div>Total *</div>
                    <div class="col-12">
                      <validate-field
                        v-slot="{ value, field, errorMessage }"
                        v-model="form.total"
                        name="total"
                      >
                        <q-input
                          readonly
                          dense=""
                          color="orange-14"
                          type="text"
                          outlined
                          :model-value="value"
                          label=""
                          v-bind="field"
                          :error="!!errorMessage"
                          :error-message="errorMessage"
                        >
                        </q-input>
                      </validate-field>
                    </div>
                    <div>Total Paid</div>
                    <div class="col-12">
                      <validate-field
                        v-slot="{ value, field, errorMessage }"
                        v-model="form.totalPaid"
                        name="totalPaid"
                      >
                        <q-input
                          readonly=""
                          dense=""
                          color="orange-14"
                          type="text"
                          outlined
                          :model-value="value"
                          label="Total Paid"
                          v-bind="field"
                          :error="!!errorMessage"
                          :error-message="errorMessage"
                        >
                          <template v-slot:prepend>
                            <q-icon
                              name="attach_money"
                              color="indigo-10"
                            />
                          </template>
                        </q-input>
                      </validate-field>
                    </div>

                    <!-- end-right-side  -->
                  </div>
                </fieldset>
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
import { object, string, date, number } from 'yup'
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
  code: Date.now() + Math.random().toString(36).substring(2, 3).toUpperCase(),
  branchId: store.state.auth.branchId,
  fee: '',
  delivery: '',
  sender: '',
  receiver: '',
  destination: '',
  oum: '',
  area: 'All',
  phone: '',
  positionId: '',
  itemType: '',
  itemName: '',
  itemValue: '',
  qty: '1',
  gender: '',
  address: '',
  deliveryPrice: 0,
  total: 0,
  totalPaid: 0,
  date: dayjs(new Date()).format('YYYY-MM-DD'),
})
const itemTypeOpt = ref([
  {
    name: 'គ្រឿងសង្ហារឹម',
    value: 'គ្រឿងសង្ហារឹម',
  },
  {
    name: 'សម្លៀកបំពាក់',
    value: 'សម្លៀកបំពាក់',
  },
  {
    name: 'សាច់ក្រណាត់',
    value: 'សាច់ក្រណាត់',
  },
  {
    name: 'គ្រឿងកំប៉ុង',
    value: 'គ្រឿងកំប៉ុង',
  },
  {
    name: 'កាបូបស្បែកជើង',
    value: 'កាបូបស្បែកជើង',
  },
  {
    name: 'ឧបករណ៍អេឡិចត្រូនិច',
    value: 'ឧបករណ៍អេឡិចត្រូនិច',
  },
  {
    name: 'សម្ភារការិយាល័យ',
    value: 'សម្ភារការិយាល័យ',
  },
  {
    name: 'គ្រឿងសំណង់',
    value: 'គ្រឿងសំណង់',
  },
  {
    name: 'គ្រឿងបន្លាស់យានយន្ត',
    value: 'គ្រឿងបន្លាស់យានយន្ត',
  },
  {
    name: 'ឯកសារ-សម្ភារបន្ទាន់',
    value: 'ឯកសារ-សម្ភារបន្ទាន់',
  },
  {
    name: 'ផ្សេងៗ Others',
    value: 'ផ្សេងៗ Others',
  },
  {
    name: 'បន្លែ ផ្លែឈើ',
    value: 'បន្លែ ផ្លែឈើ',
  },
  {
    name: 'បន្លែ ផ្លែឈើ',
    value: 'បន្លែ ផ្លែឈើ',
  },
  {
    name: 'វត្ថុស្រួយងាយបែកបាក់',
    value: 'វត្ថុស្រួយងាយបែកបាក់',
  },
  {
    name: 'គ្រឿងក្រអូប',
    value: 'គ្រឿងក្រអូប',
  },
  {
    name: 'កាបូប',
    value: 'កាបូប',
  },
  {
    name: 'ឡេ',
    value: 'ឡេ',
  },
  {
    name: 'ថ្នាំពេទ្រ',
    value: 'ថ្នាំពេទ្រ',
  },
  {
    name: 'គ្រឿងកាឡៃ',
    value: 'គ្រឿងកាឡៃ',
  },
  {
    name: 'វ៉ែនតា',
    value: 'វ៉ែនតា',
  },
  {
    name: 'ពុម្ពធ្មេញ',
    value: 'ពុម្ពធ្មេញ',
  },
  {
    name: 'គ្រឿងសមុទ្រ',
    value: 'គ្រឿងសមុទ្រ',
  },
  {
    name: 'អាល់កុល',
    value: 'អាល់កុល',
  },
  {
    name: 'ម៉ាស់-Mask',
    value: 'ម៉ាស់-Mask',
  },
  {
    name: 'នាឡិការ',
    value: 'នាឡិការ',
  },
  {
    name: 'របស់ញ៉ាំ(មិនធានាខូច)',
    value: 'របស់ញ៉ាំ(មិនធានាខូច)',
  },
  {
    name: 'Case ទូរស័ព្ទ',
    value: 'Case ទូរស័ព្ទ',
  },
  {
    name: 'ម៉ូតូ/កង់ Vehicles',
    value: 'ម៉ូតូ/កង់ Vehicles',
  },
  {
    name: 'អាហារបំប៉ន',
    value: 'អាហារបំប៉ន',
  },
  {
    name: 'គំរូអីវាន់',
    value: 'គំរូអីវាន់',
  },
])
const destinationOpt = ref([])
const areaOpt = ref([
  {
    name: 'All',
    value: 'All',
  },
  {
    name: 'ភ្នំពេញ',
    value: 'ភ្នំពេញ',
  },
  {
    name: 'ក្រុង',
    value: 'ក្រុង',
  },
  {
    name: 'ខេត្ត',
    value: 'ខេត្ត',
  },
  {
    name: 'ផ្សារ',
    value: 'ផ្សារ',
  },
  {
    name: 'ឃុំ',
    value: 'ឃុំ',
  },
  {
    name: 'ស្រុក',
    value: 'ស្រុក',
  },
  {
    name: 'ភូមិ',
    value: 'ភូមិ',
  },
  {
    name: 'ព្រំដែន',
    value: 'ព្រំដែន',
  },
])
const OumOpt = ref([
  {
    name: 'កេស',
    value: 'កេស',
  },
  {
    name: 'គីឡូក្រាម',
    value: 'គីឡូក្រាម',
  },
  {
    name: 'កញ្ចាប់',
    value: 'កញ្ចាប់',
  },
  {
    name: 'លីត្រ',
    value: 'លីត្រ',
  },
  {
    name: 'ចំនូន',
    value: 'ចំនូន',
  },
  {
    name: 'ដុំ',
    value: 'ដុំ',
  },
  {
    name: 'ប្រអប់',
    value: 'ប្រអប់',
  },
  {
    name: 'ថង់',
    value: 'ថង់',
  },
  {
    name: 'ការ៉ុង',
    value: 'ការ៉ុង',
  },
  {
    name: 'សាមី',
    value: 'សាមី',
  },
  {
    name: 'យួរ',
    value: 'យួរ',
  },
  {
    name: '​កង',
    value: 'កង',
  },
])
const feesOpt = ref([
  {
    name: 5000,
  },
  {
    name: 5500,
  },
  {
    name: 6000,
  },
  {
    name: 6500,
  },
  {
    name: 7000,
  },
  {
    name: 7500,
  },
  {
    name: 8000,
  },
  {
    name: 8500,
  },
  {
    name: 8000,
  },
  {
    name: 8500,
  },
  {
    name: 9000,
  },
  {
    name: 9500,
  },
  {
    name: 10000,
  },
  {
    name: 11000,
  },
  {
    name: 12000,
  },
  {
    name: 13000,
  },
  {
    name: 12000,
  },
  {
    name: 13000,
  },
  {
    name: 14000,
  },
  {
    name: 15000,
  },
  {
    name: 16000,
  },
  {
    name: 17000,
  },
  {
    name: 18000,
  },
  {
    name: 19000,
  },
  {
    name: 21000,
  },
  {
    name: 22000,
  },
  {
    name: 24000,
  },
  {
    name: 25000,
  },
])
const deliveryOpt = ref([
  {
    name: 'ផ្សារ ទួលទំពួង',
    value: 'ផ្សារ ទួលទំពួង',
    price: 2000,
  },
  {
    name: 'សាខា កំបូល',
    value: 'សាខា កំបូល',
    price: 2500,
  },
  {
    name: 'សាខា កម្ពុជាក្រោម',
    value: 'សាខា កម្ពុជាក្រោម',
    price: 2000,
  },
  {
    name: 'សាខា',
    value: 'សាខា',
    price: 2000,
  },
  {
    name: 'អូឡាំពិក',
    value: 'អូឡាំពិក',
    price: 2000,
  },
  {
    name: 'ផ្សារថ្មី',
    value: 'ផ្សារថ្មី',
    price: 2000,
  },
  {
    name: 'អូរឬស្សី',
    value: 'អូរឬស្សី',
    price: 3000,
  },
  {
    name: 'ទួលទំពូង',
    value: 'ទួលទំពូង',
    price: 3000,
  },
  {
    name: 'ផ្សារដើមគរ',
    value: 'ផ្សារដើមគរ',
    price: 3000,
  },
  {
    name: 'ផ្សារបឹងសាឡាងថ្មី (ទួលសង្កែ)',
    value: 'ផ្សារបឹងសាឡាងថ្មី (ទួលសង្កែ)',
    price: 3000,
  },
  {
    name: 'បឹងកេងកង',
    value: 'បឹងកេងកង',
    price: 2500,
  },
  {
    name: 'ទួលស្លែង',
    value: 'ទួលស្លែង',
    price: 2500,
  },
  {
    name: 'ស្ទឹងមានជ័យ',
    value: 'ស្ទឹងមានជ័យ',
    price: 2500,
  },
  {
    name: 'សំណង់១២',
    value: 'សំណង់១២',
    price: 2500,
  },
  {
    name: 'ផ្សារឃ្លាំងរំសែវ',
    value: 'ផ្សារឃ្លាំងរំសែវ',
    price: 2500,
  },
  {
    name: 'ផ្សារដើមថ្តូវ',
    value: 'ផ្សារដើមថ្តូវ',
    price: 2500,
  },
  {
    name: 'បឹងត្របែក',
    value: 'បឹងត្របែក',
    price: 3500,
  },
  {
    name: 'ទឹកល្អក់ ២',
    value: 'ទឹកល្អក់ ២',
    price: 3500,
  },
  {
    name: 'សំណង់១២',
    value: 'សំណង់១២',
    price: 3500,
  },
])
// const rules = object({
//   name: string().required().label('Name'),
//   // role: string().required().label('Role'),
//   status: string().required().label('Status'),
// })
const clickFee = async (params) => {
  console.log(params)
  form.value.fee = ''
  if (params) {
    form.value.fee = params.name
  }
}

watch(
  () => form.value.area,
  (val) => {
    destinationOpt.value = []
    form.value.destination = ''
    // formRef.value.resetForm()
    let res = api
      .get('destination/getDestination/' + val)
      .then((res) => {
        destinationOpt.value = res.data
      })
      .catch((error) => console.log(error))
  },
  { immediate: true }
)

watch(
  () => form.value.delivery,
  (val, oldValue) => {
    if (oldValue) {
      form.value.deliveryPrice = oldValue.price
      form.value.total -= form.value.deliveryPrice
      if (form.value.deliveryPrice === 0) {
        form.value.deliveryPrice = 0
      }
    }
    if (val) {
      form.value.deliveryPrice = 0
      form.value.deliveryPrice = val.price
      form.value.total += form.value.deliveryPrice
      form.value.totalPaid = form.value.total
    }
  }
)
watch(
  () => form.value.fee,
  (val, oldValue) => {
    if (val) {
      console.log('val', val)
      let sum = form.value.deliveryPrice + val
      form.value.total = sum
      form.value.totalPaid = sum
    }
  }
)

// watch(
//   () => form.value.deliveryPrice,
//   (val) => {
//     console.log(val)
//   }
// )
const branchName = ref('')
const customerType = ref('General')
const getBranch = async () => {
  await api
    .get('branch/getCurrentBranch/' + store.state.auth.branchId)
    .then((res) => {
      // console.log(res.data)SVGFEFuncAElementSVGFEFuSVGFEFuncAElement
      if (res) {
        branchName.value = res.data.name
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const positionOpt = ref([
  {
    name: 'Delivery',
    value: 'Delivery',
  },
  {
    name: 'Staff Office',
    value: 'Staff Office',
  },
])
const genderOpt = ref([
  {
    name: 'Male',
    value: 'Male',
  },
  {
    name: 'Female',
    value: 'Female',
  },
])
const driverOpt = ref([])
const invisibleBtn = ref(false)
const rules = object({
  sender: string().required().label('Sender'),
  receiver: string().required().label('Receive'),
  destination: string().required().label('Destination'),
  itemType: string().required().label('Item Type'),
  itemValue: string().required().label('Item Value'),
  qty: string().required().label('Qty'),
  fee: number().required().label('Fee'),
})
const showId = ref('')
const concel = () => {
  showId.value = null
  form.value.name = ''
  form.value.model = ''
  form.value.weight = ''
  form.value.color = ''
  form.value.driverId = ''
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
    window.open()
    // console.log('form', form.value)
    // let methods = '/goodstranfer/createGoodstranfer'
    // let doc = form.value
    // doc.branchId = store.state.auth.branchId
    // if (showId.value) {
    //   methods =  'car/updateCar'
    // }
    // loading.value = true
    // let res = await api.post('staff/createStaff', doc)
    // if (res) {
    //   toast.success({ message: 'Insert successfully ' })
    //   loading.value = false
    //   router.go(-1)
    // } else {
    //   toast.error({ message: 'There was somehting wrong to add car' })
    //   router.go(-1)
    // }
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
onMounted(() => {
  findDriver()
  getBranch()

  // if (store.state.auth.branchId) {
  //   getBranch()
  // }
})
</script>

<style scoped></style>
