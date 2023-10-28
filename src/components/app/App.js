
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";

import ComicsPage from '../pages/comicsPage/ComicsPage';
import MainPage from '../pages/mainPage/MainPage';
import Page404 from '../pages/404';

import SingleComicPage from '../pages/SingleComicPage';
import SingleCharacterPage from '../pages/SingleCharacterPage';

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path='/'>
                             <MainPage/>
                        </Route>
                        <Route exact path='/comics'>
                            <ComicsPage/>
                        </Route>
                        <Route exact path='/comics/:comicId'>
                            <SingleComicPage/>
                        </Route>
                        <Route exact path='/character/:characterId'>
                            <SingleCharacterPage/>
                        </Route>
                        <Route path='*'>
                            <Page404/>
                        </Route>
                    </Switch>
                    {/* <SingleComic
                    comicsId = {selectedComics}
                    /> */}
                </main>
            </div>

        </Router>
    )
}

export default App;