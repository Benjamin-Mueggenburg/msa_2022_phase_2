import axios from "axios";
import {Character} from 'rickmortyapi/dist/interfaces'
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, IconButton, Paper, Skeleton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterInfo, setCharacterInfo] = useState<null | undefined | Character>(
    undefined
  );
  const [allCharacters, setAllCharacters] = useState< Character[]>([]);
  const [characterIdx, setCharacterIdx] = useState(0);

  const RICKANDMORTY_BASE_API_URL = "https://rickandmortyapi.com/api/character/";
  return (
    <div>
      <div className="search-field">
        <h1 style={{paddingLeft: 20, textAlign:"center"}}>Rick 'n' Morty-dex </h1>
        <div style={{ display: "flex", justifyContent: "center"}}>
          <TextField
            id="search-bar"
            className="text"
            value={characterName}
            onChange={(prop) => {
              setCharacterName(prop.target.value);
            }}
            label="Enter a Rick and Morty character Name..."
            variant="outlined"
            placeholder="Search..."
            size="medium"
            style={{width: "50%"}}
          />
          <Button
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
        </div>
      </div>

      {characterInfo === undefined ? (
        <div></div>
      ) : (
        <div
          id="ricknmorty-result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
        >
          <Paper sx={{ backgroundColor: 'white' /*getBackColor(characterInfo)*/ }}>
            <Grid
              container
              direction="row"
              spacing={5}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {characterInfo === undefined || characterInfo === null ? (
                    <h1> Rick and Morty character not found</h1>
                  ) : (
                    <div>
                      <h1>
                        {characterInfo.name.charAt(0).toUpperCase() +
                          characterInfo.name.slice(1)}
                      </h1>
                      <p>
                        ID: {characterInfo.id}
                        <br />
                        Gender: {characterInfo.gender}
                        <br />
                        Species: {characterInfo.species}
                        <br />
                        Status: {characterInfo.status}
                        <br />
                      </p>
                    </div>
                  )}
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  {characterInfo?.image ? (
                    <img
                      height="300px"
                      width="300px"
                      alt={characterInfo.name}
                      src={characterInfo.image}
                    ></img>
                  ) : (
                    <Skeleton width={300} height={300} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <div id="characterSelector" style={{display:"flex", alignItems: "center"}}>
            <IconButton style={{left:0}} onClick={previousCharacter}>
              <ArrowBackIosIcon />
            </IconButton>

            <p style={{width:'100%', textAlign:'center'}}>{characterIdx + 1}/{allCharacters.length}</p>
            
            <IconButton style={{right:0}} onClick={nextCharacter}>
              <ArrowForwardIosIcon />
            </IconButton>
            

          </div>
        </div>
      )}
    </div>
  );

  // Credit to codingsparkles for providing the color mapping
  // function getBackColor(poke: Character | undefined | null) {
  //   let backColor = "#EEE8AA";
  //   if (poke === undefined || poke === null) {
  //     return backColor;
  //   }
  //   const pokeTypes = poke.types.map((i) => i.type.name);
  //   if (pokeTypes.includes("fire")) {
  //     backColor = "#FEC5BB";
  //   } else if (pokeTypes.includes("grass")) {
  //     backColor = "#80FFDB";
  //   } else if (pokeTypes.includes("water")) {
  //     backColor = "#DFE7FD";
  //   } else if (pokeTypes.includes("bug")) {
  //     backColor = "#B0DEA3";
  //   } else if (pokeTypes.includes("normal")) {
  //     backColor = "#E0FFFF";
  //   } else if (pokeTypes.includes("electric")) {
  //     backColor = "#D8E2DC";
  //   } else if (pokeTypes.includes("ground")) {
  //     backColor = "#FAD2E1";
  //   } else if (pokeTypes.includes("fairy")) {
  //     backColor = "#FFF1E6";
  //   } else if (pokeTypes.includes("ghost")) {
  //     backColor = "#F8EDEB";
  //   } else if (pokeTypes.includes("fighting")) {
  //     backColor = "#F1FAEE";
  //   } else if (pokeTypes.includes("rock")) {
  //     backColor = "#A8DADC";
  //   }
  //   return backColor;
  // }

  function nextCharacter() {
    if (characterIdx + 1 < allCharacters.length) {
      setCharacterInfo(allCharacters[characterIdx + 1]);
      setCharacterIdx(characterIdx + 1);
      
    }
  }

  function previousCharacter() {
    if (characterIdx > 0) {
      setCharacterInfo(allCharacters[characterIdx - 1]);
      setCharacterIdx(characterIdx - 1);
      
    }
  }



  function search() {
    if (characterName === undefined || characterName === "") {
      return;
    }

    axios
      .get(RICKANDMORTY_BASE_API_URL + "?name=" + characterName?.toLowerCase())
      .then((res) => {
        setAllCharacters(res.data.results);
        //Set to first result
        setCharacterInfo(res.data.results[0]);
      })
      .catch(() => {
        setCharacterInfo(null);
      });
  }


}

export default App;