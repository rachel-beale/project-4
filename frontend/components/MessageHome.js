import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import { Link } from 'react-router-dom'

function MessageHome() {
  const token = localStorage.getItem('token')
  const [allMatches, updateAllMatches] = useState([])
  // const [userMessages, updateUserMessages] = useState([])

  useEffect(() => {
    axios.get('/api/matches', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateAllMatches(resp.data)
      })
      .catch(err => console.log(err))
  }, [])

  console.log(getUserId())


  // ? Filtering by conversations the user started 
  const iStarted = allMatches.filter((message) => {
    return message.match_one_id === getUserId()
  })
  console.log(iStarted)

  const newSorted = iStarted.map((item) => {
    return [item.match_two_id, item]
  })
  const mapSorted = new Map(newSorted)
  const results = [...mapSorted.values()]

  console.log(results)

  // ? Filtering by conversations the match started 
  // const theyStarted = allMatches.filter((message) => {
  //   return message.match_two_id === getUserId()
  // })
  // console.log(theyStarted)


  return <div>
    <h1 className="testing">MESSAGE HOME</h1>
    {results.map((messageTitle, index) => {
      return <Link key={index} to={`/message/${messageTitle.match_two_id}`}>
        <h2 className="testing">{messageTitle.match_two.first_name} </h2>
      </Link>



    })}

    {/* {theyStarted.map((messageTitle, index) => {
      return <Link key={index} to={'/message'}>
        <h2 className="testing">{messageTitle.to_user.first_name} </h2>
      </Link>
    })} */}
  </div>



}

export default MessageHome