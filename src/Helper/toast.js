
import toast from '@brenoroosevelt/toast';

const  success = ({message})=>{
  message = message || "Your transaction is success"
  toast.create (message, {  
    bgColor: '#39ad3c',
    color:'#fff',
    icon: 'check', 
    closeBtn: true,
    duration: 2000,
    shadow: true,
    animateIn: 600,
    animateOut: 350,
  
  })
}
const  warning = ({message})=>{
  message = message || "Your transaction is success"
  toast.create (message, {  
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