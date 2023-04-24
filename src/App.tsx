import { createClient } from '@supabase/supabase-js'
import { useState , useEffect } from 'react'
import Home from './Pages/Home'
import "./main.scss"
import {Route, Routes , Navigate} from "react-router-dom"
import Manhome from './Pages/Man/Manhome'
import {useDispatch , useSelector } from "react-redux"
import { getAllProducts } from './redux/features/productSlice'
import Navbar from './Components/Navbar/Navbar'


const supabaseUrl = "https://ejvptagpazmojxlvmjqa.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdnB0YWdwYXptb2p4bHZtanFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0MDY5MjIsImV4cCI6MTk5Njk4MjkyMn0.0nFGE0d_fZhmG4fwMs2k9UoLd5ySAPpZI55ZWPDd1Dc"
const supabase = createClient(supabaseUrl, supabaseKey)

interface Products {
  id: number;
  Category: string;
  For: string;
  Item: string;
  Name: string;
  Prize: number;
  img: string;
  Isliked:boolean;
}

const App = () => {

 const dispatch = useDispatch()
 const dataProducts = useSelector(state => state.product.value.item)
  
  
  let data = dataProducts

  let dataLiked = dataProducts.filter(item => item.Isliked === true)

console.log(dataLiked)

  useEffect( () => {
    fetchData()
  }, []) 

  async function fetchData() {
    const {data , error} = await supabase
    .from("Products")
    .select()
    if (error) {
      console.log(error)
    } else {
      dispatch(getAllProducts({item:data}))
    }
  }
 

  
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='*' element={<Navigate to="/"/> }></Route>
      <Route path='/' element={<Home />}></Route>
      <Route path='/Man' element={<Manhome data = {dataProducts}/>}></Route>
    </Routes>
      
    </>
  )
}

export default App