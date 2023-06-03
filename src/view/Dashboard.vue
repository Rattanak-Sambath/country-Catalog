<template>
    <div class="column">
      <div class="row q-col-gutter-x-xl q-col-gutter-y-lg  ">
            <!-- left -->
            <div class="col-xs-12 col-md-8 col-lg-8 q-mx-auto ">
                 <div class="row q-col-gutter-y-sm q-mx-auto">               
                  <div class="col-12">
                    <Bar style="height: 500px; " :data="data" :options="options" />

                  </div>
                </div>
            </div>
            <!-- right -->
            <div class="col-xs-12 col-md-4 col-lg-4 q-mx-auto ">            
             <div class="row q-my-auto q-mx-auto ">
                <div class="col-12 ">
                  <Pie :data="data" :options="options" />

                </div>        
            </div>
            </div>
      </div>
      <div class="row q-col-gutter-x-xl q-col-gutter-y-lg  ">
        <LineWithLineChart  :data="data" :options="options" />

      </div>

    </div>
   
  
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,  
  BarElement
} from 'chart.js'
import LineWithLineChart from '../components/LineWithLineChart.ts'
import Toast from '../Helper/toast'
import { Pie ,Bar, } from 'vue-chartjs';
import {options} from '../config/chartCofig.ts';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
   Tooltip
)
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
}
// const OnClick = () => {
//   Toast.info({})
// }
</script>

<style scoped></style>
