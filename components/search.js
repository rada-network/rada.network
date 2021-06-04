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
                className="search-input"
                placeholder="Search by name ..." />
        </div>
    )
}