import SearchTermContainer from "./SearchTermContainer";
import Sidebar from "../../baseComponents/sidebar/Sidebar";
import Header from "../../baseComponents/header/Header";



const Home = () =>{
    return(
        <>
        <Sidebar />
        <div id = 'Container'>
            <div id = 'ContainerScroll'>
        <Header/>
            <SearchTermContainer /> 
            </div>
        </div>
        </>
    )
}

export default Home;
