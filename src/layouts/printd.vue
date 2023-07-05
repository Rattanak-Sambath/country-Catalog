<template>
    <q-dialog v-model="visible" persistent>
        <q-card class="q-pa-lg">
            <div id="print-area">
                <div id="wrapper">
                    <div style="full-width">
                            <h3 class="text-bold q-py-md">{{ branchName }}</h3>
                            <p style="text-transform: capitalize">{{  }}</p>
                            <span class="left" ><span class="text-bold">Address</span>:ភូមិ ព្រែកមហាទេព , ស្រុក ស្វាយប៉ោ , ខេត្ត បាត់ដំបង</span>
                            <span class="left">Tel:  <strong>092 916 811</strong> </span>
                            <div class="left">                              
                                    Reference receipt:                          
                                    <strong>{{ code }} </strong>                              
                            </div>

                    </div>
                   
                    <table class="table" cellspacing="0" border="0">
                        <thead>
                            <tr>
                                <th><em>#</em></th>
                                <th>Menu</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody v-for="(items, index) in dataDoc" :id="index"  border="0">
                            <!-- @foreach($saleDetails as $saleDetail) -->
                            <tr v-for="(it, index) in items.productDoc" :key="index" style="  border-top: 1px solid #000;
                                        padding-top: 5px;
                                        text-align: right;
                                        font-weight: bold;
                                        padding-right: 5px;">
                                <td style="text-align: center; width: 30px">{{ index + 1  }}</td>
                                <td style="text-align: center; width: 180px">{{ it.name }}</td>
                                <td style="text-align: center; width: 50px">{{ it.qty }}</td>
                                <td style="text-align: center; width: 55px">{{ it.price }} </td>
                                <td style="text-align: center; width: 65px">{{ it.qty * it.price }} $</td>
                            </tr>
                            <!-- @endforeach -->
                        </tbody>
                        
                    </table>
        
                    <table class="totals" cellspacing="0" border="0">
                        <tbody  >
                            <tr>
                                <td style="text-align: left">Total quantity</td>
                                <td
                                    style="
                                        text-align: right;
                                        padding-right: 1.5%;
                                        border-right: 1px solid #999;
                                        font-weight: bold;
                                    "
                                
                                > {{ totalQty }} </td>
                                <td style="text-align: left; padding-left: 1.5%">
                                    Total
                                </td>
                                <td style="text-align: right; font-weight: bold">  
                                  {{ totalAmount }}
                                  $</td>
                               
                            </tr>
                            <tr style="background-color: #cccccc">
                                <td
                                    colspan="2"
                                    style="
                                        text-align: left;
                                        font-weight: bold;
                                        border-top: 1px solid #000;
                                        padding-top: 5px;
                                    "
                                >
                                    Payment Type
                                </td>
                                <td
                                    colspan="2"
                                    style="
                                        border-top: 1px solid #000;
                                        padding-top: 5px;
                                        text-align: right;
                                        font-weight: bold;
                                        padding-right: 5px;
                                    "
                                >
                                {{ type }}
                              </td>
                                
                            </tr>
                            <tr style="background-color: #cccccc">
                                <td
                                    colspan="2"
                                    style="
                                        text-align: left;
                                        font-weight: bold;
                                        border-top: 1px solid #000;
                                        padding-top: 5px;
                                        padding-right: 5px;
                                    "
                                >
                                    Paid Amount
                                </td>
                                <td
                                    colspan="2"
                                    style="
                                        border-top: 1px solid #000;
                                        padding-top: 5px;
                                        text-align: right;
                                        font-weight: bold;
                                        padding-right: 5px;
                                    "
                                >
                                  {{ totalAmount }}
                                    $
                                </td>
                            </tr>
        
                            <tr style="background-color: #cccccc">
                                <td
                                    colspan="2"
                                    style="
                                        text-align: left;
                                        font-weight: bold;
                                        border-top: 1px solid #000;
                                        padding-top: 5px;
                                    "
                                >
                                    Change
                                </td>
                                <td
                                    colspan="2"
                                    style="
                                        border-top: 1px solid #000;
                                        padding-top: 5px;
                                        text-align: right;
                                        font-weight: bold;
                                        padding-right: 5px;

                                    "
                                >
                                {{ totalRiel }}
                                   ៛
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                    <div style="border-top: 1px solid #000; padding-top: 10px">
                        Thank You!!!
                    </div>
        
                    <div
                        id="buttons"
                        v-if="isPrint"
                        style="
                            padding-top: 10px;
                            text-transform: uppercase;
                            margin-top: 30px;
                        "
                    >
                        
                        <q-btn icon="home" @click="back()" class=" q-mb-sm full-width bg-primary text-white"  />
                        <q-btn icon="print" @click="print()"  class="full-width bg-orange text-white"  />
                        
                        <div style="clear: both"></div>
                    </div>
                </div>
            </div>
            </q-card>
    </q-dialog>

