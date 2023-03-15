 
<template>
<div>
  <q-layout view="lHh LpR lff" >

<q-header elevated class="bg-grey-10 " >
    <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title align="left">
            <q-avatar>
                <img style="width: 40px;" src="logo.png">
            </q-avatar> 
            <span class="title">
                VET LOGISTIC
            </span>
        </q-toolbar-title>
        <q-btn
    class="q-mr-xs"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
          />
        <q-toggle
        style="margin-right:25px ;"
          v-model="value"
          :label="isTranslate === true ? 'Kh' : 'En'"
          @click="changeLanguage(isTranslate == false ? 'Kh' : 'En')"
          />
        <!-- <q-switch       
          :label="isTranslate === true ? 'Kh' : 'En'"
          @click="changeLanguage(isTranslate == false ? 'kh' : 'en')"
        ></q-switch> -->
        <img           
              :src="isTranslate === false ? '../../public/download.png' : '../../public/istockphoto-652225546-612x612.jpg'  "
              style="width: 90px; height: 45px; text-align: right; margin-right: 10px;"       
        />

        <!-- <img style="width: 70px;" src="istockphoto-652225546-612x612.jpg" /> -->
        <q-btn round flat color="white" icon="notifications_active" />
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
                  <q-item-label></q-item-label>
                  <q-item-label> </q-item-label>
                  <q-item-label caption lines="1"></q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple :to="{ name: 'setting' }" exact>
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>

                <q-item-section>Setting</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple @click="logout()" exact>
                <q-item-section avatar>
                  <q-icon name="logout" />
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
<q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="white"   :width="250">
    <q-scroll-area style="height: calc(100% - 200px); margin-top: 198px;">
        <q-list padding class="app-menu">
            <q-item clickable v-ripple :to="{ name: 'home' }">
                <q-item-section avatar>
                    <q-icon name=" home" />
                </q-item-section>

                <q-item-section>
                   {{ $t("dashboard.title") }}
                </q-item-section>
            </q-item>

            <q-item clickable  v-ripple :to="{ name: 'goodsTransfer.index' }">
                <q-item-section avatar>
                    <q-icon name="category" />
                </q-item-section>

                <q-item-section>
                    Good Transfers
                </q-item-section>
            </q-item>

            <q-item clickable class="text-custome" v-ripple :to="{ name: 'subject.index' }">
                <q-item-section avatar>
                    <q-icon name="directions_walk" />
                </q-item-section>

                <q-item-section >
                    Customer Receive Goods
                </q-item-section>
            </q-item>
            <q-item clickable class="text-custome" v-ripple :to="{ name: 'subject.index' }">
                <q-item-section avatar>
                    <q-icon name="content_paste_search" />
                </q-item-section>

                <q-item-section >
                    Search Goods transfer
                </q-item-section>
            </q-item>
            <q-item clickable class="text-custome" v-ripple :to="{ name: 'subject.index' }">
                <q-item-section avatar>
                    <q-icon name="settings_phone" />
                </q-item-section>

                <q-item-section >
                    Call Customer
                </q-item-section>
            </q-item>
            <q-expansion-item group="link-dialog" style="border-radius: 20px" expand-separator icon="local_shipping"
                label="Shipping Info">
                <q-card-section>
                    <q-item clickable v-ripple menu_book:to="{ name: 'studyyear.index' }" >
                        <q-item-section avatar>
                            <q-icon name="local_shipping" />
                        </q-item-section>

                        <q-item-section class="">
                            Car
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="accessible" />
                        </q-item-section>

                        <q-item-section class="">
                            Driver
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="tune" />
                        </q-item-section>

                        <q-item-section class="">
                            Car Config
                        </q-item-section>
                    </q-item>
                </q-card-section>
            </q-expansion-item>
            <q-expansion-item group="link-dialog" expand-separator icon="settings" label="Setting">
                <q-card-section>
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="gpp_good" />
                        </q-item-section>

                        <q-item-section>
                            Role
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple :to="{ name: 'user.index' }">
                        <q-item-section avatar>
                            <q-icon name="person" />
                        </q-item-section>

                        <q-item-section>
                            User
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="logout">
                        <q-item-section avatar>
                            <q-icon name="apartment" />                                
                        </q-item-section>

                        <q-item-section>
                            BranchId
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="logout">
                        <q-item-section avatar>
                            <q-icon name="badge" />                                
                        </q-item-section>

                        <q-item-section>
                            Staff
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="logout">
                        <q-item-section avatar>
                            <q-icon name="move_to_inbox" />                                
                        </q-item-section>

                        <q-item-section>
                            Location_Desk
                        </q-item-section>
                    </q-item>
                  
                </q-card-section>
            </q-expansion-item>
            <q-expansion-item group="link-dialog" expand-separator icon="assignment_late" label="Reports">
                <q-card-section>
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="gpp_good" />
                        </q-item-section>

                        <q-item-section>
                            Role
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple :to="{ name: 'user.index' }">
                        <q-item-section avatar>
                            <q-icon name="person" />
                        </q-item-section>

                        <q-item-section>
                            User
                        </q-item-section>
                    </q-item>
                   
                    <!-- <q-item clickable v-ripple @click="logout">
                        <q-item-section avatar>
                            <q-icon name="logout" />                                
                        </q-item-section>

                        <q-item-section>
                            Log-out
                        </q-item-section>
                    </q-item> -->
                </q-card-section>
            </q-expansion-item>
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="info" />
                </q-item-section>

                <q-item-section>
                    info
                </q-item-section>
            </q-item>
        </q-list>
    </q-scroll-area>

    <q-img class="absolute-top bg-grey-10" src=""  style="height: 198px;">
        <div class="absolute-bottom bg-transparent">
            <q-avatar size="96px" class="q-mb-sm">
                <img src="../../../public/logo.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
        </div>
    </q-img>
