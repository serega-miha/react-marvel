import { useFormik } from 'formik';
import * as Yup from 'yup'
import './searchPerson.scss';
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SearchPerson = (props) => {
    const [resPerson, setResPerson] = useState(``);
    const {getCharacterName} = useMarvelService();


    const getCharacterByName = (name) => {
        getCharacterName(name)
            .then(onGetCharacter)
       
    }
    
    const onGetCharacter = (data) => {
        console.log(data);
        if (data === null){
            setResPerson(<div className='error'>The character was not found. Check the name and try again</div>)
        } else{
            setResPerson(<div className='good'>There is! Visit  
            <Link to={`/character/${data.id}`}
             onClick={() => {console.log(`я нажал на  ${data.id}`)
                props.onCharacterSelected(data.id)
            }}
            >{data.name}</Link> page?</div>)
        }
    }

    const formik = useFormik({
        initialValues: {
            namePerson: ''
           
        },
        validationSchema: Yup.object({
            namePerson: Yup.string()
                  .min(2, 'Минимум 2 символа')
                  .required('This field is required'),
            
        }),
        onSubmit: values => getCharacterByName(values.namePerson)
        

    })
 


  

    return (
        <div className='search-panel-container'>
            <div className="search-panel__header">Or find a character by name:</div>
            <div className="search-panel__body">
                <form className='form__search-person' onSubmit={formik.handleSubmit}>
                    <input type="text"
                         name='namePerson'
                         id="namePerson"
                         placeholder='Enter name'
                         value={formik.values.namePerson}
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur} />
                    <button type="submit" className="button button__main">
                                <div className="inner">FIND</div>
                            </button>
                            
                </form>
                {formik.errors.namePerson && formik.touched.namePerson ? <div className='error'>{formik.errors.namePerson}</div> : null}              
                {resPerson && !formik.errors.namePerson  ? resPerson : null}
            </div>
        </div>
    )
}

export default SearchPerson;