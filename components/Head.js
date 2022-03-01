import HTMLHead from "next/head";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { observer } from "mobx-react";
import { usePageStore } from "../lib/usePageStore";
import Script from "next/script";
import LazyLoadCSS from "./LazyLoadCSS";


export const Head = observer(({ meta }) => {

  const { detailStore } = usePageStore();

  return (
    <>
      <HTMLHead>
        {detailStore.data?.airdrop && (
          <Script
            id="gleam"
            dangerouslySetInnerHTML={{
              __html: `
            (function(d, t){
              var key = '${detailStore.data?.airdrop.gleam_tracking_code}';
              var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
                g.src = "https://gleam.io/"+key+"/trk.js"; s.parentNode.insertBefore(g, s);
            }(document, "script"));
            `,
            }}
          />
        )}

      </HTMLHead>

      <LazyLoadCSS href="https://rsms.me/inter/inter.css" />

      <TooltipWrapper />
    </>
  );
});

const TooltipWrapper = () => {
  const [isTooltipVisible, setTooltipVisibility] = useState(false);
  useEffect(() => {
    setTooltipVisibility(true);
  }, []);
  return (
    <>
      {isTooltipVisible && (
        <ReactTooltip type="info" clickable={true} html={true} />
      )}
    </>
  );
};
