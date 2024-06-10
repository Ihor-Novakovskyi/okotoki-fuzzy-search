import React, { useState } from "react";
import Star from "../AllCoins/star";
// coinName: el, favouriteState: false, id:ind
export default function FavouriteCoin({ coinName, setCoin, coin }) {
    const [showFavouriteElement, setShowFavouriteElement] = useState(true);
    function changeStateToggle() {
        setShowFavouriteElement(false);
        setCoin(coin)
    }
    return showFavouriteElement ? (
        <div
            className="coin-search-window__coin 'coin-search-window__coin--favourite'"
            onClick={ changeStateToggle }
        >
            <Star setWhiteBackground={ showFavouriteElement } />
            <span
                className="coin-search-window__coin-name">
                { coinName }
            </span>
        </div>
    )
        :
        null;
}