</q-drawer>     
<q-page-container> 
     <q-page class="q-pa-md">
      <router-view v-slot="{ Component }">
          <transition name="slide">
            <component :is="Component" />
          </transition>
        </router-view>
        <!-- <router-view></router-view> -->
     </q-page> 
</q-page-container> 

</q-layout>
</div>
</template>
<script setup>
import { ref , nextTick, onBeforeMount } from 'vue';
import { mapGetters, useStore } from 'vuex';
// import store from '../store'
import { useI18n } from 'vue-i18n'
import toast from '../Helper/toast';
const isTranslate  = ref(false)
const leftDrawerOpen =ref(true)
const user = ref([]);
const store = useStore();
const t = useI18n();
const logout =()=>{
  store.dispatch("auth/logout");
}
const toggleLeftDrawer =()=>{
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const changeLanguage =(lang)=>{
  isTranslate.value =! isTranslate.value;
  nextTick(() => {
    t.locale.value = lang
    toast.success({message:"Language switch to" + ' ' + lang})
  })
}
// console.log();
onBeforeMount(()=>{
      store.dispatch("auth/getCurrentUser").then((res)=>{
          user.value = res
      })

})

</script>
<style scoped lang="scss">

.wrapper {
  width: 100%;
  min-height: 100vh;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
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



.app-menu {
  // .q-item {
  //   color: #161515 !important;
  //   letter-spacing: 0.5px;
  //   font-size: 12px;
  //   font-weight: 700;
  //   box-sizing: border-box;
  //   letter-spacing: 0.5px;

  //   .q-focus-helper {
  //     width: 100%;
  //     color: rgba(255, 255, 255, 0.23);
  //   }

  //   .q-item__section--avatar {
  //     color: #000000;
  //     min-width: auto;
  //     padding-right: 10px;
  //     padding-left: 5px;
  //     i {
  //       font-size: 26px !important;
  //     }
  //   }
  // }

  .q-item--active {
    color: #ffd04b !important;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.23);
    &:before {
      background: rgba(255, 255, 255, 0.23);
    }

    .q-item__section--avatar {
      color: #ffd04b !important;
    }
  }

  .q-expansion-item {
  //   :deep(.q-expansion-item__container) {
  //     .q-item {
  //       color: #ffffff !important;
  //       letter-spacing: 0.5px;
  //       font-size: 12px;
  //       font-weight: 700;
  //       box-sizing: border-box;
  //       letter-spacing: 0.5px;

  //       .q-focus-helper {
  //         width: 100%;
  //         color: rgba(255, 255, 255, 0.23);
  //       }

  //       .q-item__section--avatar {
  //         color: #fff;
  //         min-width: auto;
  //         padding-right: 10px;
  //         padding-left: 5px;
  //         i {
  //           font-size: 16px !important;
  //         }
  //       }
  //     }

  //     .q-expansion-item__content {
  //       background-color: rgba(0, 0, 0, 0.12) !important;
  //       .is-sub-item {
  //         padding-left: 40px;
  //       }
  //     }
  //   }

    &.expansion-item--active {
      :deep(.q-expansion-item__container) {
        .q-item {
          .q-item__section--avatar {
            color: #ffd04b !important;
          }

          &:not(.is-sub-item) {
            font-weight: bold;
            color: #ffd04b !important;
            background: rgba(3, 3, 3, 0.23);

            &.disabled {
              color: #212121;
              font-weight: normal;
            }
            &:before {
              background: rgba(26, 19, 19, 0.23);
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