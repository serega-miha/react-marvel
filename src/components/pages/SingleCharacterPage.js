import './SingleComicPage';
import xMen from '../../resources/img/x-men.png';
import { useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { useParams, Link } from 'react-router-dom/cjs/react-router-dom.min';


const SingleCharacterPage = () => {
    const {characterId} = useParams();
    console.log(characterId);

    const [characterData, setCharacterData] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        console.log('я загрузил данные');
        updateCharacter()
        
    }, [characterId])

    const updateCharacter = () => {
  
        clearError();
        getCharacter(characterId)
            .then(onCharacterLoaded)
        
    }
    const onCharacterLoaded = (character) => {

        setCharacterData(character);
       

    }
   


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    const content = !(loading || error || !characterData) ?  <View character = {characterData}/> : null;
    return (
        <>
    
        {errorMessage}
        {spinner}
        {content}
        
        </>
    )
}

const View = ({character}) => {
    const {name, description, thumbnail} = character;

    let history = useHistory();

    return (
        <div className="single-comic">
            
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
               
            </div>
            <Link to='/' className="single-comic__back" onClick={history.goBack}>Back to all</Link>
        </div>
    )
}

export default SingleCharacterPage;