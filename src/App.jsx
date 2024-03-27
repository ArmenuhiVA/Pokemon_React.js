import { useState, useEffect, useRef } from 'react'
import { Accordion } from './Components/Accordion';
import { Pagination } from './Components/Button';
import { Input } from './Components/Input';
import Loader from './Components/Loading/Loader';
import './App.css'


function App() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState('');
  const [filteredNames, setFilteredNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const refResult = useRef(null)
  
  useEffect(() => {
    let ignore = false;

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${currentPage*20}&limit=20`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        if (!ignore) {
          setCharacters(json.results);
          setLoading(false)

        }
      })
      .catch(error => console.error('Error fetching data:', error));
      setLoading(false)
      return () => {
        ignore = true;
      };
    
  }, [currentPage]);
  
 useEffect (() => {
  const filtered = characters.filter(char => char.name.toLowerCase().includes(value.toLowerCase()));
  setFilteredNames(filtered)
 }, [characters, value])

console.log(filteredNames)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setLoading(true);
  }


  return (
  <div className="App">
    <p>Search:</p>
      <Input
      type="text"
      onChange={e => setValue(e.target.value)}
      />
      <h1>Pokemons names</h1>
      {
        loading ? (
          <Loader/>
        ) : 
        <>
          {filteredNames.map((res, i) => (
            <Accordion key={i} id={i} title={res.name} url={res.url} />
          ))}
          {filteredNames.length === 0 && <p>No results found.</p>}
        </>
      }
    
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  )
}

export default App
