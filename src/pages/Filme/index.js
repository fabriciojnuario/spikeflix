import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../service/api";
import './movie-info.css'
function Filme(){

    const { id } = useParams();
    const navigate = useNavigate();
    const [movie,setMovie] = useState({});
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        async function loadMovie(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"d8207577d5790df318a627a14067bcac",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setMovie(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Content not found.");
                navigate("/", { replace: true});
            })
        }

        loadMovie();

        return () => {
            console.log("Component destroyed.");
        }
    },[navigate, id])

    function save_movie(){
        const my_list = localStorage.getItem("@spikeflix");
        let saved_movies = JSON.parse(my_list) || [];

        const has_movie = saved_movies.some((saved_movies) => saved_movies.id === movie.id);

        if(has_movie){
            toast.warn("Este filme ja consta na sua lista!")
            return;
        }

        saved_movies.push(movie);
        localStorage.setItem("@spikeflix", JSON.stringify(saved_movies));
        toast.success("Filme salvo com sucesso!");

    }

    if(loading){
        return(
            <div className="movie-info">
                <h1>Loading movie details...</h1>
            </div>
        )
    }

    return(
        <div className="movie-info">
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
            <h3>Sinopse:</h3>
            <span>{movie.overview}</span>
            <strong>rating: {movie.vote_average} / 10</strong>
            <div className="area-buttons">
                <button onClick={save_movie}>Favorite</button>
                <button>
                    <a  target="blank" rel="external"
                    href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;