import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import styles from '../../css/pokemonBoard.module.css';

export const SearchInput = ({ pokemons }) => {

    /* Using ReactSearchAutocomplete library https://github.com/sickdyd/react-search-autocomplete#reactsearchautocomplete */

    const items = [...pokemons];
    const formatResult = (item) => {
        return (
            <span className={styles.main_input_span}>{item.name}</span>
        )
    }
    
    return (
            <ReactSearchAutocomplete
            placeholder='Search a specific Pokemon...'
            items={items}
            formatResult={formatResult}
            maxResults='1'
            maxLength='10'
            showIcon={false}
            
            styling={
                {
                    backgroundColor: 'rgba(75, 99, 133, 0.56)',
                    border: '1px solid #1F2937',
                    lineColor: 'rgb(31, 41, 55)',
                    hoverBackgroundColor: '',
                    boxShadow: 'none',
                    color: 'rgba(253, 253, 253, 0.632)',
                    placeholderColor: 'rgba(253, 253, 253, 0.632)'
                }
            }
            />
    )
}