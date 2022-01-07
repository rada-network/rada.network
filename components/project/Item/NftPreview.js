import Slider from "react-slick";
const NftPreview = function({project,pool}){
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  if (pool.project_pool_nft.length === 0) {
    return null
  }
  let project_pool_nft = pool.project_pool_nft.slice(0)
  project_pool_nft.sort(function(a, b){
    return b.sort - a.sort
  })
  return (
    <div className="card card-default card--project-info">
      <div className="card-header items-end">
        <div>
          <span class="text-2xs uppercase opacity-60 tracking-wide">PREVIEW </span>
          <h3>{project.content.title} NFT Collection</h3>
        </div>
        <a className="btn btn-default">
          <span className="btn--text">
            View all
          </span>
          <span className="btn--caret-right"></span>
        </a>  
      </div>
      <div className="card-body">

        {/* NFT Cards Slideshow */}
        <div className="grid grid-cols-3 gap-4">
          {/* NFT Card */}
          {project_pool_nft.map(function(item){
            return (
              <div className="rounded-lg bg-primary-50 dark:bg-primary-700">
                <div>
                  <img className="w-full object-cover rounded-lg" src={item.images.small} />
                </div>

                <div className="flex justify-between items-center p-2">
                  <div>
                    <h5 className="font-medium">
                      {item.title}
                    </h5>
                    <span className="text-xs font-medium text-yellow-500">
                      {item.rarity}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="block text-xs opacity-60">
                      Total
                    </span>
                    <span className="text-xs font-medium">
                      {item.total}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
          {/* END: NFT Card */}
          
        </div>

        <div className="flex space-x-2 mt-4 justify-center">
          <span className="h-2 w-2 rounded-lg cursor-pointer bg-gray-300"></span>
          <span className="h-2 w-2 rounded-lg cursor-pointer bg-gray-300"></span>
          <span className="h-2 w-4 rounded-lg cursor-pointer bg-primary-500"></span>
          <span className="h-2 w-2 rounded-lg cursor-pointer bg-gray-300"></span>
          <span className="h-2 w-2 rounded-lg cursor-pointer bg-gray-300"></span>
          <span className="h-2 w-2 rounded-lg cursor-pointer bg-gray-300"></span>
        </div>
        {/* NFT Cards Slideshow */}

      </div>
    </div>
  )
}

export default NftPreview