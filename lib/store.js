import {action, autorun, makeObservable, observable} from "mobx";
import utils from "./util";
import {getIsVotes} from "../data/query/isVoted";
import {types} from "mobx-state-tree";

export class VoteStore {
  votes = []
  access_token = ""
  newVotes = []
  constructor() {
    makeObservable(this, {
      votes: observable,
      access_token : observable,
      addVotes: action,
      addVotesV2: action,
      updateVote: action,
      getIds: action,
    });
    autorun(() => {
      let voteStore = this
      if (voteStore.access_token){
        getIsVotes(voteStore.getIds()).then(r =>{
          voteStore.votes.forEach((el,index) =>{
            if (r.filter((e) =>{
              return e.itemId === el.id
            }).length === 0){

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
      if (this.newVotes.length > 0 && voteStore.access_token) {
        getIsVotes(voteStore.getNewIds()).then(r =>{
          voteStore.newVotes = []
          voteStore.votes.forEach((el,index) =>{
            if (r.filter((e) =>{
              return e.itemId === el.id
            }).length === 0){
              //voteStore.votes[index]["isVoted"] = false
            }
            else{
              voteStore.votes[index]["isVoted"] = true
            }
          })
        })
      }
    });
  }
  addVotes(votes) {
    if (votes.length > 0){
      for (let vote of votes){
        if (this.votes.filter(el => {
          return el.id === vote.item.id
        }).length === 0){
          this.votes.push({
            id : vote.item.id,
            totalVote: vote.item.totalVote,
            isVoted : false
          })
        }
      }
    }
  }
  addVotesV2(votes) {
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
      this.newVotes = votes
    }
  }
  getIds () {
    return this.votes.map(a => a.id)
  }
  getNewIds () {
    return this.newVotes.map(a => a.id)
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
  loadingButton = false
  showDetail = false
  lang = 'en'
  type="all"
  isSearch=false
  constructor({homeStore}) {
    this.home = homeStore
    makeObservable(this, {
      currentTab: observable,
      query: observable,
      addTweet: action,
      tweets: observable,
      showMoreButton: observable,
      loadingButton: observable,
      showDetail: observable,
      type: observable,
      lang: observable,
      isSearch: observable,
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
  mainwidth = 45
  constructor({isHome}) {
    this.isHome = isHome
    makeObservable(this, {
      homeDisplay: observable,
      mainwidth: observable,
    });
    autorun(() => {});
  }
}

export class DetailStore {
  data = {}
  type = ""
  constructor() {
    makeObservable(this, {
      data: observable,
    });
    autorun(() => {});
  }
}

export class TrendingStore {
  data = ["trending"]
}

export const UserStore = types.model({
  id : types.identifier,
  walletAddress : types.string,
  email : types.string,
  name : types.string,
  image : types.string
})

export const CommentStore = types.model({
  id: types.identifier,
  createdAt :types.Date,
  content : types.string,
  parent: types.string,
  itemId : types.string,
  userId : types.string,

}).views(self => ({

})).actions(self => {
  const getUser = function (){
    return self.user
  }
  return {getUser}
})

export const ThreadsStore = types.model({
  users: types.array(UserStore),
  threads : types.map(types.array(CommentStore))
}).views(self => ({
})).actions(self => {
  const addComment = function (data){
    if (typeof self.threads.get(data.parent) === "undefined") {
      self.threads.set(data.parent,[])
    }
    let arr = self.threads.get(data.parent)
    if (arr.find(c => c.id === data.id) !== undefined) return
    arr.unshift(CommentStore.create(data))
    self.threads.set(data.parent, arr)
    if (typeof self.threads.get(data.id) === "undefined") {
      self.threads.set(data.id, [])
    }
  }

  const addUser = function (data){
    self.users.push(data)
  }

  const getUser = function (userId){
    return self.users.find(u => u.id === userId) || null
  }
  const getChildComment = function(parentId){
    return self.threads.get(parentId) || []
  }
  return {addComment,getChildComment,addUser,getUser}
})
