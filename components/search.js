import {useState} from "react";
import {useRouter} from "next/router";
import { useEffect } from "react";
import {useTranslation} from "next-i18next";
import { getItems } from "../data/query/getItem";
import { HOME_ITEM_TAKE } from "../config/paging";

export default function SearchInput({dataStore,detailStore}){
  const {t} = useTranslation("common")
  const router = useRouter()
  const [searchValue,setSearchValue] = useState("")
  const [isSearch,setIsSearch] = useState(false)
  const handledOnChange = (e) =>{
    setSearchValue(e.currentTarget.value)
  }
  const handledOnKeypress = (e) =>{
    if (e.which !== 13){
        return false
    }
    if (searchValue !== "") handleSearch(e)
  }
  useEffect(() => {
    if (searchValue == "") {
      handleSearch(undefined,true)
    }
  }, [searchValue]);
  const handleSearch = (e,clearSearch) => {
    clearSearch = clearSearch || false
    if (dataStore.loadingButton) return false
    dataStore.tweets = []
    dataStore.query = searchValue
    dataStore.loadingButton = true;
    if (!clearSearch){
      setIsSearch(true)
      dataStore.isSearch = true;
    }
    else{
      setIsSearch(false)
      dataStore.isSearch = false;
      
    }
    getItems({
      take : HOME_ITEM_TAKE,
      skip : dataStore.tweets.length,
      orderBy : dataStore.currentTab === "latest" ? {createdAt : "desc"} : {totalVote : "desc"},
      query : dataStore.query,
      type : dataStore.type,
      lang : dataStore.lang
    }).then(function (res){
      dataStore.loadingButton = false;
      dataStore.addTweet(res.data.itemFeed);
    });
    return false
  }
  const handleClose = function(e){
    setSearchValue("")
    
  }
  return (
    <div className={`navbar-search`}>
      <span className={`icon navbar-search--icon`}><i className="far fa-search" /></span>
      <input value={searchValue} onChange={handledOnChange} onKeyPress={handledOnKeypress}
        type="text"
        className={`navbar-search--input`}
        placeholder={t('Search input holder')} />
      {searchValue !== "" ? <button onClick={handleClose} className={`navbar-search--close`} > </button> : ""}
    </div>
  
  )
}