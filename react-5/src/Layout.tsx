import { Outlet } from "react-router-dom";
import { Footer, Header } from "./component";

export function Layout(){
  
  return(
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}