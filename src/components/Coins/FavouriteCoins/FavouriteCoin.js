import React, { useState } from "react";
// coinName: el, favouriteState: false, id:ind
export default function FavouriteCoin({ coinName, setCoin, coin }) {
    // console.log(updateCoinsList)
    const [showFavouriteElement, setShowFavouriteElement] = useState(true);
    function changeStateToggle() {
        setShowFavouriteElement(false);
        setCoin(coin)
        console.log('wrok')
        
    }
    return showFavouriteElement ? (
        <div
            className="coin"
            onClick={ changeStateToggle }
        >
            <span>{ coinName }</span>

            <span>{ 'favourite' }</span>
        </div>
    )
        :
        null;
}