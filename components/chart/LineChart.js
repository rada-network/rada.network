import {useState} from "react"

import styles from '../../styles/modules/Chart.linechart.module.css'

export default function LineChart(props) {

  let {data, svgHeight, svgWidth, color, pointRadius, onChartHover, showLabels, xLabelSize, yLabelSize} = {
    data: [],
    color: '#3B82F6',
    pointRadius: 5,
    svgHeight: 300,
    svgWidth: 500,
    xLabelSize: 20,
    yLabelSize: 80,
    showLabels: true,
    onChartHover: () => '',
    ...props
  }

  if (!showLabels) {
    xLabelSize = yLabelSize = 0
  }

  if (!data?.length) return 'Loading...'

  const [hoverLoc, setHoverLoc] = useState(null)
  const [activePoint, setActivePoint] = useState(null)

  // GET X & Y || MAX & MIN
  const getX = () => {
    return {
      min: data[0].x,
      max: data[data.length - 1].x
    }
  }

  const getY = () => {
    return {
      min: data.reduce((min, p) => p.y < min ? p.y : min, data[0].y),
      max: data.reduce((max, p) => p.y > max ? p.y : max, data[0].y)
    }
  }

  // GET SVG COORDINATES
  const getSvgX = (x) => {
    return yLabelSize + (x / getX().max * (svgWidth - yLabelSize));
  }

  const getSvgY = (y) => {
    const gY = getY();
    return ((svgHeight - xLabelSize) * gY.max - (svgHeight - xLabelSize) * y) / (gY.max - gY.min);
  }

  // BUILD SVG PATH
  const Path = () => {
    let pathD = "M " + getSvgX(data[0].x) + " " + getSvgY(data[0].y) + " ";

    pathD += data.map((point, i) => {
      return "L " + getSvgX(point.x) + " " + getSvgY(point.y) + " ";
    }).join("");

    return (
      <path className="linechart_path" d={pathD} style={{stroke: color}} />
    );
  }

  // BUILD SHADED AREA
  const Area = () => {
    let pathD = "M " + getSvgX(data[0].x) + " " + getSvgY(data[0].y) + " ";

    pathD += data.map((point, i) => {
      return "L " + getSvgX(point.x) + " " + getSvgY(point.y) + " ";
    }).join("");

    const x = getX();
    const y = getY();
    pathD += "L " + getSvgX(x.max) + " " + getSvgY(y.min) + " "
    + "L " + getSvgX(x.min) + " " + getSvgY(y.min) + " ";

    return <path className="linechart_area" d={pathD} />
  }

  // BUILD GRID AXIS
  const Axis = () => {
    const x = getX();
    const y = getY();

    return (
      <g className="linechart_axis">
        <line
          x1={getSvgX(x.min) - yLabelSize} y1={getSvgY(y.min)}
          x2={getSvgX(x.max)} y2={getSvgY(y.min)}
          strokeDasharray="5" />
        <line
          x1={getSvgX(x.min) - yLabelSize} y1={getSvgY(y.max)}
          x2={getSvgX(x.max)} y2={getSvgY(y.max)}
          strokeDasharray="5" />
      </g>
    );
  }
  const Labels = () => {
    if (!showLabels) return ''

    const padding = 5;
    const sd = data[0].d
    const ed = data[data.length - 1].d
    return(
      <g className="linechart_label">
        {/* Y AXIS LABELS */}
        <text transform={`translate(${yLabelSize/2}, 20)`} textAnchor="middle">
          {getY().max.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}
        </text>
        <text transform={`translate(${yLabelSize/2}, ${svgHeight - xLabelSize - padding})`} textAnchor="middle">
          {getY().min.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}
        </text>
        {/* X AXIS LABELS */}
        <text transform={`translate(${yLabelSize}, ${svgHeight})`} textAnchor="start">
          { sd }
        </text>
        <text transform={`translate(${svgWidth}, ${svgHeight})`} textAnchor="end">
          { ed }
        </text>
      </g>
    )
  }

  // FIND CLOSEST POINT TO MOUSE
  const getCoords = (e) => {
    const svgLocation = document.getElementsByClassName("linechart")[0].getBoundingClientRect();
    const adjustment = (svgLocation.width - svgWidth) / 2; //takes padding into consideration
    const relativeLoc = e.clientX - svgLocation.left - adjustment;

    let svgData = [];
    data.map((point, i) => {
      svgData.push({
        svgX: getSvgX(point.x),
        svgY: getSvgY(point.y),
        d: point.d,
        p: point.p
      });
    });

    let closestPoint = {};
    for(let i = 0, c = 500; i < svgData.length; i++){
      if ( Math.abs(svgData[i].svgX - hoverLoc) <= c ){
        c = Math.abs(svgData[i].svgX - hoverLoc);
        closestPoint = svgData[i];
      }
    }

    if(relativeLoc - yLabelSize < 0){
      stopHover();
    } else {
      setHoverLoc(relativeLoc)
      setActivePoint(closestPoint)
      //onChartHover(relativeLoc, closestPoint);
    }
  }

  // STOP HOVER
  const stopHover = () => {
    setHoverLoc(null)
    setActivePoint(null)
    //onChartHover(null, null);
  }

  // MAKE ACTIVE POINT
  const ActivePoint = () => {
    if (!hoverLoc) return ''
    return (
      <circle
        className='linechart_point'
        style={{stroke: color}}
        r={pointRadius}
        cx={activePoint.svgX}
        cy={activePoint.svgY}
      />
    );
  }

  // MAKE HOVER LINE
  const Line = () => {
    if (!hoverLoc) return ''
    return (
      <line className='hoverLine'
        x1={hoverLoc} y1={-8}
        x2={hoverLoc} y2={svgHeight - xLabelSize} />
    )
  }


  // Tooltip
  const Tooltip = () => {
    if (!hoverLoc) return ''

    const svgLocation = document.getElementsByClassName("linechart")[0].getBoundingClientRect();

    let placementStyles = {position: 'absolute'};
    let width = 100;
    placementStyles.width = width + 'px';
    placementStyles.left = hoverLoc + svgLocation.left - (width/2);

    return (
      <div className='hover' style={ placementStyles }>
        <div className='date'>{ activePoint.d }</div>
        <div className='price'>{activePoint.p }</div>
      </div>
    )
  }

  return (
    <>
      <svg  width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={'linechart'}
            onMouseLeave={ () => stopHover() }
            onMouseMove={ (e) => getCoords(e) } >
        <g>
          <Axis />
          <Path />
          <Area />
          <Labels />
          <Line />
          <ActivePoint />
        </g>
      </svg>
      <Tooltip />
    </>
  );  

}