import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { apiClient } from "../api-client"
import { adminloginSchema } from "@/pages/admin-login"
import Cookies from 'js-cookie';


export const useAdminLogin = () => {
    const navigate = useNavigate()
    return useMutation(
        {
            mutationFn: async (loginData: z.infer<typeof adminloginSchema>) => {
                try {
                    const { data } = await apiClient.post("auth/admin-login", loginData)
                    Cookies.set('access_token', data.token, { expires: 7, path: '/' });
                    navigate("/dashboard")
                } catch (error) {
                    console.log(error);
                }

            }
        }
    )
}