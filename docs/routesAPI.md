# API doc

| Number | Endpoint                                    | HTTP Method | Controller        | Method             | Description                                  | Data sent            |
| ------ | ------------------------------------------- | ----------- | ----------------- | ------------------ | -------------------------------------------- | -------------------- |
| 1      | `/api/pokemons`                             | GET         | PokemonController | list()             | Get all pokemons datas                       | -                    |
| 2      | `/api/pokemons/[id]`                        | GET         | PokemonController | find(id)           | Get data from a `id` pokemon                 | –                    |
| 3      | `/api/pokemons/[region]`                    | GET         | PokemonController | list(region)       | Get all pokemons from a specific `region`    | -                    |
| 4      | `/api/users/register`                       | POST        | UserController    | create             | Create a new user                            | username, password   |
| 5      | `/api/users/sign-in`                        | POST        | UserController    | checkIfUserExists  | Check if a user with input credentials exist | -                    |
| 6      | `/api/users/logout`                         | POST        | UserController    | logout             | Logout user                                  | -                    |
| 7      | `/api/pokemons/add`                         | POST        | PokemonController | addToFavorite      | Add a pokemon to team                        | user_id & pokemon_id |
| 8      | `/api/pokemons/remove/{userId}/{pokemonId}` | DELETE      | PokemonController | removeFromFavorite | Remove a pokemon from team                   | user_id & pokemon_id |
