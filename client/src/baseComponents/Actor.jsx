/*
Component that displays the actor's image, name and role.


1.1 - navigate Route changed

@author Lucas Liang
@version 1.1
@since 19 June 2023
*/ 

import '../collectionComponents/actors/ActorCollection.css'
import {useNavigate} from 'react-router-dom';
const Actor = ({actor}) => {
    
    const navigate = useNavigate();
    function handleClick(event){
        let name = event.target.id;
        // pass the actor name as a parameter
        navigate(`/info/Actor/${name}`);
    }
    
        
    return(
        <div className = "Actor">
            <img className = "ActorPoster" id = {actor.name} onClick = {handleClick}
            src = {actor.poster_path !== null ?
                `https://image.tmdb.org/t/p/w500/${actor.profile_path}`:
                    'https://via.placeholder.com/400'}
            alt = {actor.title}
            />
            <h2>{actor.character}</h2>
            <p>{actor.name}</p>
        </div>
    );
}


export default Actor;