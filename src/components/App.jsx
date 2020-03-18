import React from "react";
//import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../utils/api";
import MovieTabs from "./MovieTabs";
import MoviePage from "./MoviePage";

// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();
    console.log("constructor");
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      page: 1,
      total: 0,
    };
  }
  

  componentDidMount() {
    console.log("componentDidMount");
      this.getMovies();
    }

    componentDidUpdate(prevProps, prefState) {
      console.log("componentDidUpdate");
      if (prefState.sort_by !== this.state.sort_by || prefState.page !== this.state.page) {
        this.getMovies();
        
    }
    }

  getMovies = () => {
    
      fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`)
      .then(responce => responce.json())
      .then(data => this.setState({movies: data.results, total: data.total_pages}));
      
    }

  upDateSortBy = value => {
    return (
      this.setState({sort_by: value})
    )
  }

  getNextPage = () => {
     if (this.state.page === this.state.total) return "";
     return this.setState({page: this.state.page + 1});
     
  }  

  getPrevPage = () => {
    
    if (this.state.page === 1 ) return ""; 
    return this.setState({page: this.state.page - 1});
    
  }  

  deleteMovie = movie => {
    console.log(movie.id);
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    console.log(updateMovies);

    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  render() {
    console.log("render");
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
          <div className = "row mb-4">
          <div className = "col-12">
          <MovieTabs 
          sort_by = {this.state.sort_by} 
          upDateSortBy = {this.upDateSortBy}  
          />
          </div>
          </div>
            <div className="row">
              
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className = "row mb-4">
          <div className = "col-9">
            <MoviePage page={this.state.page} getNextPage = {this.getNextPage}  getPrevPage = {this.getPrevPage}
              total = {this.state.total}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
