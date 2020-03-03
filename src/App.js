import React, { useEffect, useState } from 'react';
import { Recipe } from './Components/Recipe'
import { SearchBox } from './Components/SearchBox';
import { SearchFilter } from './Components/SearchFilter';
import './App.css';

const App = () => {
  const APP_ID = '3b366552';
  const APP_KEY = '4cf53df6728576e2131ef66f5641ca56';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
    };
    getRecipes();
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  };

  const filterLogic = e => {
    e.target.classList.toggle('active-filter');
    const li = e.target;
    if (li.classList.contains('active-filter')) {
      setQuery(li.innerText);
    } else {
      setQuery('');
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">Flavorful Food Formulas</h1>
        <form onSubmit={getSearch} className="search-form">
          <SearchBox updateSearch={updateSearch} placeholder="Search Formula" />
        </form>
        <div className="search-filter">
          <SearchFilter filterLogic={filterLogic} />
        </div>
      </header>
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <Recipe
            key={index}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