</template>

<script>
import { Printd } from "printd";
import { useRouter } from "vue-router";
import {ref} from 'vue'
import { useStore } from "vuex";
import api from '../utils/utility';
import router from '../router/index.js'
  import decimalNumber from '../lib/numeral.js'; 
// import _, { has } from 'lodash'
// import {} from '../lib/numeral.js';
export default {
  
  data() {
    const store = useStore();
    const $route = useRouter();
    // const router = router()
    const visible = true;
    const dataDoc = ref([]);
    const branchName =  ref('');
    const totalAmount = ref(0)
    const totalRiel = ref(0)
    const totalQty = ref(0)
    const type = ref(0)
    const code = ref()
      return {
          isPrint: true,
          $route,
          branchName,
          store,
          visible,
          router

      };
  },
  methods: {
    back(){
        this.router.go(-1)
    },  
    getBranch() {
        // console.log('hi');
           api.get('branch/getCurrentBranch/' + this.store.state.auth.branchId)
                .then((res) => {
                // console.log(res.data)
                if (res) {
                    this.branchName= res.data.name 
                    // this.code = res.data.code
                }
                })
                .catch((err) => {
                console.log(err)
                })
            },
    findDataById ()  {         
          api.get('/sale/getSaleByIdForPrint', {
            params:{
                brandId : this.store.state.auth.branchId,
                id: this.$route.params.id
            }
        })
        .then((result) => {
          // console.log('res',result);
            this.dataDoc = result.data.data
            this.code = result.data.data[0].code;
            this.type = result.data.data[0].type
            this.totalQty = result.data.data[0].totalQty;
            this.totalAmount= result.data.data[0].totalAmount
            this.totalRiel= result.data.data[0].totalRiel
            console.log('res', result.data.data);
        })
        .catch((err) => {
            console.log('err', err);
         });
    },
      print() {
          this.d.print(document.getElementById("print-area"), [
              `
              #wrapper {
  width: 280px;
  margin: 0 auto;
  text-align: center;
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}
#wrapper img {
  width: 80%;
}
h3 {
  margin: 5px 0;
}
.left {
  width: 60%;
  float: left;
  text-align: left;
  margin-bottom: 3px;
}
.right {
  width: 40%;
  float: right;
  text-align: right;
  margin-bottom: 3px;
}
.table,
.totals {
  width: 100%;
  margin: 10px 0;
}
.totals {
  margin-top: 10px;
  margin-bottom: 0px;
}
.table th {
  border-bottom: 1px solid #000;
}
.table td {
  padding: 0;
}
.totals td {
  width: 24%;
  padding: 0;
}
.table td:nth-child(2) {
  overflow: hidden;
}
#buttons { display: none; }
      `,
          ]);
      },
  },
  mounted() {
        // console.log('params', this.$route.params.id);
      this.getBranch()
      this.findDataById()
      this.d = new Printd();

      const { contentWindow } = this.d.getIFrame();

      if (contentWindow) {
          contentWindow.addEventListener("beforeprint", () => {

              console.log("before print event!");
          });
          contentWindow.addEventListener("afterprint", () =>
              console.log("after print event!")
          );
      }
  },
//   onBeforeMount(){
   
//   }

  
};
</script>

<style type="text/css" media="all" scoped>
#wrapper {
  width: 280px;
  margin: 0 auto;
  text-align: center;
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}
#wrapper img {
  width: 80%;
}
h3 {
  margin: 5px 0;
}
.left {
  width: 60%;
  float: left;
  text-align: left;
  margin-bottom: 3px;
}
.right {
  width: 40%;
  float: right;
  text-align: right;
  margin-bottom: 3px;
}
.table,
.totals {
  width: 100%;
  margin: 10px 0;
}
.totals {
  margin-top: 10px;
  margin-bottom: 0px;
}
.table th {
  border-bottom: 1px solid #000;
}
.table td {
  padding: 0;
}
.totals td {
  width: 24%;
  padding: 0;
}
.table td:nth-child(2) {
  overflow: hidden;
}
</style>
<!-- <style type="text/css" media="print">
/* #buttons { display: none; } */
</style> -->
