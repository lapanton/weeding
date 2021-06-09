import React, {useCallback, useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {GuestList} from "../components/GuestList";
import {AuthContext} from "../context/AuthContext";


export const AdminPage = () => {
const {request} = useHttp()
const {token} = useContext(AuthContext)
const [guests, setGuests] = useState('')
const {loading} = useHttp()

  const fetchGuests = useCallback(async () => {

    const aValue = JSON.parse(window.localStorage['userData']).userId;
    try {
      const fetched = await request('/api/admin/admin', 'POST', {aValue}, {
        Authorization: `Bearer ${token}`
      })
      setGuests(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchGuests()
  }, [fetchGuests])

  if (loading) {
    return <Loader/>
  }
  // console.log('guests', guests);
  return (
    <div className="container">
      {!loading && <GuestList guests={guests} />}
    </div>
  )
}
