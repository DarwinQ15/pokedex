import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/card-detail.css'
import { ProgressBar} from 'react-bootstrap';
import { Table } from 'semantic-ui-react';
import ValidateColor from './ValideteColor';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../store/slices/isLoading.slice';


const CharacterDetail = () => {

    const { id } = useParams()

    const [character, setCharacter] = useState()

    const dispath = useDispatch();

    const upperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);


    useEffect(() => {
        dispath(setIsLoading(true))
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => setCharacter({
                name: res.data.name,
                id: res.data.id,
                image: `https://cdn.traction.one/pokedex/pokemon/${res.data.id}.png`,
                abilities: res.data.abilities[0].ability.name,
                type: res.data.types[0].type.name,
                weight: res.data.weight,
                height: res.data.height,
                hp: res.data.stats[0].base_stat,
                attack: res.data.stats[1].base_stat,
                defense: res.data.stats[2].base_stat,
                speed: res.data.stats[5].base_stat,
                moves: res.data.moves
            }))
            .finally(()=> {
                setTimeout(()=>{
                    dispath(setIsLoading(false))
                }, 500)
            })}, [ character?.type])

    document.body.style = `background: ${ValidateColor(character?.type)};`
    // console.log(character);


    return (
        <div className={'ui container'}>
            <div className='left-pagination'>
                <Link to={'/character'}><i className='bx bx-left-arrow-alt'></i></Link>
            
            </div>
            <div className='image-logo'>
                <img className='img-presentation' src="../src/img/Pokemon-Logo.png" alt="" />
            </div>
            <div className='information-pokemon'>
                <div className='info-pokemon-weigth'>
                    <img src={character?.image} alt="" />
                </div>
                <div className='weigth-heigth'>
                    <div>
                        <strong>{character?.height}</strong><br /><span>Heigth</span>
                    </div>
                    <div>
                        <strong>{character?.weight}</strong><br /><span>weight</span>
                    </div>
                </div>
                <div className='name-pokemon'>
                    <h2>{character?.name}</h2>
                    <div className='id'>
                        <b># {character?.id}</b>
                    </div>
                </div>
            </div>
            <div className='ui pokemon-info-specific'>
                <div className='type-pokemon'>
                    <h2>Type</h2>
                    <div className={'infoP'} style={{background: ValidateColor(character?.type)}}>
                        <b>{character?.type}</b>
                    </div>
                </div>
                <div className='type-pokemon'>
                    <h2>
                        Abilities
                    </h2>
                    <div className={'infoP'} style={{background: ValidateColor(character?.type)}}>
                        <b>{character?.abilities}</b>
                    </div>
                </div>
            </div>
            <div className='state-base-pokemon'>
                <div>
                    <h2>State Base</h2>
                </div>
                <div className='row-pokemon'>
                    <div className='pokemon-hp'>
                        <b>HP:</b>
                    </div>
                    <div>
                        <ProgressBar animated now={`${character?.hp}`} label={`${character?.hp}%`} />
                    </div>
                </div>
                <div className='row-pokemon'>
                    <div className='pokemon-hp'>
                        <b>Defense:</b>
                    </div>
                    <div>
                        <ProgressBar animated now={`${character?.defense}`} label={`${character?.defense}%`} />
                    </div>
                </div>
                <div className='row-pokemon'>
                    <div className='pokemon-hp'>
                        <b>Attack:</b>
                    </div>
                    <div>
                        <ProgressBar animated now={`${character?.attack}`} label={`${character?.attack}%`} />
                    </div>
                </div>
                <div className='row-pokemon'>
                    <div>
                        <b>Speed:</b>
                    </div>
                    <div>
                        <ProgressBar animated now={`${character?.speed}`} label={`${character?.speed}%`} />
                    </div>
                </div>
            </div>
            <div className='segment-pokemon'>
                <div>
                    <h2>Movements</h2>
                </div>
                <Table basic="very" compact textAlign='center' fluid>
                    <Table.Body>
                        {character?.moves.map(move => (
                            <Table.Row>
                                <Table.Cell ordered>
                                    <b>{upperCase(move.move.name)}</b>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default CharacterDetail;