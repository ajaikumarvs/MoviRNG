import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

type Movie = {
  title: string;
  overview: string;
};

export default function HomeScreen() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getRandomMovie = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY');
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomMovie();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        movie && (
          <View>
            <Text style={styles.title}>{movie.title}</Text>
            <Text>{movie.overview}</Text>
            <Button title="Suggest Another Movie" onPress={getRandomMovie} />
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
