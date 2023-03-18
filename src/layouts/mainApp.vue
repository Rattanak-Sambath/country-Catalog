 
<template>
<div>
  <q-layout view="lHh LpR lff" >

<q-header  class=""  >
    <q-toolbar class=" shadow-none absolute-top text-black" >
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-btn dense flat round icon="search" @click="toggleLeftDrawer" />
        <q-space />
        <!-- <q-toolbar-title align="left">
            <q-avatar>
                <img style="width: 40px;" src="logo.png">
            </q-avatar> 
            <span class="title">
                VET LOGISTIC
            </span>
        </q-toolbar-title> -->
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
              style="width: 60px; height: 35px; text-align: right; margin-right: 10px;"       
        />

        <!-- <img style="width: 70px;" src="istockphoto-652225546-612x612.jpg" /> -->
        <q-btn round flat color="black" icon="notifications_active" />
        <q-btn round flat color="white">
        <q-avatar color="primary" class="q-ma-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          <q-menu>
            <q-list style="min-width: 10px">
              <q-item >
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ user.name }}</q-item-label>
                  <q-item-label>{{ user.email }} </q-item-label>
                  <q-item-label caption lines="1">{{ user.role }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item   :to="{ name: 'setting' }" exact>
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
<q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="white"   :width="250" style="background-color: grey; color:white">
    <q-scroll-area style="height: calc(100% - 20px); margin-top:0px;" class="app-sidebar-scroll-area" >
        <q-list padding class="app-menu">
            <q-item  :to="{ name: 'home' }"  exact-active-class="q-item--active ">
                <q-item-section avatar>
                    <q-icon name=" home" size="16px"/>
                </q-item-section>

                <q-item-section>
                   {{ $t("dashboard.title") }}
                </q-item-section>
            </q-item>

            <q-item clickable    exact-active-class="q-item--active " v-ripple :to="{ name: 'goodsTransfer.index' }">
                <q-item-section avatar>
                    <q-icon name="category" />
                </q-item-section>

                <q-item-section>
                    Good Transfers
                </q-item-section>
            </q-item>

            <q-item   exact-active-class="q-item--active " clickable v-ripple :to="{ name: 'subject.index' }">
                <q-item-section avatar>
                    <q-icon name="directions_walk" />
                </q-item-section>

                <q-item-section >
                    Customer Receive Goods
                </q-item-section>
            </q-item>
            <q-item   exact-active-class="q-item--active"    v-ripple :to="{ name: 'subject.index' }">
                <q-item-section avatar>
                    <q-icon name="content_paste_search" />
                </q-item-section>

                <q-item-section >
                    Search Goods transfer
                </q-item-section>
            </q-item>
            <q-item exact-active-class="q-item--active"  v-ripple :to="{ name: 'subject.index' }">
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
                    <q-item exact-active-class="q-item--active"  v-ripple menu_book :to="{ name: 'car.index' }" >
                        <q-item-section avatar>
                            <q-icon name="local_shipping" />
                        </q-item-section>

                        <q-item-section class="">
                            Car
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple exact-active-class="q-item--active" > 
                        <q-item-section avatar>
                            <q-icon name="accessible" />
                        </q-item-section>

                        <q-item-section class="">
                            Driver
                        </q-item-section>
                    </q-item>
                    <!-- <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="tune" />
                        </q-item-section>

                        <q-item-section class="">
                            Car Config
                        </q-item-section>
                    </q-item> -->
                </q-card-section>
            </q-expansion-item>
            <q-expansion-item group="link-dialog" expand-separator icon="settings" label="Setting">
                <q-card-section>
                    <q-item clickable v-ripple exact-active-class="q-item--active" >
                        <q-item-section avatar>
                            <q-icon name="gpp_good" />
                        </q-item-section>

                        <q-item-section>
                            Role
                        </q-item-section>
                    </q-item>
                    <q-item  v-ripple :to="{ name: 'user.index' }" exact-active-class="q-item--active" >
                        <q-item-section avatar>
                            <q-icon name="person" />
                        </q-item-section>

                        <q-item-section>
                            User
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="logout" exact-active-class="q-item--active" >
                        <q-item-section avatar>
                            <q-icon name="apartment" />                                
                        </q-item-section>

                        <q-item-section>
                            BranchId
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="logout" exact-active-class="q-item--active"  >
                        <q-item-section avatar>
                            <q-icon name="badge" />                                
                        </q-item-section>

                        <q-item-section>
                            Staff
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="logout" exact-active-class="q-item--active" >
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
                    <q-item clickable v-ripple exact-active-class="q-item--active" >
                        <q-item-section avatar>
                            <q-icon name="gpp_good" />
                        </q-item-section>

                        <q-item-section>
                            Role
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple :to="{ name: 'user.index' }" exact-active-class="q-item--active" >
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
            <q-item clickable v-ripple exact-active-class="q-item--active" > 
                <q-item-section avatar>
                    <q-icon name="info" />
                </q-item-section>

                <q-item-section>
                    info
                </q-item-section>
            </q-item>
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
    
<q-page-container style="margin-top: 50px;"> 
     <q-page class="q-pa-md"  >
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
import { ref , nextTick, onBeforeMount, onMounted } from 'vue';
import { mapGetters, useStore } from 'vuex';
// import store from '../store'
import { useI18n } from 'vue-i18n'
import toast from '../Helper/toast';
import router from '../router';
const isTranslate  = ref(false)
const leftDrawerOpen =ref(true)
const user = ref({});
const store = useStore();
const t = useI18n();
// const transitionName = ref('fade-out') 
//     onMounted(() => {
      
//       router.beforeEach((to, from, next) => {
//         if (to.name === from.name) {
//           transitionName.value = ''
//         } else transitionName.value = 'fade-out'
//         next()
//       })
//     })
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
        // console.log(res.data);
          user.value = res.data
          // console.log(user.value.email);
      })

})

</script>
<style scoped lang="scss">
// .active {
//     color: #cebe2d;
// }

// .exact-active-link {
//   color: #cebe2d;
//     font-weight: bold;
// }
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
.app-icon{
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
  .q-icon:{
      font-size: 20px;
  }
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
        font-size: 16px !important;
      }
    }
  }

  .q-item--active {
    color: #fdf911 ;
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
            font-size: 16px !important;
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