import FuzzySearch from "fuzzy-search";
export default function CreateCoinsList(coins) {
    const coinsList = coins.length ? coins.map(createCoin) : [];
    let favouriteCoins = [];
    let offset = 0;
    const searcher = new FuzzySearch(coinsList, ['coinName'], { sort: true });

    function createCoin(el, ind) {
        return {coinName: el, favouriteState: false, id:ind}
    }
    function getCoins(searchSettings = '') {
        if (coinsList.length && typeof searchSettings === "string") {
            if (searchSettings !== '') {
                offset = 0;
                return searcher.search(searchSettings)
                // тут я думаю нужно создать объект с фильтрованными по строке масивом и внутри создать офсет
                // и каждый раз когда будет запускаться эта функция а офсет === сеттингс то у меня слайсится
                // фильтрованный масив с увеличениме счетчика пока не дойдем до конца 
            }
            offset += 50;
            return offset > coinsList.length ? coinsList : coinsList.slice(0 , offset)
        }
        return coinsList
    }

    function changeFavouriteStateOfCoin(coin) {
        coin.favouriteState = !coin.favouriteState;
        if (coin.favouriteState) {
            favouriteCoins = [...favouriteCoins];
            favouriteCoins.push(coin)
            return;
        }
        favouriteCoins = favouriteCoins.filter((el) => el !== coin)
        
    }
    function getFavouriteCoins(searchSettings = '') {
        if (favouriteCoins.length && typeof settingsForSearch === "string") {
            const settingsForSearch = searchSettings.trim();
            if (settingsForSearch !== '') {
                const searcher = new FuzzySearch(favouriteCoins,['coinName'],{sort: true})
                return searcher.search(settingsForSearch)
            }
            // offset += 50;
            // return offset > coinsList.length ? coinsList : coinsList.slice(0 , offset)
        }
        return favouriteCoins
    }
    return {
        getCoins,
        getFavouriteCoins,
        changeFavouriteStateOfCoin
    }
}