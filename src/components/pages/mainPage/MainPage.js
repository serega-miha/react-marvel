import { useState } from "react";
import { Helmet } from 'react-helmet';

import RandomChar from "../../randomChar/RandomChar";
import CharList from "../../charList/CharList";
import CharInfo from "../../charInfo/CharInfo";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

import decoration from '../../../resources/img/vision.png';
import SearchPerson from "../../searchPerson/SearchPerson";


const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);
    const [selectedCharacter, setSeletcedCharacter] = useState(null)



    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    const onCharacterSelected = (id) => {
        setSeletcedCharacter(id);
        console.log(`я помиенял selectedCharacter`);
    }



    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <RandomChar />
            <div className="char__content">
                <CharList
                    onCharSelected={onCharSelected} />
                <ErrorBoundary>
                    <div>
                        <CharInfo
                            charId={selectedChar} />
                        <SearchPerson
                            onCharacterSelected={onCharacterSelected}
                        />
                    </div>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;