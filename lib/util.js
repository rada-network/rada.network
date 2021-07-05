import {getIsVotes} from "../data/query/isVoted";

const utils = {
  timeDifference: function (current, previous){
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = current - previous;

    const date = new Date(previous)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (elapsed < msPerMinute) {
      return Math.round(elapsed/1000) + 's';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed/msPerMinute) + 'm';
    }

    else if (elapsed < msPerDay ) {
      return Math.round(elapsed/msPerHour ) + 'h';
    }

    else if (elapsed < msPerMonth) {
      // return Math.round(elapsed/msPerDay) + ' days ago';
      return months[date.getMonth()] + " " + date.getDate()
    }

    else if (elapsed < msPerYear) {
      const month = Math.round(elapsed/msPerMonth)
      return month + (month < 2 ? ' month' : ' months')
    }

    else {
      const year = Math.round(elapsed/msPerYear )
      return year + year < 2 ? ' year' : ' years'
    }
  },

  titleTime: function (createdAt){
    const date = new Date(createdAt)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let hour = date.getHours()
    const min = date.getMinutes()
    let ampm = "am"

    if (hour > 12){
      hour -= 12
      ampm = "pm"
    }
    const fullDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    return hour + ":" + min + " " + ampm.toUpperCase() + " - " + fullDate
  },

  numberFormat: function (number, fixed){
    if (fixed === undefined) fixed = 1
    const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
    let tier = Math.log10(Math.abs(number)) / 3 | 0;
    if(tier === 0) return number;
    if (tier > SI_SYMBOL.length-1) tier = SI_SYMBOL.length-1
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);
    // scale the number
    const scaled = number / scale;
    // format number and add suffix
    return scaled.toFixed(fixed) + suffix;
  },

  currencyFormat: function (number){
    const SI_SYMBOL = ["", "K", "M"];
    let tier = Math.log10(Math.abs(number)) / 3 | 0;
    if(tier === 0) return number;
    if (tier > SI_SYMBOL.length-1) tier = SI_SYMBOL.length-1
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);
    // scale the number
    const scaled = number / scale;
    // format number and add suffix
    return scaled.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }) + suffix;
  },

  topicTransform : function(word){
    switch (word){
      case "defi" :
        return "DeFi"
      case "dapp" :
        return "DApp"
      case "nft" :
        return "NFT"
      default :
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
  },
  initVoteStore : function(voteStore){

  },
  createSiteMetadata : function({page,data}){
    let base = {
      facebook : {},
      twitter : {}
    }
    if (page === "Index"){
      return Object.assign(base,{
        title : "Dhunt - index",
        description : "Dhunt - description"
      })
    }
    if (page === "IdeaDetail"){
      return Object.assign(base,{
        title : "Dhunt - IdeaDetail",
        description : "Dhunt - description"
      })
    }
    if (page === "Tag"){
      return Object.assign(base,{
        title : "Dhunt - Tag",
        description : "Dhunt - description"
      })
    }
    if (page === "Explore"){
      return Object.assign(base,{
        title : "Dhunt - Explore",
        description : "Dhunt - description"
      })
    }
    if (page === "News"){
      return Object.assign(base,{
        title : "Dhunt - News",
        description : "Dhunt - description"
      })
    }

    if (page === "Social"){
      return Object.assign(base,{
        title : "Dhunt - Social",
        description : "Dhunt - description"
      })
    }

    if (page === "Project"){
      return Object.assign(base,{
        title : "Dhunt - Projects",
        description : "Dhunt - description"
      })
    }

    if (page === "NewsDetail"){
      return Object.assign(base,{
        title : data.title,
        description : data.description
      })
    }
  }
}

export default utils