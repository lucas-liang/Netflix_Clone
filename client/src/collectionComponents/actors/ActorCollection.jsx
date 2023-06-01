/*
Component that displays the collection of actors

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/


import './ActorCollection.css';
import Actor from '../../baseComponents/Actor.jsx';

const ActorCollection = ({actorList}) => {
    return(
        <div id = "ActorCollection">
            {actorList.map((actor,idx) => (
            <Actor actor = {actor} key = {actor.id} />
        )) }
        </div>
    );
}



export default ActorCollection;