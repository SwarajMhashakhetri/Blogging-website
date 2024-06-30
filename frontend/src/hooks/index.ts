import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    "content":string,
    "title":string,
    "id":string,
    "author":{
        "name":string
    }
}

export const useBlog = ({id} : { id:string }) => {
    const [loading , setLoading] = useState(true);
    const [blog, setblog] = useState<Blog[]>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(response =>{
            setblog(response.data.post);
            setLoading(false);
        })
    }, [id])

    return {
        loading,
        blog
    }
}


export const useBlogs = () =>{
    const [loading , setLoading] = useState(true);
    const [blogs, setblogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(response =>{
            setblogs(response.data);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }
}