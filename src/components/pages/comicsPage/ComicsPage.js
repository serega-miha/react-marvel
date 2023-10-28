import { useState } from "react";
import { Helmet } from 'react-helmet';
import ComicsList from '../../comicsList/ComicsList'

import AppBanner from '../../appBanner/AppBanner';



const ComicsPage = ()=>{

    // const [selectedComics, setSelectedComics] = useState(18190);

    // const onComicsSelected = (id) => {
    //     // setSelectedComics(id);
        
    // }

    return (
        <>
         <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Comics Page</title>
            </Helmet>
         <AppBanner/>
        <ComicsList
            // onComicsSelected={onComicsSelected}
        />
        </>

    )
}

export default ComicsPage;