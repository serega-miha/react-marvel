import './SingleComicPage.scss';
import xMen from '../../resources/img/x-men.png';
import { useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom.min';


const SingleComicPage = () => {
    const {comicId} = useParams();
    console.log(comicId);

    const [comics, setComic] = useState(null);

    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        console.log('я загрузил комикс');
        updateComic()
        
    }, [comicId])

    const updateComic = () => {
  
        clearError();
        getComics(comicId)
            .then(onComicLoaded)
        
    }
    const onComicLoaded = (comics) => {
         setComic(comics);
       

    }
   


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    const content = !(loading || error || !comics) ?  <View comics = {comics}/> : null;
    return (
        <>
          
        {errorMessage}
        {spinner}
        {content}
        </>
    )
}

const View = ({comics}) => {
    const {title, description, thumbnail, price, pageCount, language} = comics;
    let history = useHistory();

    return (
        <>
        <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
            <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to='/comics' className="single-comic__back" onClick={history.goBack}>Back to all</Link>
        </div>
            </>
   
    )
}

export default SingleComicPage;