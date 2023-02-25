import {MovieType} from "../Movie";

type MovieDetailParamType = { 
    params: { 
        movie_id: string;
    };
}
export default function MovieDetail( {params} : MovieDetailParamType) {
    console.log('params', params);
    return <div> Movie Details  {params.movie_id} </div>
}