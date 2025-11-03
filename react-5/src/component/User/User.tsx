import { useParams } from "react-router-dom"
function User (){
  const { userId } = useParams();
  return(
    <div className=" bg-gray-400 h-50 w-full mx-20 ny-3 text-center p-25 ">
      User : {userId}
    </div>
  )
}
export default User