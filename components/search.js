import {useState} from "react";
import {useRouter} from "next/router";

export default function SearchInput(){
    const router = useRouter()
    const [searchValue,setSearchValue] = useState("")
    const handledOnChange = (e) =>{
        setSearchValue(e.currentTarget.value)
    }
    const handledOnKeypress = (e) =>{
        if (e.which !== 13){
            return false
        }
        if (searchValue.trim() !== ""){
            router.push("/explore/search?q="+encodeURI(searchValue))
        }

    }
    return (
        <div className="relative w-full mx-4 md:mx-6">
            <input value={searchValue} onChange={handledOnChange} onKeyPress={handledOnKeypress}
                type="search"
                className="w-full px-5 py-2 text-sm focus:text-base bg-gray-50 focus:bg-white border border-gray-100 rounded-md shadow-sm focus:shadow focus:border-primary-700 focus:outline-none focus:ring-0"
                placeholder="Search by name ..." />
        </div>
    )
}