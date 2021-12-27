import { getProjectPoolWinnerBySlug } from "@data/query/projects"
import { useEffect, useState } from "react"

const Subscriber = function({project,pool}){
  const [winners,setWinners] = useState([])
  const [wins,setWins] = useState([])
  const [page,setPage] = useState(1)
  const [filter,setFilter]=useState("")
  useEffect(() => {
    getProjectPoolWinnerBySlug({slug : project.slug,pool : pool.slug}).then(function(res){
      setWinners(res)
    })
  },[])
  useEffect(() => {
    let start = (page - 1) * 50
    if (filter != "") {
      console.log(filter)
      let _wins = winners.filter(item => {
        return item.wallet_address.toLowerCase().indexOf(filter.toLowerCase()) >=0       
      })
      setWins(_wins)
    }
    else{
      let _wins = winners.slice(start,start + 50)
      setWins(_wins)
    }
    
  },[winners,page,filter])
  return (
    <>
      <div className="card-header items-center">
        <h3>Winners ({winners.length})</h3>
        <div className="search-wrapper">
          <div className="form-search rounded-full">
            <span className="icon form-search--icon">
              <i className="fa fa-search"></i>
            </span>
            <input type="text" value={filter} onChange={e => {setFilter(e.currentTarget.value)}} className="form-search--input" placeholder="Search for winner" />
          </div>
        </div>
      </div>
      <div className="card-body no-padding">
        <div className="flex flex-col">
          <div className="global-padding-lg min-h-full">
            <div className="">
              <div className="list-wrapper">
                <ul className="winners">
                  <li key={0} className="list-header">
                    <span className="winner--no">No</span>
                    <span className="winner--address">Address</span>
                  </li>
                  {wins && wins.map(function(item,key){
                    return (
                      <li key={item.wallet_address}>
                        <span className="winner--no">{key+1}</span>
                        <span className="winner--address">
                        {item.wallet_address}
                        </span>
                      </li>
                    )
                  })}
                </ul>
                {winners.length > 50 && filter == "" &&
                <ul className="pagination">
                  {page > 1 && 
                  <li><a href="#" onClick={e => {setPage(page-1)}}  className="">{page - 1}</a></li>
                  }
                  <li><a href="#" className="current">{page}</a></li>
                  {(page+1)*50 < winners.length && 
                  <li><a href="#" onClick={e => {setPage(page+1)}} className="">{page+1}</a></li>
                  }
                  {(page+2)*50 < winners.length && 
                  <li><a href="#" onClick={e => {setPage(page+2)}} className="">{page + 2}</a></li>
                  }
                  <li><a>...</a></li>
                  <li><a href="#" onClick={e => {setPage(Math.floor(winners.length/50))}} className="">{Math.floor(winners.length/50)}</a></li>
                </ul>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Subscriber;