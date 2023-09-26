import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './favoritos.css'
import { Link } from 'react-router-dom';

function Favoritos(){

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const my_list = localStorage.getItem("@spikeflix");
        setMovie(JSON.parse(my_list) || []);
    }, []);

    function delete_movie(id){
        let filter_movies = movie.filter( (item) => {
            return (item.id !== id)
        })
        setMovie(filter_movies);
        localStorage.setItem("@spikeflix", JSON.stringify(filter_movies))
        toast.success("Filme removido com sucesso!")
    }

    return(
        <div className='my_movies'>
            <h1>Meus filmes:</h1>

            {movie.length === 0 && <span>Você não possui filme salvo :( </span>}

            <ul>
                {movie.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>

                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => delete_movie(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;