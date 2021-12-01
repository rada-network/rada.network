const Subscriber = function({project,buyers}){
  return (
    <>
      <div className="list-wrapper">
        <ul className="winners">
          <li className="list-header">
            <span className="winner--no">No</span>
            <span className="winner--address">Address</span>
          </li>
          {buyers && buyers.map(function(item,key){
            return (
              <li key={item}>
                <span className="winner--no">{key+1}</span>
                <span className="winner--address">
                {`${item.substr(
                    0,
                    6
                  )}...${item.substr(
                    -4
                  )} `}
                </span>
              </li>
            )
          })}
          
          
        </ul>

        {/* <ul className="pagination">
          <li><a className="current">1</a></li>
          <li><a>2</a></li>
          <li><a>...</a></li>
          <li><a>49</a></li>
          <li><a>50</a></li>
        </ul> */}
      </div>
    </>
  )
}

export default Subscriber;