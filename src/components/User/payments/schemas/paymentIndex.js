import * as Yup from 'yup'
export const  paymentSchema=Yup.object({
    name:Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(5).max(25).required("Please enter your name"),
    deliveryAddress:Yup.string().min(10).max(100).required("Please enter address"),
    contactPerson:Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(5).max(25).required("Please enter your name"),
    contactNumber:Yup.string().min(10).trim().matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,"Please enter valid mobile number").required("Please enter mobile number")
})