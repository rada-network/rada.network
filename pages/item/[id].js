import { useEffect, useState } from "react";
import useSWR from 'swr'
import ReactDOM from "react-dom";
import Link from 'next/link'
import { useRouter } from 'next/router'

import useUser from '../../lib/useUser'
import {Layout} from '../../components/page-layouts/OneColumn';
import getClient from "../../data/client";

import itemQuery from "../../data/query/itemDetail"
import allItem from "../../data/query/items"
import {RiArrowUpSFill, RiCompass3Fill} from "react-icons/ri";
import TextareaAutosize from "react-textarea-autosize";
import tgVote from "../../data/query/tgVote";


const MAX_LEVEL = 3;
let replyTo = ''

const showLoginForm = function() {
  const btn = document.getElementById('connect-wallet-btn')
  if (btn) btn.click()
}

const getData = async (params) => {
  const id = params.id
  const client = getClient()
  const dataItem = await client.query({
    query : itemQuery,
    variables : {id : id}
  });
  return {
    item_ : dataItem.data.itemById
  }
}

const getComment = async (id) => {
  return []
}

const getVote = async (id) => {
  return {
    seftVote : true
  }
}

export default function Item ({item_}) {
  const [showReply, setShowReply] = useState('')
  const [message, setMessage] = useState('')
  const user = useUser()

  const param = {
    id : item_.id
  }
  const {data: item} = useSWR(param,getData(param), {initialData: item_});
  const {data: comments} = useSWR(item.id, getComment, {initialData: [], revalidateOnMount: 1});
  const {data: votes} = useSWR(item.id,  getVote, {initialData: {total_vote: 0, self_vote: 0}, revalidateOnMount: 1});

  const _comments = {}
  // console.log("item_.voted.cnt", typeof item_.voted)
  console.log("walletAddress in Item function: ", user.address())

  const showReplyFor = id => {
    if (!user?.address()) {
      return showLoginForm()
    }

    let comment = _comments[id]
    while (comment && comment.level >= MAX_LEVEL) {
      comment = _comments[comment.comment.parent_id]
    }
    if (!comment) {
      setShowReply('')
    } else {
      replyTo = comment.comment.owner
      setShowReply(comment.id)
    }
  }

  const lastId = parent => {
    if (parent.children.length) return lastId(_comments[parent.children[parent.children.length-1]])
    return parent.comment.id
  }

  _comments['root'] = {children: [], level: 0}
  console.log(comments);
  comments.forEach(comment => {
    _comments[comment.id] = {children: [], level: 0, comment, id: comment.id}
    let parent = comment.parent_id && _comments[comment.parent_id] ? _comments[comment.parent_id] : _comments['root']
    while (parent.level >= MAX_LEVEL) parent = _comments[parent.comment.parent_id]
    // update level
    _comments[comment.id].level = parent.level + 1
    parent.children.push(comment.id)
  })

  const renderReplies = parent => {
    if (!parent.children.length) return ''

    return (
      <div className={`replies level=${parent.level}`} style={{marginLeft: 30}}>
        { parent.children.map(id => {
          const {level, comment} = _comments[id]
          return (
            <div className="reply">
              <span>By: {comment.owner}</span>
              <span>Time: {comment.time}</span>
              <p>{comment.content}</p>
              <span onClick={() => showReplyFor(id)}>Reply</span>
              { renderReplies(_comments[id]) }
              { MAX_LEVEL > level && showReply == id &&
              <div className="reply-form">
                <form onSubmit={postComment}>
                  <textarea autoFocus name="content">{`@${replyTo}\n`}</textarea>
                  <input type="hidden" name="replyto" value={id} />
                  <button type="submit">Reply</button>
                  <button type="button" onClick={ () => setShowReply('') }>Cancel</button>
                </form>
              </div>
              }
            </div>
          )
        }) }
      </div>
    )
  }

  const postComment = async event => {
    if (!user?.address()) {
      return showLoginForm()
    }

    event.preventDefault() // don't redirect the page
    // data
    const comment = {
      item_id: item.id,
      content: event.target.content.value,
      parent_id: event.target.replyto ? event.target.replyto.value : '',
      owner: user.address()
    }

    setMessage('Posting...')
    const res = await fetch(
      `/api/item/${item.id}/comment`,
      {
        body: JSON.stringify(comment),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    const result = await res.json()

    if (result.ok) {
      comments.push(result.comment)
      if (showReply) {
        setShowReply('')
      } else {
        // clean comment form
        event.target.content.value = ''
      }
      setMessage('Posted')
      setTimeout(() => setMessage(''), 1000)
    }

  }

  const toggleVote = async () => {
    if (!user?.address()) {
      return showLoginForm()
    }

    setMessage('Voting...')

    const client = getClient();

    const res = await client.mutate({
      mutation : tgVote,
      variables : {itemId: item.id,walletAddress : user.address()}
    });
    console.log('status',res.data.toggleVote);
  }

  const readMore = () => {
    const read = document.getElementById("read")
    const readBtn = document.getElementById("readBtn")
    // console.log("abc: ", abc.style.display === "")
    if (read.style.display === ""){
      read.style.display = "inline"
      readBtn.innerHTML = "Read Less"
    }else{
      readBtn.innerHTML = "Read More"
      read.style.display = ""
    }
  }

  const showContents = Object.keys(item.contentJson).map(key => {
    return `${item.contentJson[key].a} </br> ${item.contentJson[key].b} </br>`
  })

  return (
    <Layout extraClass="page-project_details">
      <>
        {/* Page Header */}
        <div className="page-header">
          <div className="container">

            <div className="page-header_l">
              <Link href={`#`}>
                <a title="SolaSystem" className="project-icon">
                  <img className="project-icon_img" src="https://picsum.photos/300/300?random=1" />
                </a>
              </Link>
            </div>

            <div className="flex-1 page-header_main">
              <div className="flex items-center content-center page-title">
                <h1 className="project-title">{`${item.title}`}</h1>
              </div>

              <div className="project-text_short">
                <div  dangerouslySetInnerHTML={{__html: item.description}} />
              </div>

              <div className="mt-2 metadata-wrapper project-metadata-wrapper">
                <a href="#" className="metadata badge badge-dApp project-metadata_type">
                  <span className="metadata-value">{`${item.itemType}`}</span>
                </a>
                <a href="#" className="metadata badge badge-sol project-metadata_platform project-metadata_platform_sol">
                  <span className="icon"><i className="cf cf-sol"></i></span>
                  <span className="metadata-value">{`${item.platform.name}`}</span>
                </a>
                <a href="#" className="metadata badge badge-sol project-metadata_platform project-metadata_platform_sol">
                  <span className="metadata-value">{`${item.token.symbol}`}</span>
                </a>
              </div>

            </div>

            <div className="page-header_r">
              <div className="flex justify-between cta-wrapper">
                <btn className="justify-center px-2 py-2 text-purple-700 bg-white border rounded-md w-icon-104 md:w-full btn border-gray-200 item-center md:px-3 md:py-3 hover:bg-primary-100 hover:border-primary-500">
                  <span className="text-2xl icon"><RiCompass3Fill /></span>
                  <span className="ml-2 uppercase btn-project-vote_total whitespace-nowrap">
                    <span className="inline-block text-sm font-medium">Visit</span>
                  </span>
                </btn>
                <btn className="justify-center flex-1 px-2 py-2 ml-4 text-white transition-all rounded-md md:px-3 md:py-3 btn item-center btn-project-vote bg-primary-700 hover:bg-primary-600">
                  <span className="-mb-1 -ml-1 text-2xl icon"><RiArrowUpSFill /></span>
                  <span className="ml-1 uppercase btn-project-vote_total whitespace-nowrap">
                    <span className="inline-block text-sm font-medium" onClick={toggleVote}>Upvote</span>
                    <strong className="inline-block ml-2 text-base font-bold">{item_.totalVote}</strong>
                  </span>
                </btn>
              </div>
            </div>

          </div>
        </div>

        {/* Page Main */}
        <div className="container">

          <div className="flex flex-row justify-center">

            <div className="page-main">

              <div className="section">
                <div className="section-body">
                  <div className="flex-col">

                    <div className="project-media-viewer">
                      <div className="w-full h-full project-media-wrapper">
                        <div className="overflow-hidden rounded shadow-xl project-media aspect-w-16 aspect-h-9">
                          {/* <img className="project-img" alt="" src="https://picsum.photos/1024/768?random=2" /> */}
                          <iframe width="560" height="315" src="https://www.youtube.com/embed/qnkuBUAwfe0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 md:flex md:mt-8">

                      <div className="flex-1 w-full text-gray-900 text-opacity-100 md:pr-10 project-text">
                        <p id={"read"} dangerouslySetInnerHTML={{__html: showContents}}/>
                        <button className="hover:underline text-blue-700" onClick={readMore} id={"readBtn"}>Read more</button>
                      </div>
                      <div className="w-full mt-4 text-sm text-gray-900 text-opacity-50 md:w-64 md:pl-8 md:-mt-1 list-group-sm project-info">
                        <div className="list-group-item">
                          <strong className="uppercas">Project Info</strong>
                        </div>
                        <div className="list-group-item">
                          <span className="flex-1 w-20">Featured</span>
                          <strong className="ml-2 font-medium text-right text-gray-900 text-opacity-90">2 hours ago</strong>
                        </div>
                        <div className="pb-1 list-group-item">
                          <span className="flex-1 w-20">Data 1</span>
                          <strong className="ml-2 font-medium text-gray-900 text-opacity-90">Combined</strong>
                        </div>
                        <div className="pb-1 border-none list-group-item">
                          <span className="flex-1 w-20">Data 2</span>
                          <strong className="ml-2 font-medium text-gray-900 text-opacity-90">Other</strong>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>


              <div className="pt-4 border-t border-gray-100 section section-project-discussions">

                <div className="section-header">
                  <div className="section-title">Discussions</div>
                </div>

                <div className="section-body">

                  <div className="flex">

                    <div className="flex-1 pr-10 text-gray-900 text-opacity-100">
                      <div className="flex">
                        <div className="flex-1">
                          <TextareaAutosize className="w-full px-5 py-2 resize-none text-base bg-gray-50 focus:bg-white border border-gray-100 rounded-md shadow-sm focus:shadow focus:border-primary-700 focus:outline-none focus:ring-0"  row="1" title="Write a comment" placeholder="What do you think of this project?" />
                        </div>
                        <div className="w-full mt-4 text-sm text-gray-900 text-opacity-50 md:w-auto md:pl-4 md:mt-0">
                          <btn className="justify-center flex-1 px-4 py-2 text-white transition-all rounded-md md:px-5 md:py-3 btn item-center btn-project-vote bg-primary-700 hover:bg-primary-600">Submit</btn>
                        </div>
                      </div>
                    </div>

                    <div className="w-full mt-4 text-sm text-gray-900 text-opacity-50 md:w-64 md:pl-8 md:-mt-1 list-group-sm">
                      <div>This is a sub-sidebar placeholder</div>
                    </div>

                  </div>

                </div>
              </div>

            </div>

            {/* <div className="page-sidebar">
              <div className="flex flex-col h-full project-details">
                <div className="project-text">
                  <p>Part of the Legendary Series, 99 ever minted, 2nd Edition</p>
                  <p>Rune Farm is aiming to be a leading NFT platform on Binance Smart Chain. Rune will launch yield farms as a way to acquire NFTs that can be combined into other NFTs called Rune Words. Characters and Guilds on the platform will gain certain farm bonuses or NFT rewards depending on their attributes. We are a fair launch project with no pre-sale, no investor, and no pre-mine.</p>
                </div>
              </div>
            </div> */}

          </div>

        </div>
      </>
    </Layout>
  )
}

export async function getStaticPaths() {
  const client = getClient()
  const items = await client.query({
    query : allItem,
    variables : {take : 10000,skip : 0}
  });
  // Get the paths we want to pre-render based on posts
  const paths = items.data.itemFeed.map((item) => ({
    params: { id: item.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({params}) {
  const props = await getData(params);
  return {
    props,
    revalidate: 1
  }
}