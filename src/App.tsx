import { createClient } from '@supabase/supabase-js'
import { useState , useEffect } from 'react'
import Home from './Pages/Home'
import "./main.scss"

const supabaseUrl = "https://ejvptagpazmojxlvmjqa.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdnB0YWdwYXptb2p4bHZtanFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0MDY5MjIsImV4cCI6MTk5Njk4MjkyMn0.0nFGE0d_fZhmG4fwMs2k9UoLd5ySAPpZI55ZWPDd1Dc"
const supabase = createClient(supabaseUrl, supabaseKey)

interface Products {
  id: Number;
  Category: Text;
  For: Text;
  Item: Text;
  Name: Text;
  Prize: Number;
  img: Text;
}

const App = () => {

 const [dataProducts , setDataProducts] = useState<Products[]>([])
  
  useEffect( () => {
    async function fetchData() {
      const {data , error} = await supabase
      .from("Products")
      .select("*")
      if (error) {
        console.log(error)
      } else {
        setDataProducts(data as Products[])
      }
    }
    fetchData()
  }, []) 

 

  return (
    <>
      <Home data = {dataProducts}/>
    </>
  )
}

export default App