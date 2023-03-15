
import toast from '@brenoroosevelt/toast';

const  success = ({message})=>{
  message = message || "Your transaction is success"
  toast.create (message, {  
    align: 'center',
    bgColor: '#39ad3c',
    color:'#fff',
    icon: 'check', 
    closeBtn: true,
    duration: 2000,
    shadow: true,
    animateIn: 350,
    animateOut: 450,
  
  })
}
const  warning = ({message})=>{
  message = message || "Your transaction is success"
  toast.create (message, {  
    align: 'center',
    icon: 'check',
    bgColor: '#c4c118',
    color:'#fff',
    closeBtn: true,
    duration: 2000,
    shadow: true,
    animateIn: 350,
    animateOut: 350,
  
  })
}
const  error = ({message})=>{
  message = message || "Your transaction is success"
  toast.create (message, {  
    align: 'center',
    bgColor: '#a60319',
    color:'#fff',
    icon: 'check', 
    closeBtn: true,
    duration: 2000,
    shadow: true,
    animateIn: 350,
    animateOut: 350,
  
  })
}

const  info = ({message})=>{
  message = message || "Your transaction is success"
  toast.create (message, {  
    align: 'center',
    bgColor:"#18c6cc",
    icon: 'check', 
    color: "#fff",
    closeBtn: true,
    duration: 2000,
    shadow: true,
    animateIn: 350,
    animateOut: 350,
  
  })
}



export default {success, warning, error, info};