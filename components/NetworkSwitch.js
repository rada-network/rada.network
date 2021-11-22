import {useState} from "react"
import useStore from "../lib/useStore"
import {useRouter} from "next/router"
import {NetworkLocalStorageKey} from "../utils/config"
const NetworkSwitch = ({
  
}) => {
  const options = [
    {
      value : 'bsc',
      label : 'BSC'
    },
    {
      value : 'eth',
      label : 'Ethereum'
    }
  ]
  const store = useStore()
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState(store.network);
  const handleChangeNetwork = function(e){
    setSelectedOption(e.target.value)
    store.updateNetwork(e.target.value)
    window.localStorage.setItem(NetworkLocalStorageKey,e.target.value)
    router.reload()
  }
  return (
      <select className="btn-default mr-2"
        value={selectedOption}
        onChange={e => handleChangeNetwork(e)}>
        {options.map(o => (
          <option key={o.value} value={o.value} selected={o.value == store.network}>{o.label}</option>
        ))}
      </select>
  );
};

export default NetworkSwitch
