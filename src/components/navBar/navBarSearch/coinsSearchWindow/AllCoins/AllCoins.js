import React, { useState, Fragment, useEffect } from "react";
import Coin from "./Coin";

export default function AllCoins({ getCoins, setCoin, setsFromInput = '', showMoreCoins, setShowMoreCoins}) {
    const [coins, setShowCoins] = useState([]);
    console.log('render', coins, setsFromInput)
    useEffect(() => setShowCoins(getCoins(setsFromInput)), [setsFromInput])
    useEffect(() => {
        if (showMoreCoins) {
            setShowCoins(getCoins(setsFromInput))
            setShowMoreCoins(false)
        }
    },[showMoreCoins])
    const coinsList = coins.length ? coins
        .map((coin) => {
            const { coinName, favouriteState, id } = coin
            return (
                <Coin
                    coin={ coin }
                    coinName={ coinName }
                    favouriteState={ favouriteState }
                    key={ id }
                    setCoin={ setCoin }
                />
            )
        })
        :
        null;
    
    return (
        <Fragment >
            {coinsList}
        </Fragment>
    )
}