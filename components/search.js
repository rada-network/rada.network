import {useState} from "react";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

export default function SearchInput(){
  const {t} = useTranslation("common")
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
    <div className={`navbar-search`}>
      <span className={`icon navbar-search--icon`}><i className="far fa-search" /></span>
      <input value={searchValue} onChange={handledOnChange} onKeyPress={handledOnKeypress}
        type="search"
        className={`navbar-search--input`}
        placeholder={t('Search input holder')} />
    </div>
  )
}