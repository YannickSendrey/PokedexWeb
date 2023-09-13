CREATE TABLE "pokemon" (
  "id" int PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "picture" varchar(255),
  "hp" int,
  "attack" int,
  "defense" int,
  "attackSpe" int,
  "defenseSpe" int,
  "speed" int,
  "number" int,
  "region" varchar(255)
);

CREATE TABLE "type" (
  "id" int PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "color" varchar(255) NOT NULL
);

CREATE TABLE "user" (
  "id" int PRIMARY KEY,
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL
);

CREATE TABLE "user_pokemon" (
  "user_id" int NOT NULL,
  "pokemon_id" int NOT NULL
);

CREATE TABLE "pokemon_type" (
  "pokemon_id" int NOT NULL,
  "type_id" int NOT NULL
);

ALTER TABLE "user_pokemon" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_pokemon" ADD FOREIGN KEY ("pokemon_id") REFERENCES "pokemon" ("id");

ALTER TABLE "pokemon_type" ADD FOREIGN KEY ("pokemon_id") REFERENCES "pokemon" ("id");

ALTER TABLE "pokemon_type" ADD FOREIGN KEY ("type_id") REFERENCES "type" ("id");
