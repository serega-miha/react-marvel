import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(18180);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
 


    const {getAllComics, loading, error } = useMarvelService();

    useEffect(() => {

        onRequest(offset, true);
     }, [])

    const onRequest = (offset, initial) => {
       
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset, true)
            .then(onCcomicsListLoaded)
    }

    const onCcomicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList < 8) {
            ended = true;
        }
        setComicsList(comicsList =>[...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
       }

    const oncomicsChoose = (w) => {
        console.log(w);
    }


    function renderItems (arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
          
                <li
                    key={item.id}
                    className="comics__item"
                    onClick={() => {
                        // oncomicsChoose(item.id);
                        // props.onComicsSelected(item.id);
                        // focusOnItem(i);
                    }}
                    >
                    <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

 



    return (
        <div className="comics__list">
                    {errorMessage}
                    {spinner}
                    {items}
                <button 
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}
                className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
  
    )

   
}

export default ComicsList;