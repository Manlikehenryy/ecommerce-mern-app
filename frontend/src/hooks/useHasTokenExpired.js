import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useHasTokenExpired = () => {
 
  const { setAuthUser } = useAuthContext();


    const hasTokenExpired = async () => {
      try {
        const res = await fetch(`/api/auth/hastokenexpired`, {
          method: "GET"
        });
        const data = await res.json();

        if (data.message == "Session has expired") {

          const res = await fetch("/api/auth/signout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });

          const data = await res.json();
          if (data.error) {
            throw new Error(data.error);
          }
    
          localStorage.removeItem("ecomm-user");
          
          setAuthUser(null);

          toast.error("Your session has timed out, please login again");
        }

        if (data.error) throw new Error(data.error);
      } catch (error) {
        toast.error(error.message);
      } 
    };

    



  return {hasTokenExpired};
};

export default useHasTokenExpired;
