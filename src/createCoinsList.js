import FuzzySearch from "fuzzy-search";
export default function CreateCoinsList(coins) {
    const offSet = 50;
    const allCoins = {
        coinsList: coins.length ? coins.map(createCoin) : [],
        offSetCoins:0,
    }
    const filterCoins = {
        filterListOfCoins: [],
        filterSettings: '',
        offsetFilterCoins: 0
    }
    let favouriteCoins = [];
    function resetOffset(action) {
        switch (action) {
            case 'resetAll':
                allCoins.offSetCoins = 0;
                filterCoins.offsetFilterCoins = 0;
                return
            case 'allCoins':
               allCoins.offSetCoins = 0;
                return
            case 'filterCoins':
                filterCoins.offsetFilterCoins = 0;
                return
        }
    }
    const searcher = new FuzzySearch(allCoins.coinsList, ['coinName'], { sort: true });

    function createCoin(el, ind) {
        return {coinName: el, favouriteState: false, id:ind}
    }
    function getFilterCoins(settingsForSearch) {
        // let { filterListOfCoins, filterSettings, offsetFilterCoins } = filterCoins;
        // allCoins.offSetCoins = 0;// сбрсываем офсеты нефильтрованого списка всех монет 
        resetOffset('allCoins')
        if (settingsForSearch === filterCoins.filterSettings) {
            console.log("before updatefilterCoins.offsetFilterCoins", filterCoins.offsetFilterCoins)
            filterCoins.offsetFilterCoins += offSet;
            console.log("afterupdate filterCoins.offsetFilterCoins", filterCoins.offsetFilterCoins)
            return filterCoins.offsetFilterCoins >= filterCoins.filterListOfCoins.length ?
                filterCoins.filterListOfCoins
                :
                filterCoins.filterListOfCoins.slice(0, filterCoins.offsetFilterCoins)
        }
        //нижний блок кода віполняется только в самом начале момента фильтрации
        // создаеется фильтрованный список со всеми монетами которые соответсвуют фильтрации
        console.log('its work first time', settingsForSearch)
        // filterCoins.offsetFilterCoins = 0;
        resetOffset('filterCoins')
        filterCoins.offsetFilterCoins += offSet;
        console.log('offset', filterCoins.offsetFilterCoins)
        filterCoins.filterSettings = settingsForSearch;
        filterCoins.filterListOfCoins = searcher.search(settingsForSearch);
        console.log(filterCoins.filterListOfCoins)

        return filterCoins.offsetFilterCoins >= filterCoins.filterListOfCoins.length ?
            filterCoins.filterListOfCoins
            :
            filterCoins.filterListOfCoins.slice(0, filterCoins.offsetFilterCoins)
        // тут я думаю нужно создать объект с фильтрованными по строке масивом и внутри создать офсет
        // и каждый раз когда будет запускаться эта функция а офсет === сеттингс то у меня слайсится
        // фильтрованный масив с увеличениме счетчика пока не дойдем до конца 
    
        

    }
    function getCoins(searchSettings = '') {
        let { coinsList, offSetCoins } = allCoins;
        if (coinsList.length && typeof searchSettings === "string") {
            const settingsForSearch = searchSettings.trim();
            if (settingsForSearch !== '') {
                allCoins.offSetCoins = 0;
                return getFilterCoins(settingsForSearch);
            }
            filterCoins.offsetFilterCoins = 0;
            offSetCoins += 50;
            allCoins.offSetCoins = offSetCoins;
            return offSetCoins >= coinsList.length ? coinsList : coinsList.slice(0 , offSetCoins)
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
        console.log('setting',searchSettings)
        console.log(favouriteCoins)
        console.log('typeof', typeof searchSettings)
        console.log(favouriteCoins.length && typeof searchSettings === "string")
        if (favouriteCoins.length && typeof searchSettings === "string") {
            console.log('maybe there')
            const settingsForSearch = searchSettings.trim();
            if (settingsForSearch !== '') {
                console.log('work in getFavourite')
                const searcher = new FuzzySearch(favouriteCoins,['coinName'],{sort: true})
                return searcher.search(settingsForSearch)
            }

        }
        return favouriteCoins
    }
    return {
        getCoins,
        getFavouriteCoins,
        changeFavouriteStateOfCoin,
        resetOffset
    }
}