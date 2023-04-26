import "./userlog.scss"
import { useState } from "react"
import supabase from "../../../supabase"

const loginFrom = ({showReg}:any) => {

    const [formData , setFormData]= useState({
        name:"" ,email:"",password:""
    })

    const handleChange = (event:any) => {
        setFormData(prev => {
            return {
                ...prev,
                [event.target.name]:event.target.value
            }
        }) 
    }
    console.log(formData)
    const handleSubmit = async (e:any) => {
        e.preventDefault()
       try{
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
          })
       if (error) throw error
       console.log(data)
       alert("Login successful")
       } catch(error) {
        alert(error)
       }
  
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2 className="user-panel-title">E-mail</h2>
            <input type="e-mail" placeholder="example@gmail.com" className="user-panel-input" onChange={handleChange} name="email"/>
            <h2 className="user-panel-title">Password</h2>
            <input type="password" placeholder="password" className="user-panel-input" onChange={handleChange} name="password"/>
            <div className="user-panel-btn-cont">
                <button className="user-panel-btn" type="submit">Login</button>
                <button className="user-panel-btn" onClick={() => showReg(true)}>Register</button>
            </div>
        </form>
    )
}

export default loginFrom