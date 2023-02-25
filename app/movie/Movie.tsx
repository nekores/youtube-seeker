import Link from "next/link";

export type MovieType = {
    id: string,
    title: string
    poster_path: string
}


export default function Movie( movie: MovieType ) {

    const imagePath="https://image.tmdb.org/t/p/original";
    return    <>
    <div>{movie.title} </div> <Link href={`/movie/${movie.id}`}> <img src={imagePath + movie.poster_path} alt="Movie Poster"/> </Link></>;
}