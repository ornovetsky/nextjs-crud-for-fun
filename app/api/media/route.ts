
type MediaType = 'movie' | 'tv-show' | 'game' | string;

interface Media {
    id: number;
    title: string;
    type: MediaType;
    genre: string;
    releaseYear: number;
    rating: number;
}

const mediaList = [
    { id: 1, title: 'Inception', type: 'movie', genre: 'Sci-Fi', releaseYear: 2010, rating: 9 },
    { id: 2, title: 'Breaking Bad', type: 'tv-show', genre: 'Drama', releaseYear: 2008, rating: 10 },
    { id: 3, title: 'The Witcher 3', type: 'game', genre: 'RPG', releaseYear: 2015, rating: 9.5 },
    { id: 4, title: 'Monsieur Spade', type: 'tv-show', genre: 'Mystery', releaseYear: 2024, rating: 8.5 },
    { id: 5, title: 'Feud: Capote vs. The Swans', type: 'tv-show', genre: 'Drama', releaseYear: 2024, rating: 8 },
    { id: 6, title: 'Palm Royale', type: 'tv-show', genre: 'Comedy', releaseYear: 2024, rating: 7.5 },
    { id: 7, title: 'The New Look', type: 'tv-show', genre: 'Biography', releaseYear: 2024, rating: 8.3 },
    { id: 8, title: 'A Shop for Killers', type: 'tv-show', genre: 'Action', releaseYear: 2024, rating: 8.4 },
    { id: 9, title: 'The Penguin', type: 'tv-show', genre: 'Crime', releaseYear: 2024, rating: 9 },
    { id: 10, title: 'Ted', type: 'tv-show', genre: 'Comedy', releaseYear: 2024, rating: 7 },
    { id: 11, title: 'Daredevil: Born Again', type: 'tv-show', genre: 'Action', releaseYear: 2024, rating: 8.2 },
    { id: 12, title: 'Avatar: The Last Airbender', type: 'tv-show', genre: 'Fantasy', releaseYear: 2024, rating: 9.1 },
    { id: 13, title: 'The Regime', type: 'tv-show', genre: 'Drama', releaseYear: 2024, rating: 8.7 },
    { id: 14, title: 'Griselda', type: 'tv-show', genre: 'Biography', releaseYear: 2024, rating: 8.5 },
    { id: 15, title: 'The Sympathizer', type: 'tv-show', genre: 'Thriller', releaseYear: 2024, rating: 8.6 }
];


export async function GET() {
    return Response.json({ mediaList })
}