import React, { useState, Fragment } from "react";
import Coin from "./Coin";
// coinName,favouriteState,changeFavouriteStateOfCoin
export default function AllCoins({ getCoins, setCoin, setsFromInput = '',getFavouriteCoins }) {
    const [coins, updateListOfCoins] = useState(getCoins(setsFromInput));//это будет при скорле спиоск увелииваться
    const needUpdateCoinsList = coins.length % 50 === 0;
    console.log(needUpdateCoinsList)
    const coinsList = coins
        .map((coin, ind) => {
            const { coinName, favouriteState, id } = coin
            return (
                <Coin
                    updateCoinsList={ needUpdateCoinsList && coins.length - 10 === ind ?
                        () => updateListOfCoins(getCoins(setsFromInput))
                        :
                        null
                    }
                    coin={coin}
                    coinName={ coinName }
                    favouriteState={ favouriteState }
                    key={ id }
                    setCoin={ setCoin }
                    getFavouriteCoins={getFavouriteCoins}
                />
            )
        })
    return (
        <Fragment>
            {coinsList}
        </Fragment>
    )
}