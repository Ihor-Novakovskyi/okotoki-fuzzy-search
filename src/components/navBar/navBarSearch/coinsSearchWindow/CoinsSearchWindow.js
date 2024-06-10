import React, { useEffect, useMemo, useState } from 'react';
import AllCoins from './AllCoins/AllCoins';
import FavouriteCoins from './FavouriteCoins/FavouriteCoins';
import Star from './AllCoins/star';
import './coinsSearchWindow.css'

export default function CoinsSearchWindow({ loading, error, getCoins, getFavouriteCoins, changeFavouriteStateOfCoin, resetOffset }) {
  const [coinsListNameToShow, setCoinsListNameToShow] = useState('all')
  const [inputText, setInputText] = useState('');
  const [showMoreCoins, setShowMoreCoins] = useState(false);
  const claszzActive = 'coin-search-window__filter-button--active';
  function clearSearch() {
    setInputText('')
  }
  function toggleListOfCoinsName(name) {
    setCoinsListNameToShow(name)
  }
  function getInputData(e) {
    setInputText(e.target.value)
  }
  coinsListNameToShow === 'favourite' ? resetOffset("resetAll") : void 0

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='coin-search-window'
    >
      <div className='coin-search-window__actions-wrapper'>
        <div className="coin-search-window__search-input-wrapper">
          <input
            value={ inputText }
            className='coin-search-window__search-input'
            type="text"
            onChange={ getInputData }
            placeholder='Enter text...'
          >
          </input>
          <div
            onClick={ clearSearch }
            className="coin-search-window__clear-input"
          />
        </div>
        <div className='coin-search-window__filter-actions-block'>
          <button
            className={
              `coin-search-window__filter-button coin-search-window__filter-button--favourite 
            ${coinsListNameToShow === 'favourite' ? claszzActive : ''}`
            }
            onClick={ () => toggleListOfCoinsName('favourite') }
          >
            <Star setWhiteBackground={ coinsListNameToShow === 'favourite' ? true : false }
              setGreyBackground={ coinsListNameToShow !== 'favourite' ? true : false }
            />
            FAVORITES
          </button>
          <button
            className={ `coin-search-window__filter-button ${coinsListNameToShow === 'all' ? claszzActive : ''}` }
            onClick={ () => toggleListOfCoinsName('all') }
          >
            ALL COINS
          </button>


        </div>
      </div>

      <div className='coin-search-window__window-with-coins' onScroll={ (e) => {
        const clinetHeigth = document.querySelector('.coin-search-window__window-with-coins').clientHeight;
        if (e.target.scrollHeight - clinetHeigth - e.target.scrollTop < 100) {
          setShowMoreCoins(true)
        }


      } }>
        { !error.status && loading === 'loadEnd' && coinsListNameToShow === 'all' ?
          <AllCoins
            showMoreCoins={ showMoreCoins }
            setShowMoreCoins={ setShowMoreCoins }
            getCoins={ getCoins }
            setCoin={ changeFavouriteStateOfCoin }
            resetOffset={ resetOffset }
            setsFromInput={ inputText }
          />
          :
          null
        }
        { !error.status && loading === 'loadEnd' && coinsListNameToShow === 'favourite' ?
          <FavouriteCoins
            setCoin={ changeFavouriteStateOfCoin }
            setsFromInput={ inputText }
            getFavouriteCoins={ getFavouriteCoins }
          />
          :
          null
        }

        { loading === 'loading' ? 'loading....' : null }
      </div>

    </div>
  )
}

