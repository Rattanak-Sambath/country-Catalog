<template>
  <div>
    <q-card class="flex justify-space-between">
      <!-- {{ this.$route.params.car }} -->
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-bold"
          ><q-icon name="add"></q-icon> Edit Color</q-toolbar-title
        >
        <q-space />
        <q-btn icon="west" outline color="primary" @click="$router.go(-1)"
          >Back</q-btn
        >
      </q-toolbar>
    </q-card>
    <q-card class="q-my-md">
      <q-card-section class="text-grey-15">
        Fill the form below to crate new Brand
      </q-card-section>
      <ValidateForm ref="formRef" :validation-schema="rules">
        <q-form @submit.prevent.stop="onSubmit()" class="mt-4 text-center">
          <q-card-section class="q-my-lg">
            <div class="row q-col-gutter-x-xl q-col-gutter-y-md">
              <div class="q-mx-auto col-xs-12 col-md-12 col-lg-8">
                <div class="row q-col-gutter-y-md q-mx-auto">
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
                          <q-icon name="person" color="indigo-10" />
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
          <q-card-section>
            <div class="text-right q-gutter-x-md">
              <q-btn
                push
                icon="update"
                label="Update"
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
import { Form as ValidateForm, Field as ValidateField } from "vee-validate";
import actions from "../../store/actions";
import toast from "../../Helper/toast.js";
import { object, string } from "yup";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import router from "../../router";
import dayjs from "dayjs";
import api from "../../utils/utility";
import { useRoute } from "vue-router";
const branchOpt = ref([]);
const store = useStore();
const formRef = ref("");
const loading = ref(false);
const preBranchId = ref("");
const form = ref({
  name: "",
  status: "",
});
const $route = useRoute();

const driverOpt = ref([]);
const invisibleBtn = ref(false);
const rules = object({
  name: string().required().label("Name"),
  status: string().required().label("Status"),
});
const showId = ref("");
const cancel = () => {
  showId.value = null;
  form.value.name = "";
  form.value.status = "";
  loading.value = false;
  router.go(-1);
};
const getBranch = async () => {
  await api
    .get("branch/getCurrentBranch/" + store.state.auth.branchId)
    .then((res) => {
      console.log(res.data);
      if (res) {
        branchOpt.value = res.data;
        preBranchId.value = res.data.name + " [ " + res.data.code + " ] ";
        // return res.data.name;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const onUpdate = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    // let  methods = 'car/updateCar'
    form.value.branchId = store.state.auth.branchId;
    loading.value = true;
    const res = await api.put(
      `color/updateColor/` + $route.params.id,
      form.value
    );
    if (res) {
      toast.success({ message: "Update color successfully" });
      cancel();
    } else {
      toast.error({ message: "There was somehting wrong to add car" });
      throw "There was something wrong !!";
    }
  }
};
const findDatabyId = async () => {
  let id = showId.value;
  // console.log('find', id);
  let res = await api.get(`/color/getColorbyId/` + $route.params.id);
  // console.log(res)
  if (res) {
    form.value.name = res.data.name;
    form.value.status = res.data.status;
    // console.log('hi',res.data)
  }
};

const findDriver = async () => {
  await api.get("/driver/getDriver").then((res) => {
    if (res) {
      console.log(res.data.items);
      driverOpt.value = res.data.items;
    }
  });
};

onMounted(() => {
  findDriver();
  findDatabyId();
  getBranch();
  if ($route.params.id) {
    showId.value = $route.params.id;
    // console.log(showId.value);
    // console.log($route.params.car);
  }
});
</script>

<style scoped></style>
