import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../pages/Home.css'

export enum SearchType {
    all = '',
    movie = 'movie',
    series = 'series',
    episode = 'episode',
}

export interface SearchResult {
    Title: string;
    Year: string;
    Poster: string;
    imdbID: string;
    Type: string;
    imdbRating: string;
    Plot: string;
    Director: string;
    Actors: string;
    Website: string;
    Awards: string;
}

export interface SearchError {
    Response: string;
    Error: string;
}

export interface DetailsResult {
    Genre: string;
    Title: string;
    Year: string;
    Poster: string;
    imdbRating: string;
    Plot: string;
    Director: string;
    Actors: string;
    Website: string;
    Awards: string;
}

export const useApi = () => {
    let url = 'https://www.omdbapi.com/';
    let apiKey = 'b96ccaca';

    // Search API
    const searchData = async (title: string, type: SearchType): Promise<any> => {
        const result = await fetch(
            `${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`,
        );
        return result.json();
    };

    // Get details for a specific item (movie, series, etc.)
    const getDetails = async (id: string): Promise<SearchResult> => {
        const result = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`);
        const data = await result.json();
        return data;  // Ensure you're returning a single SearchResult object
    };

    return {
        searchData,
        getDetails,
    };
};

export default useApi;
