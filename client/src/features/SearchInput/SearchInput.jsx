import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export const SearchInput = ({ pokemons }) => {

    /* Using ReactSearchAutocomplete library https://github.com/sickdyd/react-search-autocomplete#reactsearchautocomplete */

    const items = [...pokemons];
    const formatResult = (item) => {
        return (
            <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
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
                    backgroundColor: 'grey'
                }
            }
        />
    )
}