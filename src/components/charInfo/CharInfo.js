import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);


  
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])




   const updateChar = () => {
        const {charId} = props;
        if (!charId){
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
        
    }

    const onCharLoaded = (char) => {
        console.log('char loaded');
        console.log(char);
        setChar(char);

    }



        const skeleton =  char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ?  <View char={char}/> : null;

        return (
            <div className="char__info">
               {skeleton}
               {errorMessage}
               {spinner}
               {content}
            </div>
        )
   
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let coverContain = "cover";
    if (thumbnail.includes("image_not_available")){
        coverContain = "contain";
    }

    return (
        <>
             <div className="char__basics">
                    <img src={thumbnail} alt={name} style={{"objectFit": coverContain}}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                   {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'not found comics'}
                    {
                        comics.map((item, i) => {
                            // eslint-disable-next-line
                            if (i > 9) return;
                            return (
                               <Link to={`/comics/${item.resourceURI.split('comics/')[1]}`} key={i} className="char__comics-item">
                                {item.name}
                                </Link>
                            )

                        })
                    }
                  
                   
                </ul>
        
        </>

    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;