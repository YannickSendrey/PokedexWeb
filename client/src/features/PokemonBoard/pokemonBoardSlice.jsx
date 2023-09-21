import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadAllPokemons = createAsyncThunk(
    'pokemonBoard/loadAllPokemons',
    async (region = '') => {
        
        let data = [];

        if (!region) {
             data = await fetch('http://127.0.0.1:8000/api/pokemons');
        } else {
             data = await fetch(`http://127.0.0.1:8000/api/pokemons/region/${region}`);
        }
        const json = await data.json();
        return json;
    }
)

export const pokemonBoardSlice = createSlice({
    name: 'pokemonBoard',
    initialState: {
        pokemons: [],
        isLoadingPokemons: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadAllPokemons.pending, (state) => {
                state.isLoadingPokemons = true;
                state.hasError = false;
            })
            .addCase(loadAllPokemons.fulfilled, (state, action) => {
                state.isLoadingPokemons = false;
                state.pokemons = action.payload;
                state.hasError = false;
            })
            .addCase(loadAllPokemons.rejected, (state, action) => {
                state.isLoadingPokemons = false;
                state.pokemons = [];
                state.hasError = true;
            })
    }
})

export const selectAllPokemons = state => state.pokemonBoard.pokemons;

export default pokemonBoardSlice.reducer;