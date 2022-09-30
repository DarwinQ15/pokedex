import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/character.css'
import ValidateColor from './ValideteColor';



const CharacterCard = ({url}) => {
    const [character, setCharacter]= useState({})

    document.body.style = `background: ${'rgb(253, 253, 253)'}`;

    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(url)
        .then(res=> setCharacter({
            name: res.data.name,
            id: res.data.id,
            image: `https://cdn.traction.one/pokedex/pokemon/${res.data.id}.png`,
            type: res.data.types[0].type.name,
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
            speed: res.data.stats[5].base_stat,
            moves: res.data.moves
        }))
    },[url, character.type])

    

    // console.log(character);

    return (
        <li className='character-item' onClick={()=> navigate(`/characterDetail/${character.id}`)}>
                <div className={'character-card'} style={{background: ValidateColor(character.type)}}>
                    <div className='character-card-info'>
                        <h3 className='title-card-pokemon'>{character.name}</h3>
                        <div>
                            <div className='info-pkemon-card'>
                                <b>Types: </b>
                                <span>{character.type}</span> 
                            </div>
                        </div>
                        <div>
                            <div className='info-pkemon-card'>
                                <b>Hp: </b>
                                <span>{character.hp}</span> 
                            </div>
                        </div>
                        <div>
                            <div className='info-pkemon-card'>
                                <b>attack: </b>
                                <span>{character.attack}</span> 
                            </div>
                        </div>
                        <div>
                            <div className='info-pkemon-card'>
                                <b>Speed: </b>
                                <span>{character.speed}</span> 
                            </div>
                        </div>
                        <div>
                            <div className='info-pkemon-card'>
                                <b>Defense: </b>
                                <span>{character.defense}</span> 
                            </div>
                        </div>
                    </div>
                    <div className='img-pokemon-card'>
                        <img src={character.image} alt="" />
                    </div>
                </div>
        </li>
    );
};

export default CharacterCard;