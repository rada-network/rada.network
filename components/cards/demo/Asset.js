export const Asset = () => {
  return (
    <div className="card border shadow-sm rounded-md">
      <div className="card-media">
        <img src="https://images.pexels.com/photos/1988681/pexels-photo-1988681.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="asset-media" />
      </div> 
      <div className="card-body">
        <div className="card-body-header">
          <div className="asset-collection">Collection Name</div>
          <div className="asset-name">Official Cryptomon BTC CM1-0021 1st Edition Card</div>
        </div> 
        <div className="card-body-main">
          <div className="asset-price">0.99 ADA</div>
        </div>
        <div className="card-body-footer">
          <button className="btn">Place a bid</button>
        </div>
      </div>
    </div>
  );
};