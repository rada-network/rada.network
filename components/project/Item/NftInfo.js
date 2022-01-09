import { Disclosure, Transition } from "@headlessui/react";

const NftInfo = function({project,pool}){

  if (pool.project_pool_nft.length === 0) {
    return null
  }
  let project_pool_nft = pool.project_pool_nft.slice(0)
  project_pool_nft.sort(function(a, b){
    return b.sort - a.sort
  })
  return (
    <div className="card card-default card--project-info">
      <div className="card-header">
        <h3>RADA NFT Rarity</h3>  
        <a className="btn btn-default">
          <span className="btn--text text-xs">
            Learn more
          </span>
        </a>      
      </div>
      <div className="card-body">
      {project_pool_nft.map(function(item){
        return (
          <div key={item.id}>
            <Disclosure as="div" className="disclosure">
            {({ open }) => (
              <>
                <Disclosure.Button as="div" className="disclosure--toggle">
                  <strong>
                    {item.title}
                  </strong>
                  <span
                    className={`${open ? "open" : ""} disclosure--toggle-arrow`}
                  >
                    <i className="fas fa-angle-down"></i>
                  </span>
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-y-100 opacity-0"
                  enterTo="transform scale-y-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-y-100 opacity-100"
                  leaveTo="transform scale-y-0 opacity-0"
                >
                  <Disclosure.Panel className="disclosure--panel">
                    <div dangerouslySetInnerHTML={{ __html: item.description }}>
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
            </Disclosure>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default NftInfo