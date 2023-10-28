


import { useHttp } from "../components/hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();


    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=09e4e57126aac9b7cc3ea0f3d6f1dd5e';
    const descriptionFalse = 'Нет описания данного героя';
    const _baseOffset = 210;
    const _offsetComics = 18180;


    // getResource = async (url) => {
    //     let res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Проблем ${url}, статус ${res.status}`)
    //     }
    //     return await res.json();
    // }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        // console.log(res.data.results.map(_transformCharacter));
        return res.data.results.map(_transformCharacter);
    }


    const getAllComics = async (offset = _offsetComics) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        // console.log(res.data.results);
        return res.data.results.map(_transformComics);
    }


    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        // console.log(_transformComics(res.data.results[0]));
        return _transformComics(res.data.results[0]);
    }

    const getCharacter = async (id) => {
        
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        // console.log(_transformCharacter(res.data.results[0]));
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterName = async (name) => {
        
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        if (res.data.results[0]){
            console.log('есть персонаж');
            
            return _transformCharacter(res.data.results[0])
        } else {
            console.log('нет персонажа');
            return null;
        }
        // return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description.length < 1 ? descriptionFalse : char.description.substring(0, 210) + '...',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
            

           
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            // name: char.name,
            description: comics.description || 'Нет описания данного комикса',
            // description: comics.description.length < 1 ? descriptionFalse : comics.description.substring(0, 220) + '...',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            // homepage: char.urls[0].url,
            // wiki: char.urls[1].url,
            pageCount: comics.pageCount,
            title: comics.title,
            price: comics.prices[0].price,
            language: comics.textObjects.language || 'en-us',

        }
    }

    return {loading, error,clearError, getAllCharacters, getCharacter, getAllComics, getComics,getCharacterName}

};


export default useMarvelService;