<template>
    <div >
        <div style="width: 370px">
            <q-container>
                <q-card class="q-pa-lg q-my-auto">
                    <q-img style="width: 240px" src="../../../public/logo.png"/>
                    <div class="section q-my-lg">
                        <q-input color="orange-14" filled v-model="text" label="Username">
                            <template v-slot:prepend>
                                <q-icon name="person" color="orange-14" />
                            </template>
                        </q-input>
                        <q-input class="q-my-md" color="orange-14" filled v-model="text" label="Password">
                            <template v-slot:prepend>
                                <q-icon name="lock"  color="orange-14"/>
                            </template>
                        </q-input>
                        <q-btn style="background-color: #de5d0a; color: white; font-weight: bold;" class="full-width" label="Login" />
                    </div>
                    <div class="footer" style="margin-top: 80px;">
                        © copyright and reserved by Rattanak and Viva 
                    </div>
                </q-card>
            </q-container>
        </div>
    </div>
      
</template>

<script>
    export default {
        name: 'login'
    }
</script>

<style scoped>

</style>