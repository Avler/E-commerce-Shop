import supabase from './supabase'
import { useState , useEffect } from 'react'
import Home from './Pages/Home'
import "./main.scss"
import {Route, Routes , Navigate} from "react-router-dom"
import Manhome from './Pages/Man/Manhome'
import {useDispatch , useSelector } from "react-redux"
import { getAllProducts } from './redux/features/productSlice'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import Footer from './Components/Footer/Footer'
import Womanhome from './Pages/Woman/Womanhome'
import Kidshome from './Pages/Kids/Kidshome'




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
 const dataProducts = useSelector((state:any) => state.product.value.item)
  
  

  



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
    <Navbar  fetchData ={fetchData} data ={dataProducts}/>
    <Routes>
      <Route path='*' element={<Navigate to="/"/> }></Route>
      <Route path='/' element={<Home fetchData ={fetchData}/>}></Route>
      <Route path='/Man' element={<Manhome data ={dataProducts} fetchData ={fetchData}/>}></Route>
      <Route path='/Woman' element={<Womanhome data ={dataProducts} fetchData ={fetchData}/>}></Route>
      <Route path='/Kids' element={<Kidshome data ={dataProducts} fetchData ={fetchData}/>}></Route>
      <Route path='/Panel-Admin' element={<Admin data={dataProducts} fetchData ={fetchData}/>}></Route>
    </Routes>
    <Footer />
    </>
  )
}

export default App