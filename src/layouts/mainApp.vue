<template>
  <div>
    <q-layout view="lHh LpR lff">
      <q-header>
        <q-toolbar
          class="shadow-none absolute-top text-black"
          style="
            border-bottom: 3px double rgba(0, 0, 0, 0.08);
            background-color: white;
          "
        >
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          <q-btn dense flat round icon="search" @click="toggleLeftDrawer" />
          <q-space />
          <div align="left">
            <span class="title text-bold">
              {{ branchName ? branchName : "No Branch" }}
            </span>
          </div>
          <q-btn
            class="q-mr-xs"
            flat
            round
            @click="$q.dark.toggle()"
            :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
          />
          <!-- <q-btn
              flat
              round
              dense
              :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
              @click="$q.fullscreen.toggle()"
            /> -->
          <q-toggle
            style="margin-right: 25px"
            v-model="value"
            :label="isTranslate === true ? 'Kh' : 'En'"
            @click="changeLanguage(isTranslate == false ? 'Kh' : 'En')"
          />
          <!-- <q-switch       
          :label="isTranslate === true ? 'Kh' : 'En'"
          @click="changeLanguage(isTranslate == false ? 'kh' : 'en')"
        ></q-switch> -->
          <img
            :src="
              isTranslate === false
                ? '../../public/download.png'
                : '../../public/istockphoto-652225546-612x612.jpg'
            "
            style="
              width: 60px;
              height: 35px;
              text-align: right;
              margin-right: 10px;
            "
          />

          <!-- <img style="width: 70px;" src="istockphoto-652225546-612x612.jpg" /> -->
          <q-btn round flat color="black" icon="notifications_active" />
          <q-btn round flat color="white">
            <q-avatar color="primary" class="q-ma-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              <q-menu>
                <q-list style="min-width: 10px">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{
                        $store.state.auth.user.fullname
                      }}</q-item-label>
                      <q-item-label
                        >{{ $store.state.auth.user.email }}
                      </q-item-label>
                      <q-item-label caption lines="1">
                        {{ $store.state.auth.user.location }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item :to="{ name: 'setting' }" exact>
                    <q-item-section avatar>
                      <q-icon name="settings" color="primary" />
                    </q-item-section>

                    <q-item-section>Setting</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-ripple @click="logout()" exact>
                    <q-item-section avatar>
                      <q-icon name="logout " color="red" />
                    </q-item-section>

                    <q-item-section>Logout</q-item-section>
                  </q-item>
                  <q-separator />
                </q-list>
              </q-menu>
            </q-avatar>
          </q-btn>
        </q-toolbar>
      </q-header>
      <q-drawer
        show-if-above
        v-model="leftDrawerOpen"
        side="left"
        bordered
        class="white"
        :width="300"
        style="background-color: grey; color: white"
      >
        <q-toolbar class="app-sidebar-header shadow-none">
          <q-avatar size="50px" font-size="90px" class="q-my-sm">
            <img
              src="../../public/04100fe4-ab2f-4971-8f95-9b05c778d5a1.jpg-output.png"
              width="50"
              height="50"
              class="q-ml-xs"
            />
          </q-avatar>
          <q-toolbar-title class="text-white text-subtitle1 text-weight-medium">
            {{ branch ? branch : "No Branch" }}
          </q-toolbar-title>
        </q-toolbar>
        <q-scroll-area
          style="height: calc(100% - 20px); margin-top: 0px"
          class="app-sidebar-scroll-area"
        >
          <q-list padding class="app-menu">
            <q-item :to="{ name: 'home' }" exact-active-class="q-item--active ">
              <q-item-section avatar>
                <q-icon name=" home" size="16px" />
              </q-item-section>

              <q-item-section>
                {{ $t("dashboard.title") }}
              </q-item-section>
            </q-item>

            <q-item
              clickable
              exact-active-class="q-item--active "
              v-ripple
              :to="{ name: 'sale.index' }"
              v-if="userIsInRole(['sale'])"
            >
              <q-item-section avatar>
                <q-icon name="inventory" />
              </q-item-section>

              <q-item-section>
                {{ $t("sale") }}
              </q-item-section>
            </q-item>

            <!-- <q-item
              exact-active-class="q-item--active "
              clickable
              v-ripple
              :to="{ name: 'receipt.index' }"
              v-if="userIsInRole(['receipt'])"
            >
              <q-item-section avatar>
                <q-icon name="directions_walk" />
              </q-item-section>

              <q-item-section> {{ $t('receipt') }} </q-item-section>
            </q-item> -->
            <q-item
              exact-active-class="q-item--active"
              v-ripple
              :to="{ name: 'purchase.index' }"
              v-if="userIsInRole(['purchase'])"
            >
              <q-item-section avatar>
                <q-icon name="shopping_cart_checkout" />
              </q-item-section>
              <q-item-section> {{ $t("purchase") }}</q-item-section>
            </q-item>

            <!-- <q-item
              exact-active-class="q-item--active"
              v-ripple
              :to="{ name: 'payment.index' }"
              v-if="userIsInRole(['payment'])"
            >
              <q-item-section avatar>
                <q-icon name="save_alt" />
              </q-item-section>

              <q-item-section> {{ $t('payment') }}</q-item-section>
            </q-item> -->
            <q-item
              exact-active-class="q-item--active"
              v-ripple
              :to="{ name: 'product.index' }"
              v-if="userIsInRole(['product'])"
            >
              <q-item-section avatar>
                <q-icon name="shopping_cart" />
              </q-item-section>

              <q-item-section> {{ $t("product") }}</q-item-section>
            </q-item>

            <!-- <q-expansion-item
              group="link-dialog"
              style="border-radius: 20px"
              icon="local_shipping"
              expand-separator
              :label="$t('shipping_infor')"
              v-if="userIsInRole(['shipping'])"
            >
              <q-card-section>
                <q-item
                  exact-active-class="q-item--active"
                  v-ripple
                  menu_book
                  :to="{ name: 'car.index' }"
                  v-if="userIsInRole(['car'])"
                >
                  <q-item-section avatar>
                    <q-icon name="local_shipping" />
                  </q-item-section>

                  <q-item-section class="">{{ $t('car') }}</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  :to="{ name: 'driver.index' }"
                  v-if="userIsInRole(['driver'])"
                >
                  <q-item-section avatar>
                    <q-icon name="accessible" />
                  </q-item-section>

                  <q-item-section class=""> {{ $t('driver') }}</q-item-section>
                </q-item>
                 <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="tune" />
                        </q-item-section>

                        <q-item-section class="">
                            Car Config
                        </q-item-section>
                    </q-item> -->
            <!-- </q-card-section> -->
            <!-- </q-expansion-item> -->
            <q-expansion-item
              group="link-dialog"
              expand-separator
              icon="settings"
              :label="$t('settings')"
              v-if="userIsInRole(['admin_settings'])"
            >
              <q-card-section>
                <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  :to="{ name: 'role.index' }"
                  v-if="userIsInRole(['role'])"
                >
                  <q-item-section avatar>
                    <q-icon name="description" />
                  </q-item-section>

                  <q-item-section>{{ $t("role") }} </q-item-section>
                </q-item>
                <q-item
                  v-ripple
                  :to="{ name: 'user.index' }"
                  exact-active-class="q-item--active"
                  v-if="userIsInRole(['user'])"
                >
                  <q-item-section avatar>
                    <q-icon name="person" />
                  </q-item-section>

                  <q-item-section> {{ $t("user") }} </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  :to="{ name: 'roleGroup.index' }"
                  exact-active-class="q-item--active"
                  v-if="userIsInRole(['role-group'])"
                >
                  <q-item-section avatar>
                    <q-icon name="payments" />
                  </q-item-section>

                  <q-item-section> {{ $t("group") }} </q-item-section>
                </q-item>
                <q-item
                  v-if="userIsInRole(['branch'])"
                  clickable
                  v-ripple
                  :to="{ name: 'branch.index' }"
                  exact-active-class="q-item--active"
                >
                  <q-item-section avatar>
                    <q-icon name="apartment" />
                  </q-item-section>

                  <q-item-section> {{ $t("branch") }} </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  :to="{ name: 'staff.index' }"
                  v-if="userIsInRole(['staff'])"
                >
                  <q-item-section avatar>
                    <q-icon name="badge" />
                  </q-item-section>

                  <q-item-section> {{ $t("staff") }} </q-item-section>
                </q-item>
                <!-- <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  :to="{ name: 'customer.index' }"
                  v-if="userIsInRole(['customer'])"
                >
                  <q-item-section avatar>
                    <q-icon name="groups_2" />
                  </q-item-section>

                  <q-item-section> {{ $t("customer") }} </q-item-section>
                </q-item> -->
                <q-item
                  exact-active-class="q-item--active"
                  v-ripple
                  :to="{ name: 'category.index' }"
                  v-if="userIsInRole(['category'])"
                >
                  <q-item-section avatar>
                    <q-icon name="category" />
                  </q-item-section>

                  <q-item-section> {{ $t("category") }}</q-item-section>
                </q-item>
                <q-item
                  exact-active-class="q-item--active"
                  v-ripple
                  :to="{ name: 'brand.index' }"
                  v-if="userIsInRole(['brand'])"
                >
                  <q-item-section avatar>
                    <q-icon name="workspaces" />
                  </q-item-section>

                  <q-item-section>{{ $t("brand") }}</q-item-section>
                </q-item>
                <q-item
                  exact-active-class="q-item--active"
                  v-ripple
                  :to="{ name: 'color.index' }"
                  v-if="userIsInRole(['color'])"
                >
                  <q-item-section avatar>
                    <q-icon name="palette" />
                  </q-item-section>

                  <q-item-section>{{ $t("color") }}</q-item-section>
                </q-item>
                <q-item
                  exact-active-class="q-item--active"
                  v-ripple
                  :to="{ name: 'model.index' }"
                  v-if="userIsInRole(['model'])"
                >
                  <q-item-section avatar>
                    <q-icon name="on_device_training" />
                  </q-item-section>

                  <q-item-section>{{ $t("model") }}</q-item-section>
                </q-item>
                <q-item
                  exact-active-class="q-item--active"
                  v-ripple
                  :to="{ name: 'supplier.index' }"
                  v-if="userIsInRole(['supplier'])"
                >
                  <q-item-section avatar>
                    <q-icon name="inventory" />
                  </q-item-section>

                  <q-item-section>{{ $t("supplier") }}</q-item-section>
                </q-item>
                <!-- <q-item
                  clickable
                  v-ripple
                  :to="{ name: 'destination.index' }"
                  exact-active-class="q-item--active"
                  v-if="userIsInRole(['destination'])"
                >
                  <q-item-section avatar>
                    <q-icon name="near_me" />
                  </q-item-section>

                  <q-item-section> {{ $t('destination') }} </q-item-section>
                </q-item> -->
              </q-card-section>
            </q-expansion-item>
            <!-- <q-expansion-item
              group="link-dialog"
              expand-separator
              icon="change_circle"
              :label="$t('change')"
              v-if="userIsInRole(['change'])"
            >
              <q-card-section>
                <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  :to="{ name: 'role.index' }"
                  v-if="userIsInRole(['change-branch'])"
                >
                  
                  <q-item-section avatar>
                    <q-icon name="apartment" />
                  </q-item-section>

                  <q-item-section>{{ $t('change_branch') }} </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  :to="{ name: 'role.index' }"
                  v-if="userIsInRole(['change_destination'])"
                >
                
                  <q-item-section avatar>
                    <q-icon name="navigation" />
                  </q-item-section>

                  <q-item-section
                    >{{ $t('change_destination') }}
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-expansion-item> -->
            <q-expansion-item
              group="link-dialog"
              expand-separator
              icon="description"
              :label="$t('report')"
              v-if="userIsInRole(['report'])"
            >
              <q-card-section>
                <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  v-if="userIsInRole(['sale'])"
                  :to="{ name: 'reportStock' }"
                >
                  <q-item-section avatar>
                    <q-icon name="description" />
                  </q-item-section>

                  <q-item-section> Stock Report </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  v-if="userIsInRole(['sale'])"
                  :to="{ name: 'saleReport' }"
                >
                  <q-item-section avatar>
                    <q-icon name="description" />
                  </q-item-section>

                  <q-item-section> Revenue and Expense </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  v-if="userIsInRole(['sale'])"
                  :to="{ name: 'saleReport' }"
                >
                  <q-item-section avatar>
                    <q-icon name="description" />
                  </q-item-section>

                  <q-item-section> Sale </q-item-section>
                </q-item>
                
                <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  v-if="userIsInRole(['sale_report_detail'])"
                  :to="{ name: 'saleDetailReport' }"
                >
                  <q-item-section avatar>
                    <q-icon name="description" />
                  </q-item-section>

                  <q-item-section> Sale Report Details </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  v-if="userIsInRole(['purchase'])"
                  :to="{ name: 'purchaseReport' }"
                >
                  <q-item-section avatar>
                    <q-icon name="description" />
                  </q-item-section>

                  <q-item-section> Purchase </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  v-if="userIsInRole(['purchase_report_by_detail'])"
                  :to="{ name: 'purchaseDetailReport' }"
                >
                  <q-item-section avatar>
                    <q-icon name="description" />
                  </q-item-section>

                  <q-item-section> Purchase Report By Details </q-item-section>
                </q-item>

                <!-- <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  v-if="userIsInRole(['purchase_report_by_summary'])"
                >
                  <q-item-section avatar>
                    <q-icon name="description" />
                  </q-item-section>

                  <q-item-section>
                   Purchase Report By Summary
                  </q-item-section>
                </q-item> -->

                <!-- <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  v-if="userIsInRole(['purchase_report_by_product'])"
                >
                  <q-item-section avatar>
                    <q-icon name="description" />
                  </q-item-section>

                  <q-item-section>
                   Purchase Report By Product
                  </q-item-section>
                </q-item> -->

                <!-- Product report -->
                <!-- <q-item
                  clickable
                  v-ripple
                  exact-active-class="q-item--active"
                  v-if="userIsInRole(['product_report'])"
                >
                  <q-item-section avatar>
                    <q-icon name="description" />
                  </q-item-section>

                  <q-item-section>
                  Product Report
                  </q-item-section>
                </q-item> -->
              </q-card-section>
            </q-expansion-item>
            <!-- <q-item
              clickable
              v-ripple
              exact-active-class="q-item--active"
            >
              <q-item-section avatar>
                <q-icon name="info" />
              </q-item-section>

              <q-item-section> info </q-item-section>
            </q-item> -->
          </q-list>
        </q-scroll-area>

        <!-- <q-img class="absolute-top bg-grey-10" src=""  style="height: 130px;">
        <div class="absolute-bottom bg-transparent">
            <q-avatar size="60px" class="q-mb-sm">
                <img src="../../../public/logo.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
        </div>
    </q-img> -->
      </q-drawer>
      <!-- <q-page-container class="bg-grey-2">
       Page content -->
      <!-- <q-page class="overflow-hidden q-pa-md">
        <router-view v-slot="{ Component, route }">
          <transition
            name="fade-x"
            mode="out-in"
          >
            <component
              :is="Component"
              :key="route.fullPath"
            />
          </transition>
        </router-view>
      </q-page>
    </q-page-container> -->

      <q-page-container class="" style="">
        <q-page class="q-pa-md" style="margin-top: 50px">
          <router-view v-slot="{ Component }">
            <transition name="slide">
              <component :is="Component" />
            </transition>
          </router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup>
import { ref, nextTick, onBeforeMount, onMounted, computed } from "vue";
import { mapGetters, useStore } from "vuex";
// import store from '../store'
import { useI18n } from "vue-i18n";
import toast from "../Helper/toast";
import state from "../store/state";
import api from "../utils/utility";
const isTranslate = ref(false);
const leftDrawerOpen = ref(true);
const user = ref({});
const store = useStore();
const t = useI18n();
const branchName = ref("");
const branch = ref("");
// const transitionName = ref('fade-out')
//     onMounted(() => {

//       router.beforeEach((to, from, next) => {
//         if (to.name === from.name) {
//           transitionName.value = ''
//         } else transitionName.value = 'fade-out'
//         next()
//       })
//     })

// Methods
const getBranch = async () => {
  await api
    .get("branch/getCurrentBranch/" + store.state.auth.branchId)
    .then((res) => {
      // console.log(res.data)
      if (res) {
        branchName.value = res.data.name + "[ " + res.data.code + " ]";
        branch.value = res.data.name;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const userIsInRole = (roles) => {
  return store.getters["auth/userIsInRoles"](roles);
};
const logout = () => {
  store.dispatch("auth/logout");
};
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const changeLanguage = (lang) => {
  isTranslate.value = !isTranslate.value;
  nextTick(() => {
    t.locale.value = lang;
    toast.success({ message: "Language switch to" + " " + lang });
  });
};
// console.log();
onBeforeMount(() => {
  getBranch();
  // store.dispatch("auth/getCurrentUser").then((res)=>{
  //     console.log(res.data);
  //     user.value = res.data
  //     // console.log(user.value.email);
  // })
});
</script>
<style scoped lang="scss">
// .active {
//     color: #cebe2d;
// }

// .exact-active-link {
//   color: #cebe2d;
//     font-weight: bold;
// }
.app-breadcrumb-toolbar {
  min-height: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.wrapper {
  width: 100%;
  min-height: 100vh;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}

.app-sidebar-header {
  background-color: #212121;
  border-bottom: 1px solid rgba(229, 229, 229, 0.25);
  color: #ffff;
  align-items: center;
}
.app-sidebar-scroll-area {
  height: calc(100% - 50px);
  margin-top: 50px;
  background-color: #2e323a !important;
}
.app-icon {
  font-size: 40px;
}

.app-sidebar-sub-level-item {
  min-width: 150px;
  border-radius: 0;
  background-color: #2e323a !important;
  border-left: 1px solid rgba(255, 255, 255, 0.32);

  .q-item {
    color: #ffffff !important;
    letter-spacing: 0.5px;
    font-size: 12px;
    font-weight: 700;
    box-sizing: border-box;
    letter-spacing: 0.5px;

    .q-focus-helper {
      width: 100%;
      color: rgba(255, 255, 255, 0.23);
    }

    // &.q-item--active {
    //   color: #ffd04b !important;
    //   font-weight: bold;
    //   background: rgba(255, 255, 255, 0.23);
    //   &:before {
    //     background: rgba(255, 255, 255, 0.23);
    //   }
    // }
  }
}

.app-menu {
  .q-item {
    color: #ffffff !important;
    letter-spacing: 0.5px;
    font-size: 12px;

    font-weight: 700;
    box-sizing: border-box;
    letter-spacing: 0.5px;
    .q-icon {
      font-size: 0px;
    }
    .q-focus-helper {
      width: 100%;
      color: rgba(255, 255, 255, 0.23);
    }

    .q-item__section--avatar {
      color: #fff;
      min-width: auto;
      padding-right: 10px;
      padding-left: 5px;
      i {
        font-size: 20px !important;
      }
    }
  }

  .q-item--active {
    color: #fdf911;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.23);
    &:before {
      color: #ffd04b;
      background: rgba(255, 255, 255, 0.23);
    }

    .q-item__section--avatar {
      color: #ffd04b !important;
    }
  }

  .q-expansion-item {
    :deep(.q-expansion-item__container) {
      .q-item {
        color: #ffffff !important;
        letter-spacing: 0.5px;
        font-size: 12px;
        font-weight: 700;
        box-sizing: border-box;
        letter-spacing: 0.5px;

        .q-focus-helper {
          width: 100%;

          color: rgba(255, 255, 255, 0.23);
        }

        .q-item__section--avatar {
          color: #fff;
          min-width: auto;
          padding-right: 10px;
          padding-left: 5px;
          i {
            font-size: 20px !important;
          }
        }
      }

      .q-expansion-item__content {
        background-color: rgba(0, 0, 0, 0.12) !important;
        .is-sub-item {
          padding-left: 40px;
        }
      }
    }

    &.expansion-item--active {
      :deep(.q-expansion-item__container) {
        .q-item {
          .q-item__section--avatar {
            color: #ffffff !important;
          }

          &:not(.is-sub-item) {
            font-weight: bold;
            color: #ffd04b !important;
            background: rgba(255, 255, 255, 0.23);

            &.disabled {
              color: #212121;
              font-weight: normal;
            }
            &:before {
              background: rgba(255, 255, 255, 0.23);
            }

            .q-item__section--avatar {
              color: #ffd04b !important;
            }
          }

          &.is-sub-item {
            &.q-item--active {
              color: #ffd04b !important;
              background: rgba(255, 255, 255, 0.23);
            }
          }
        }
      }
    }
  }
}
</style>
