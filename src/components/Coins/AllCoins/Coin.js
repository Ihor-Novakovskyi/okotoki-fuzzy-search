import React, { useState } from "react";
// coinName: el, favouriteState: false, id:ind
export default function Coin({ coinName, favouriteState, setCoin, getFavouriteCoins, coin, updateCoinsList }) {
    // console.log(updateCoinsList)
    const [favouriteStateValue, setFavoriteStateValue] = useState(favouriteState);
    const [listWasUpdatedByThisElement, setListWasUpdatedByThisElement] = useState(false);
    function changeStateToggle() {
        setFavoriteStateValue(!favouriteStateValue);
        setCoin(coin)
        console.log('wrok')
        console.log('getFavoritecoins',getFavouriteCoins())
    }
    return (
        <div
            className="coin"
            onClick={ changeStateToggle }
            onMouseEnter={ !listWasUpdatedByThisElement && !!updateCoinsList ? () => {
                setListWasUpdatedByThisElement(true)
                updateCoinsList()
            }: null}
        >
            <span>{ coinName }</span>

            <span>{favouriteStateValue ? 'favourite' : 'notFavourite'}</span>
        </div>
    )
}