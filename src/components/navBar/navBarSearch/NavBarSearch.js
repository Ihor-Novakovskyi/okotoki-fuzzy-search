// import CoinsSearchWindow from "./coinsSearchWindow/CoinsSearchWindow";
import React, {useState, useMemo, useEffect} from "react";
import CreateCoinsList from "./createCoinsList";
import CoinsSearchWindow from './coinsSearchWindow/CoinsSearchWindow';
import useRequestCoins from "../../services/getData";
import './NavBarSearch.css';

export default function NavBarSearch() {
    const [coins, setCoins] = useState([]);
    const [error, setError] = useState({ status: false, errorInfo: '' });
    const [loading, setLoading] = useState('loading');
    const [open, setOpen] = useState(false)
    const settingsHttp = {
      url: "https://api-eu.okotoki.com/coins",
      statesSettings: {
        setCoins,
        setError,
        setLoading
      }
    }
    const getDataRequest = useMemo(() => useRequestCoins(settingsHttp), []);
    const { getCoins, getFavouriteCoins, changeFavouriteStateOfCoin, resetOffset } = useMemo(() => CreateCoinsList(coins), [loading])
    useEffect(() => {
      getDataRequest();
      document.addEventListener('click', () => setOpen(false))
    }, [])
  function openCoinsSearchWindow(e) {
    e.stopPropagation();
        setOpen(!open)
    }
  !open ? resetOffset('resetAll') : void 0; 
    return (
        <div className="coin-nav-bar__search">
            <button
                onClick={openCoinsSearchWindow}
                className={`coin-nav-bar__search-button${open ? " coin-nav-bar__search-button--active" : ''}`}>

                SEARCH
            </button>
           {open ? <CoinsSearchWindow
                getCoins={ getCoins }
                getFavouriteCoins={ getFavouriteCoins }
                changeFavouriteStateOfCoin={ changeFavouriteStateOfCoin }
                resetOffset={ resetOffset }
                loading={ loading }
                error={error}
            />
            :
            null
            }
        </div>
    )
}