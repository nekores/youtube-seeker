import Movie, { MovieType} from "./Movie";

export default async function MovieList() { 


    const data = await fetch( 
        `https://api.themoviedb.org/3/movie/popular?api_key=a20439771858bb128648170f3801c3c0`
        
    )
    const res = await data.json();
    console.log(res);
    return (
        <div> <h1>Movie Page</h1>
            {res.results.map( (movie:MovieType)  => <Movie {...movie}/>)}
        </div>
    )
}

