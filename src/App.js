import React, { useEffect, useMemo, useState } from 'react';
import useRequestCoins from './services/getData';
import CreateCoinsList from './createCoinsList';
import AllCoins from './components/Coins/AllCoins/AllCoins';
import FavouriteCoins from './components/Coins/FavouriteCoins/FavouriteCoins';
import logo from './logo.svg';
import './App.css';

export default function CoinsApp(){
  const [coins, setCoins] = useState([]);
  const [coinsListNameToShow, setCoinsListNameToShow] = useState('all')
  const [error, setError] = useState({ status: false, errorInfo: '' });
  const [inputText, setInputText] = useState('');
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
    setCoinsListNameToShow(name)
  }
  function getInputData(e) {
    setInputText(e.target.value)
  }
  // setCoin, setsFromInput = '',getFavouriteCoins 
  // здесбь на див поместить обработчичк онскрол
  // и лобавить еще одно состояние на обновление и передать значение и функцию обновления в AllCoins
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
      { !error.status && loading === 'loadEnd' && coinsListNameToShow=== 'all'?
        <AllCoins
          getFavouriteCoins={ getFavouriteCoins }
          getCoins={ getCoins }
          setCoin={ changeFavouriteStateOfCoin }
          setsFromInput={inputText}
        />
        :
        null
      }
      { coins.length && coinsListNameToShow === 'favourite' ? 
        <FavouriteCoins
          setCoin={ changeFavouriteStateOfCoin }
          setsFromInput={ inputText }
          getFavouriteCoins={getFavouriteCoins}
        />
        :
        null
      }
      
      { loading === 'loading' ? 'loading....' : null }
    </div>
  )
}

