import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import { set } from "lodash";

const NftPreview = function({project,pool}){
  let slider;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1360, // width to change options
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1280, // width to change options
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1024, // width to change options
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      }
    ],
    afterChange: current => {setCurPage(Math.floor(current/3))},
  };
  const sliderContainer = useRef()
  const [sliderWidth,setSliderWidth] = useState(0)
  const [curPage,setCurPage] = useState(0)
  useEffect(() => {
    windowResize()
    window.addEventListener("resize", windowResize);
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  const windowResize = () => {
    try {
      setSliderWidth(0)
      setSliderWidth(sliderContainer.current.offsetWidth)
    } catch (error) {}
  };

  if (pool.project_pool_nft.length === 0) {
    return null
  }
  let project_pool_nft = pool.project_pool_nft.slice(0)
  project_pool_nft.sort(function(a, b){
    return b.sort - a.sort
  })
  const handleChangeSlide = function(page){
    setCurPage(page)
    slider.slickGoTo(page*3)
  }
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
      <div className="card-body" ref={sliderContainer}>

        <div className="" style={{maxWidth:sliderWidth}}>
          <Slider ref={sld => {slider = sld;}} {...settings}>
          {project_pool_nft.map(function(item){
            return (
              <div className="px-2 py-2" >
                <div className="rounded-lg bg-primary-50 dark:bg-primary-700">
                  <div>
                    <img className="w-full object-cover rounded-lg" src={item.images.medium} />
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
              </div>
            )
          })}
          </Slider>
          
        </div>

        <div className="flex space-x-2 mt-4 justify-center">
          {Array((Math.floor(pool.project_pool_nft.length/3))).fill(null).map((_, i) => {
            return (
              <>
              {curPage === i && <span onClick={e => {handleChangeSlide(i)}} className="h-2 w-4 rounded-lg cursor-pointer bg-primary-500"></span>}
              {curPage !== i && <span onClick={e => {handleChangeSlide(i)}} className="h-2 w-2 rounded-lg cursor-pointer bg-gray-300"></span>}
              </>
            )
          })}
        </div>
        {/* NFT Cards Slideshow */}

      </div>
    </div>
  )
}

const NftPreviewReact = function({project,pool}){
  
  let project_pool_nft = pool.project_pool_nft.slice(0)
  project_pool_nft.sort(function(a, b){
    return b.sort - a.sort
  })
  const itemPerPage = 3;
  const maxPage = Math.floor(pool.project_pool_nft.length/itemPerPage)
  const [curPage,setCurPage] = useState(0)
  if (pool.project_pool_nft.length === 0) {
    return null
  }
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
          {project_pool_nft.map(function(item,index){
            if (index < curPage*itemPerPage || index >= (curPage + 1)*itemPerPage) return null
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
          {Array((Math.floor(pool.project_pool_nft.length/itemPerPage))).fill(null).map((_, i) => {
            return (
              <>
              {curPage === i && <span onClick={e => {setCurPage(i)}} className="h-2 w-4 rounded-lg cursor-pointer bg-primary-500"></span>}
              {curPage !== i && <span onClick={e => {setCurPage(i)}} className="h-2 w-2 rounded-lg cursor-pointer bg-gray-300"></span>}
              </>
            )
          })}
        </div>
        {/* NFT Cards Slideshow */}

      </div>
    </div>
  )
}

export default NftPreview