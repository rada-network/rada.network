import Head from "next/dist/shared/lib/head";
import RadaSvg from "@components/svg/rada";
import { useEffect, useState } from "react";
import fetcher from "@lib/fetchJson";
import Pool from "./pool";

function PoolWrapper({ project }) {
  const [selectedPool, setSelectedPool] = useState(null);
  const [projectSlug, setProjectSlug] = useState("");

  useEffect(() => {
    fetcher(`/api/pools/get-slug?address=${project.contract_address}&&poolID=${project.pool_id}`).then(function (res) {
      if (res.length > 1) {
        project.project.project_pool.forEach(pool => {
          if (pool.slug == res[1]) {
            const selectPool = {...pool,id : project.pool_id,contract : project.contract_address }
            setSelectedPool(selectPool);
            setProjectSlug(res[0]);
          }
        });
      }
    })
  }, []);

  return (
    <> 
      {selectedPool ? (
        <Pool pool={selectedPool} thumbnail_uri={project.project.thumbnail_uri} project_slug={projectSlug}/>
      ) : null}
    </>
  );
}

export default PoolWrapper
