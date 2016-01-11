import {expect} from 'chai';
import {List,Map} from 'immutable';

describe('immutability', () => {

  describe('A Number', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);
      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });


  describe('A List', () => {

    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    function addMovieNotImmutable(currentState, movie) {
      currentState.push(movie);
      return currentState;
    }

    it('is immutable', () => {
      let state = List.of('Trainspotting', '28 Days Later');
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(List.of(
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ));

      expect(state).to.equal(List.of(
        'Trainspotting',
        '28 Days Later'
      ));
    });

    it('is not immutable', () => {
      let state = ['Trainspotting', '28 Days Later'];
      let nextState = addMovieNotImmutable(state, 'Sunshine');
      expect(nextState).to.deep.equal([
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ]);

      expect(state).to.deep.equal([
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ]);
    });

  });


  describe('A Tree', () => {

    function addMovie(currentState, movie) {
      return currentState.set(
        'movies',
        currentState.get('movies').push(movie)
      );
    }

    function addMovieByUpdate(currentState, movie) {
      return currentState.update('movies', movies => movies.push(movie));
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Trainspotting', '28 Days Later')
      });

      let nextState = addMovie(state, 'Sunshine');
      expect(nextState).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later',
          'Sunshine'
        )
      }));

      expect(state).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later'
        )
      }));
    });

    it('is immutable by update', () => {
      let state = Map({
        movies: List.of('Trainspotting', '28 Days Later')
      });

      let nextStateByUpdate = addMovieByUpdate(state, 'Sunshine');

      expect(nextStateByUpdate).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later',
          'Sunshine'
        )
      }));


      expect(state).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later'
        )
      }));
    });

  });
});