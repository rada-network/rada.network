import { useEffect, useState } from "react";
import useSWR from 'swr'
import ReactDOM from "react-dom";
import Link from 'next/link'
import { useRouter } from 'next/router'

import useUser from '../../lib/useUser'
import fetchJson from '../../lib/fetchJson'
import {Layout} from '../../components/page-layouts/OneColumn';
import {Header} from '../../components/Header';

const MAX_LEVEL = 3;
let replyTo = ''

const showLoginForm = function() {
    const btn = document.getElementById('connect-wallet-btn')
    if (btn) btn.click()
}

export default function Item ({item}) {
    const [showReply, setShowReply] = useState('')
    const [message, setMessage] = useState('')
    const user = useUser()

    // get comment & vote info
    const {data: comments} = useSWR(`/api/item/${item.id}/comment`, fetchJson, {initialData: [], revalidateOnMount: 1});
    const {data: votes} = useSWR(`/api/item/${item.id}/vote`, fetchJson, {initialData: {total_vote: 0, self_vote: 0}, revalidateOnMount: 1});

    const _comments = {}

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
        
        const vote = {item_id: item.id, owner: user.address()}
        const res = await fetch(
            `/api/item/${item.id}/vote`,
            {
              body: JSON.stringify(vote),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }
          )
      
        const result = await res.json()
        if (result.ok) {
            votes.total_vote = result.total_vote
            votes.self_vote = result.self_vote
            setMessage('Posted')
            setTimeout(() => setMessage(''), 1000)
        }
    }

    return (
        <Layout extraClass="page-home">
        <Header />
            <div>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <span>Votes: {votes.total_vote}</span>
                <button type="button" onClick={ toggleVote }>Vote it</button>

                <span>Comments: {comments.length}</span>

                <div className="comments">
                    { renderReplies(_comments['root']) }
                </div>
                { user?.address() && 
                <div className="comment-form">
                    <form onSubmit={postComment}>
                        <textarea name="content"></textarea>
                        <button type="submit">Comment</button>
                    </form>
                </div>
                }
                {message && <span>{message}</span>}
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '1' } },
        ],
        fallback: false
    };
}

export async function getStaticProps({params}) {
    const res = await fetch(`${process.env.API_URL}/item/${params.id}/`)
    const item = await res.json()
  
    if (!item) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: { item }, // will be passed to the page component as props
    }
  }