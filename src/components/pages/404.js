
import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


const Page404 = () => {
    let history = useHistory();

    return(
        <div>
            <ErrorMessage/>
            <h2>Страница не найдена</h2>
            <Link to='/' onClick={history.goBack}>
            Вернуться назад
            </Link>
        </div>
    )
}

export default Page404;