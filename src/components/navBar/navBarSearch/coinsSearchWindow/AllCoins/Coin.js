import React, { useState } from "react";
import Star from './star';
import './coin.css';

export default function Coin({ coinName, favouriteState, setCoin, getFavouriteCoins, coin, }) {
    const [favouriteStateValue, setFavoriteStateValue] = useState(favouriteState);
    function changeStateToggle() {
        setFavoriteStateValue(!favouriteStateValue);
        setCoin(coin)
        console.log('wrok')
        console.log('getFavoritecoins',getFavouriteCoins())
    }
    return (
        <div
            className={`coin-search-window__coin ${favouriteStateValue ? 'coin-search-window__coin--favourite' : ''}`}
            onClick={ changeStateToggle }
        >
            <Star setWhiteBackground={favouriteStateValue} />
            <span
                className="coin-search-window__coin-name">
                { coinName }
            </span>
        </div>
    )
}