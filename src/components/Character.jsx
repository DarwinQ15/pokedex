import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pagination, PaginationItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import { setIsLoading } from '../store/slices/isLoading.slice';

const Character = () => {

    const name = useSelector((state)=> state.userName)

    const navigate = useNavigate();

    const [characterList, setCharactersList] = useState([])

    const [pokemonName, setPokemonName] = useState([])

    const [nameInput, setNameInput] = useState('')

    const dispath = useDispatch();

    useEffect(()=>{
        dispath(setIsLoading(true))
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1155/')
        .then(res=> setCharactersList(res.data.results))

        axios.get('https://pokeapi.co/api/v2/type/')
        .then(res=> setPokemonName(res.data.results))
        .finally(()=>{
            setTimeout(()=> {
                dispath(setIsLoading(false))
            }, 1000)
        })},[])
    // console.log(characterList);

    // console.log(pokemonName);


    const searchName=()=>{
        dispath(setIsLoading(true))
        navigate(`/characterDetail/${nameInput}`)
        setTimeout(()=>{
            dispath(setIsLoading(false))
        }, 500)
    }


    const searchUrl = (pokemonUrl)=>{
        dispath(setIsLoading(true))
        axios.get(pokemonUrl)
        .then(res => setCharactersList(res.data.pokemon.map(pokemon=> pokemon.pokemon)))
        .finally(()=>{
            setTimeout(()=> {
                dispath(setIsLoading(false))
            }, 500)
        })
    }

    const [page, setPage] = useState(1);
    const charactersPerPage = 22;
    const lastCharacterIndex = page * charactersPerPage; //15;
    const firstCharacterIndex = lastCharacterIndex - charactersPerPage; // 10
    const charactersPaginated = characterList.slice(
      firstCharacterIndex,
      lastCharacterIndex
    );
    const totalPages = Math.ceil(characterList.length / charactersPerPage);
    const pagesNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesNumbers.push(i);
    }
    

    return (
        <div className='container'>
            <div className='right-pagination'>
                <Link to={'/'}>
                    <i className='bx bx-log-out'></i>
                </Link>
            </div>
            <h2>Welcome to the <img src="https://img.icons8.com/fluency/48/000000/pokeball.png"/><strong style={{color:'rgb(231, 106, 106)'}}>pokedex</strong> <strong style={{color: 'rgb(68, 238, 139)'}}>{name}</strong></h2>
            <div>
                <div className='inputs'>
                    <input type="text" placeholder='search by name' value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                    <button type='submit' className='bnt-search' onClick={searchName}><i class='bx bx-search-alt-2'></i></button>
                </div>
                    <select onChange={e => searchUrl(e.target.value)} name="" id="">
                        <option value={pokemonName}>All pokemon</option>
                        {pokemonName.map(pokemon =>(
                            <option key={pokemon.name} value={pokemon.url}>{pokemon.name}</option>
                        ))}
                    </select>
            </div>
            <ul className='character-container'>
                {charactersPaginated.map((character) => (
                        <CharacterCard url={character.url ? character.url : character} key={character.url ? character.url : character} />     
                ))}
            </ul>
            <div className='btn-page'>
                <Pagination
                    renderItem={item => (<PaginationItem {...item} />)}
                    onChange={(e, number)=> setPage(number)}
                    defaultPage={1}
                    page={page ?? 1}
                    count={ pagesNumbers.length || 1}
                    shape="rounded" 
                />
            </div>
       </div>
    );
};

export default Character;