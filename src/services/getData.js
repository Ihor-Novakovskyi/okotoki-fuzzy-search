
export default function useRequestCoins({url, statesSettings : {setCoinsList, setError, setLoading}}) {
    return async function getData () {
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`Could not fetch ${url}, status ${resp.status}`);
            }
            const coinsList = await resp.json();
            setCoinsList(coinsList)
            setLoading('loadEnd');



        } catch (error) {
            setLoading('loadEnd');
            setError({ status: true, errorInfo: error })
        }
    }

}