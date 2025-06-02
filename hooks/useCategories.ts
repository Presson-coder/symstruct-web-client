import { Category } from "@/types"
import axios from "axios";
import { useState } from "react"

export const useCategories = () => {

 const [categories, setCategories] = useState<Category[]>([]);
 const [loading, setLoading] = useState<boolean>(true);

 const fetchCategories = () => {
    setLoading(true);
    axios.get(`${B}`)
 }
}