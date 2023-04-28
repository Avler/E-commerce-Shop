import "./addnewitem.scss"
import { useState } from "react"




const AddNewItem = ()=> {
    const [selectedOption , setSelectedOption] = useState()
    return(
        <section className="Add-item">   
            <div className="add-item-element">
                <h2 className="add-item-title">For ?</h2> 
                <select>
                    <option value="option1">Man</option>
                    <option value="option2">Woman</option>
                    <option value="option3">Kids</option>
                    
                </select>
            </div>
        </section>
    )
}

export default AddNewItem