import React, { useEffect, useMemo, useState } from 'react';
import useRequestCoins from './services/getData';
import CreateCoinsList from './createCoinsList';
import AllCoins from './components/Coins/AllCoins/AllCoins';
import logo from './logo.svg';
import './App.css';

export default function CoinsApp(){
  const [coins, setCoins] = useState([]);
  const [coinsListName, setCoinsListName] = useState('all')
  const [error, setError] = useState({ status: false, errorInfo: '' });
  const [loading, setLoading] = useState('loading');
  const settingsHttp = {
    url: "https://api-eu.okotoki.com/coins",
    statesSettings: {
      setCoins,
      setError,
      setLoading
    }
  }
  const getDataRequest = useMemo(() => useRequestCoins(settingsHttp), []);
  const {getCoins, getFavouriteCoins, changeFavouriteStateOfCoin} = useMemo(() => CreateCoinsList(coins),[loading])
  useEffect(() => {
    getDataRequest();
  }, [])
  function toggleListOfCoinsName(name) {
    setCoinsListName(name)
  }
  function getInputData(e) {
    console.log(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        onChange={getInputData} />
      <button
        onClick={() => toggleListOfCoinsName('all')}
      >
        all
      </button>
      <button
        onClick={() => toggleListOfCoinsName('favourite')}
      >
        favourite
      </button>
      { !error.status && loading === 'loadEnd' && coinsListName === 'all'?
        <AllCoins
          getFavouriteCoins={ getFavouriteCoins }
          getCoins={ getCoins }
          setCoin={ changeFavouriteStateOfCoin }
        />
        :
        null
      }
      
      { loading === 'loading' ? 'loading....' : null }
    </div>
  )
}

