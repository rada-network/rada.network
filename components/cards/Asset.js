import Link from 'next/link'

export const Card = ({item, isMulti}) => {
  const hasBid = false;
  return (
    <div className="card card-asset">
      <div className="card-media">
        <Link href={`/asset/${item.id}`}>
        <a><img className="card-img" alt={item.title} src={item.preview} /></a>
        </Link>
      </div> 
      <div className="card-body">
        <div className="card-body-header">
          <div className="card-text">
            <span>{item.des}</span>
          </div>
          <div className="card-title">
            <Link href={`/asset/${item.id}`}>
            <a title={item.title}>
                <span>{item.title}</span>
            </a>
            </Link>
          </div>
        </div> 
        <div className="card-body-main">
          <div className="asset-price text-primary-700">0.99 ADA</div>
        </div>
        <div className="card-body-footer">
          { hasBid ?
          <div className="card-text">Higest bid <span class="asset-price-sm">0.02 ADA</span></div>
          :
          <button className="btn"><span className="btn-text">Place a bid</span></button>
          }
        </div>
      </div>
      { isMulti && 
      <div className="card-is-multi"></div> }
    </div>
  );
};