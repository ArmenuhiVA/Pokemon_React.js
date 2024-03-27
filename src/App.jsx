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
  
 const names = characters.map(char => char.name);
 


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setLoading(true);
  }

  refResult.current = names.filter(name => name.toLowerCase().includes(value.toLowerCase()))

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
        (
          refResult.current.map((res, i) => 
              <Accordion
              key = {i}
              id = {i+1}
              title={res}
              url={characters[i].url}
            />
          )
        )
      }
    
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  )
}

export default App
