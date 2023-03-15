<template>
    <q-layout >
        <q-page-container>
            <q-page >
                <q-card class="q-pa-lg q-mx-auto" style="margin-top: 60px; max-width: 450px;" >
                    <q-form @submit.prevent.stop="onLogin()"   ref="refForm"
                        class="mt-4 text-center"
                        lazy-validation
>
                        <q-img style="width: 250px;"  src="../../../public/logo.png"/>
                        <div class="section q-my-lg">
                            <q-input color="orange-14" type="email" filled v-model="email" label="Username" :rules="[val => !!val || 'email is required']">
                                <template v-slot:prepend>
                                    <q-icon name="person" color="orange-14" />
                                </template>
                            </q-input>
                            <q-input class="q-my-md" color="orange-14" filled v-model="password" label="Password" :rules="[val => !!val || 'password is required']">
                                <template v-slot:prepend>
                                    <q-icon name="lock"  color="orange-14"/>
                                </template>
                            </q-input>
                            <q-btn style="background-color: #de5d0a; color: white; font-weight: bold;" class="full-width" label="Login" :loading="loading" push  type="submit" />
                        </div>
                        <div class="footer" style="margin-top: 80px;">
                            © copyright and reserved by Rattanak and Viva 
                        </div>
                    </q-form>                  
                  </q-card>
            </q-page>            
                   
             
    </q-page-container>
    </q-layout>
      
</template>

<script setup>
    // import router from '../../router';
    import toast from '../../Helper/toast'
    import {ref, onMounted,} from 'vue';
    // import store from '../../store/';
    import api from '../../utils/utility'

    import { useStore } from 'vuex';
    import router from '../../router';
    const refForm = ref('');
    const loading = ref(false)
    const email = ref('guest@email.com')
    const password = ref('guest123')
    const store = useStore();
    const onLogin = async () => {
        const {valid} = await refForm.value?.validate()
        if(!valid){
                let form = {
                    email: email.value,
                    password : password.value
                }     

                store.dispatch('auth/login', form).catch(()=>{
                    toast.error({message:"Email or Password is not correct"})
                });               
                router.push({name: 'home'})
            
        }  
    }
</script>

<style scoped>

</style>