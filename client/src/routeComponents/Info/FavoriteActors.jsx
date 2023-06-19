import ActorCollection from "../../collectionComponents/actors/ActorCollection";
import {useLogin} from '../../hooks/useLogin';
import { getFavoriteActors, getActorByID } from "../../script";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { loadTheme } from "../../theme/loadTheme";



const FavoriteActors = () =>{
    const {username} = useLogin();
    const [actorList, setactorList] = useState([]);
    let isSet = false;
    const {isDarkMode} = useTheme();

    useEffect(() => {getFavorites()}, [isSet]);

    function runTheme(){
        loadTheme(isDarkMode);
    }

    async function getFavorites(){
        const data = await getFavoriteActors(username);
        if(data.fetched === 'false'){
            alert("Could not fetch favorite actors");
        }
        else{
            let actorList = [];
            for(let i = 0; i < data.favorite_actors.length; i++){
                let actor = await getActorByID(data.favorite_actors[i]);
                actorList.push(actor);
            }
            setactorList(actorList);
            isSet = true;
        }
    }


    return(
        <>
            <div onLoad = {runTheme}>
            <ActorCollection actorList = {actorList}/> 
            </div>
        </>
    )
}

export default FavoriteActors;