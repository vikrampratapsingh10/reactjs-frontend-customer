import * as Yup from 'yup'

export const  signUpSchema=Yup.object({
    name:Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(5).max(25).required("Please enter your name"),
    email:Yup.string().email().required("Please enter your email"),
    password:Yup.string().min(8).max(20).required("Please enter password"),
    contact:Yup.string().min(10).trim().matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,"Please enter valid mobile number").required("Please enter mobile number"),
    // deliveryAddress:Yup.string().min(10).max(100).required("Please enter address"),
    // contactPerson:Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(5).max(25).required("Please enter your name"),
    // contactNumber:Yup.string().min(10).trim().matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,"Please enter valid mobile number").required("Please enter mobile number")
})