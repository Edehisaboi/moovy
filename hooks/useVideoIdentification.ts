import { useCallback, useState } from "react";
import { VideoResult } from "../types";

// Mock video identification API
const mockVideoDatabase = [
  {
    id: "1",
    title: "The Matrix",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    genre: "Sci-Fi, Action",
    description:
      "A computer programmer discovers a mysterious world of digital reality.",
    trailerUrl: "https://www.youtube.com/watch?v=m8e-FF8MsqU",
    imdbRating: 8.7,
    duration: "2h 16m",
  },
  {
    id: "2",
    title: "Inception",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    year: 2010,
    director: "Christopher Nolan",
    genre: "Sci-Fi, Thriller",
    description:
      "A thief who steals corporate secrets through dream-sharing technology.",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    imdbRating: 8.8,
    duration: "2h 28m",
  },
  {
    id: "3",
    title: "Interstellar",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    year: 2014,
    director: "Christopher Nolan",
    genre: "Sci-Fi, Drama",
    description: "A team of explorers travel through a wormhole in space.",
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw",
    imdbRating: 8.6,
    duration: "2h 49m",
  },
  {
    id: "4",
    title: "The Dark Knight",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    year: 2008,
    director: "Christopher Nolan",
    genre: "Action, Crime, Drama",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    imdbRating: 9.0,
    duration: "2h 32m",
  },
  {
    id: "5",
    title: "Pulp Fiction",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    year: 1994,
    director: "Quentin Tarantino",
    genre: "Crime, Drama",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine.",
    trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
    imdbRating: 8.9,
    duration: "2h 34m",
  },
];

export const useVideoIdentification = () => {
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [progress, setProgress] = useState(0);

  const identifyVideo = useCallback(
    async (
      videoData: any, // In real app, this would be the video file or frame data
      source: "camera" | "screen"
    ): Promise<VideoResult | null> => {
      setIsIdentifying(true);
      setProgress(0);

      try {
        // Simulate API call with progress updates
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + Math.random() * 15;
          });
        }, 500);

        // Simulate processing time
        await new Promise((resolve) =>
          setTimeout(resolve, 3000 + Math.random() * 2000)
        );

        clearInterval(progressInterval);
        setProgress(100);

        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          // Randomly select a video from the database
          const randomVideo =
            mockVideoDatabase[
              Math.floor(Math.random() * mockVideoDatabase.length)
            ];

          const result: VideoResult = {
            ...randomVideo,
            identifiedAt: new Date(),
            source,
          };

          return result;
        } else {
          // Simulate failure
          throw new Error("Video not found in database");
        }
      } catch (error) {
        console.error("Video identification failed:", error);
        return null;
      } finally {
        setIsIdentifying(false);
        setProgress(0);
      }
    },
    []
  );

  return {
    isIdentifying,
    progress,
    identifyVideo,
  };
};
