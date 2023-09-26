import { useEffect, useState } from "react";
import api from "../../service/api";
import './home.css';
import { Link } from "react-router-dom";

function Home(){
    const [ movie, setMovie] = useState([]);
    const [ loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadMovies(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key:"d8207577d5790df318a627a14067bcac",
                    language: "pt-BR",
                    page: 1,
                }
            })

            //console.log(response.data.results.slice(0, 10));
            setMovie(response.data.results.slice(0, 10))
            setLoading(false);
        }

        loadMovies();

    }, [])

    if(loading){
        return(
            <div className="loading">
                <h2>Loading movies...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="movies-list">
                {
                    movie.map((movie) => {
                        return(
                            <article key={movie.id}>
                                <strong>{movie.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
                                <Link to={`/filme/${movie.id}`}>Access</Link>
                            </article>
                        )
                    })
                }
            </div>
            
        </div>
    )
}

export default Home;