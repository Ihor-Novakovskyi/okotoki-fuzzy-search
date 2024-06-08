import React, { useEffect, useMemo, useState } from 'react';
import useRequestCoins from './services/getData';
import CreateCoinsList from './createCoinsList';
import AllCoins from './components/Coins/AllCoins/AllCoins';
import logo from './logo.svg';
import './App.css';

export default function CoinsApp(){
  const [coinsList, setCoinsList] = useState([]);
  const [error, setError] = useState({ status: false, errorInfo: '' });
  const [loading, setLoading] = useState('loading');
  const settingsHttp = {
    url: "https://api-eu.okotoki.com/coins",
    statesSettings: {
      setCoinsList,
      setError,
      setLoading
    }
  }
  const getDataRequest = useMemo(() => useRequestCoins(settingsHttp), []);
  // if (loading === 'loadEnd' && !error.status) {
  //   console.log(coinsList)
  // }
  
  const {getCoins, getFavouriteCoins, changeFavouriteStateOfCoin} = useMemo(() => CreateCoinsList(coinsList),[loading])
  useEffect(() => {
    getDataRequest();
  }, [])
  console.log(loading, getCoins())
  console.log(getCoins('pop'))
  console.log(getFavouriteCoins())
  return (
    <div>
      <input type="text" />
      <button>all</button>
      <button>favourite</button>
      { !error.status && loading === 'loadEnd' ? <AllCoins getFavouriteCoins={getFavouriteCoins} getCoins={ getCoins } setCoin={changeFavouriteStateOfCoin} /> : null}
      {loading === 'loading' ? 'loading....' : null}
    </div>
  )
}

