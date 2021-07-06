import {action, autorun, makeObservable, observable} from "mobx";
import utils from "./util";
import {getIsVotes} from "../data/query/isVoted";

export class VoteStore {
  votes = []
  walletAddress = ''
  constructor() {
    makeObservable(this, {
      votes: observable,
      walletAddress : observable,
      addVotes: action,
      updateVote: action,
      getIds: action,
    });
    autorun(() => {
      let voteStore = this
      if (voteStore.walletAddress){
        getIsVotes(voteStore.walletAddress, voteStore.getIds()).then(r =>{
          voteStore.votes.forEach((el,index) =>{
            if (r.filter((e) =>{
              return e.itemId === el.id
            }).length === 0){
              voteStore.votes[index]["isVoted"] = false
            }
            else{
              voteStore.votes[index]["isVoted"] = true
            }
          })
        })
      }
      else{
        voteStore.votes.forEach((el,index) =>{
          voteStore.votes[index]["isVoted"] = false
        })
      }
    });
  }
  addVotes(votes) {
    if (votes.length > 0){
      for (let vote of votes){
        if (this.votes.filter(el => {
          return el.id === vote.id
        }).length === 0){
          this.votes.push({
            id : vote.id,
            totalVote: vote.totalVote,
            isVoted : false
          })
        }
      }
    }
  }
  getIds () {
    return this.votes.map(a => a.id)
  }
  updateVote(vote) {
    let flag = false
    this.votes.forEach((el,index)=>{
      if (el.id === vote.id){
        this.votes[index] = {
          id : vote.id,
          isVoted : typeof vote.isVoted == "undefined" ?  el.isVoted : vote.isVoted,
          totalVote : typeof vote.totalVote == "undefined" ?  el.totalVote : vote.totalVote,
        }
        flag = true;
      }
    })
    if (!flag){
      this.votes.push({
        id : vote.id,
        isVoted : typeof vote.isVoted == "undefined" ?  false : vote.isVoted,
        totalVote : typeof vote.totalVote == "undefined" ?  0 : vote.totalVote,
      })
    }
  }
}

export class ObservableTweetStore {
  currentTab = "latest"
  tweets = []
  query = ""
  showMoreButton = true
  constructor({homeStore}) {
    this.home = homeStore
    makeObservable(this, {
      currentTab: observable,
      query: observable,
      addTweet: action,
      tweets: observable,
      showMoreButton: observable,
    });
    autorun(() => this.report);
  }

  get report() {

  }
  addTweet(tws) {
    if (tws.length > 0){
      for (let tw of tws){
        if (this.tweets.filter(el => {
          return el.id === tw.id
        }).length === 0){
          this.tweets.push(tw)
        }
      }

    }
  }
}

export class HomeStore {
  homeDisplay = 0
  isHome = false
  constructor({isHome}) {
    this.isHome = isHome
    makeObservable(this, {
      homeDisplay: observable,
    });
    autorun(() => {});
  }
}
