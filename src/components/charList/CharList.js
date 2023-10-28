import { useState, useEffect, useRef} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import './charList.scss';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import { CSSTransition, Transition } from 'react-transition-group';


const CharList = (props) => {
    const [inProp, setInProp] = useState(false);//
    const duration = 1000;
    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    };
    
    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };







    const [charList, setCharList] = useState([]);

    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

 
    
     const {loading, error, getAllCharacters} = useMarvelService();

     //если вконце поставить пустой массив, то функция выполниться только один раз, при создании
     useEffect(() => {
        
        onRequest(offset, true);
        
        
     }, [])



    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            
       

    }



    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }
        setCharList(charList =>[...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
        setInProp(true)
        
    }


    const itemRefs = useRef([]);

   const focusOnItem = (id) => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
   }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
     function renderItems (arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
               
                 <li 
                    className="char__item"
                    tabIndex={0}
                    ref ={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}>

                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                       
                </li>
             
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
       
                {items}
             
            </ul>
        )
    }


       
        
        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading && !newItemLoading ? <Spinner/> : null;


        return (
            <div className="char__list">
                {errorMessage}
                {spinner}

                    <Transition
                        
                        in={inProp}
                        timeout={duration}
                    >
                        {(state) => (
                            <div
                               
                                style={{
                                    ...defaultStyle,
                                    ...transitionStyles[state],
                                }}
                            >
                                {items}
                            </div>
                        )}
                    </Transition>
                
                <button
                 className="button button__main button__long"
                 disabled={newItemLoading}
                 style={{'display': charEnded ? 'none' : 'block'}}
                 onClick={() => onRequest(offset)}
                 >
                    <div className="inner">load more</div>
                </button>
            </div>
        )

}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}


export default CharList;