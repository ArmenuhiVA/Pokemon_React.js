import React, { useState, useRef } from 'react'
import './Accordion.css'

function Accordion(props) {
    const [active, setActive] = useState(false);
    const [pokemonDetails, setPokemonDetails] = useState(null)
    const content = useRef(null);
    const [height, setHeight] = useState('0px');
    console.log(content)

    async function toggleAccordion(){
        setActive(!active);
        setHeight(active ? '0px' : `${content.current.scrollHeight}px`);

        if(active) {
          console.log(active)
          setPokemonDetails(null);
        }else {
          try{
            const response = await fetch(props.url);
            const data =await response.json();
            setPokemonDetails(data)
          }catch(error){
            console.error('Error fetching pokemon details:', error);
          }
        }
    }

    {pokemonDetails && console.log(pokemonDetails.sprites.other.dream_world.front_default)}
  return (
      <div className="App">
        <div className='accordion__section'>
          <div 
            className={`accordion ${active ? "active" : ""}`}
            onClick={toggleAccordion}
          >
            <p className="accordion__title">{props.title}</p>
            <span style={{ marginLeft: "20px" }}>{active ? "-" : "+"}</span>
          </div>
          <div
          ref={content}
          style={{ maxHeight: `${height}` }}
          className="accordion__content"
          >
          <div
            className="accordion__text"
            // dangerouslySetInnerHTML={{ __html: props.content }}
          >
          {pokemonDetails && (
            <div className='img_container'>
              <img src={pokemonDetails.sprites.other.dream_world.front_default} alt="Pokemon Sprite" />
              <p>Stats: {JSON.stringify(pokemonDetails.stats)}</p>
              <p>Types: {JSON.stringify(pokemonDetails.types)}</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
