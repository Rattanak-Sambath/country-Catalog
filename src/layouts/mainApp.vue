 
<template>
<div>
  <q-layout view="lHh LpR lff" >

<q-header elevated class="bg-grey-10" >
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
          @click="changeLanguage(isTranslate == false ? 'kh' : 'en')"
          />
        <!-- <q-switch       
          :label="isTranslate === true ? 'Kh' : 'En'"
          @click="changeLanguage(isTranslate == false ? 'kh' : 'en')"
        ></q-switch> -->
        <img           
              :src="isTranslate === false ? '../../public/download.png' : '../../public/istockphoto-652225546-612x612.jpg'  "
              style="width: 90px; height: 50px; text-align: right; margin-right: 10px;"       
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
                  <q-item-label> admin@email.com </q-item-label>
                  <q-item-label caption lines="1">admin</q-item-label>
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

                <q-item-section class="text-center">
                   {{ $t("dashboard.title") }}
                </q-item-section>
            </q-item>

            <q-item clickable v-ripple :to="{ name: 'goodsTransfer.index' }">
                <q-item-section avatar>
                    <q-icon name="dataset" />
                </q-item-section>

                <q-item-section class="text-center">
                    Good Transfers
                </q-item-section>
            </q-item>

            <q-item clickable class="text-custome" v-ripple :to="{ name: 'subject.index' }">
                <q-item-section avatar>
                    <q-icon name="menu_book" />
                </q-item-section>

                <q-item-section class="text-center">
                    Subjects
                </q-item-section>
            </q-item>

            <q-expansion-item group="link-dialog" style="border-radius: 20px" expand-separator icon="dataset"
                label="Study Years">
                <q-card-section>
                    <q-item clickable v-ripple :to="{ name: 'studyyear.index' }" class="text-center">
                        <q-item-section avatar>
                            <q-icon name="schedule_send" />
                        </q-item-section>

                        <q-item-section class="">
                            Years
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="calendar_month" />
                        </q-item-section>

                        <q-item-section class="">
                            Months
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="alarm_on" />
                        </q-item-section>

                        <q-item-section class="">
                            Time
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
                            <q-icon name="logout" />                                
                        </q-item-section>

                        <q-item-section>
                            Log-out
                        </q-item-section>
                    </q-item>
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

    <q-img class="absolute-top" src="../../public/material.png" style="height: 198px">
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
     <q-page >
        <router-view></router-view>
     </q-page> 
</q-page-container> 

</q-layout>
</div>
</template>
<script setup>
import { ref , nextTick} from 'vue';
import { mapGetters } from 'vuex';
import store from '../store'
import { useI18n } from 'vue-i18n'
const isTranslate  = ref(false)
const leftDrawerOpen =ref(true)
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
  })
}
// export default {
//   data: () => ({
//       leftDrawerOpen: false,
//       isTranslate: false
//   }),
//   computed: {
//   ...mapGetters("auth", {
//     user: "user",
//   }),
// },

// beforeCreate() {    
//   this.$store.dispatch("auth/getUser").catch(() => {});
// },

// methods: {
//   logout() {
//     this.$store.dispatch("auth/logout");
//   },
//   toggleLeftDrawer() {
//           this.leftDrawerOpen = !this.leftDrawerOpen;
//   },
 
//   changeLanguage (lang) {
//   this.isTranslate.value =! this.isTranslate.value
// // console.log(lang);
// // console.log(isTranslate.value);
//   nextTick(() => {
//     t.locale.value = lang
//   })
//   }

// },
// }
</script>
<style scoped>
/* .app-menu {
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
          // .q-item__section--avatar {
          //   color: #ffd04b !important;
          // }

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
} */
</style>