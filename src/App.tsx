import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Input,
} from "@chakra-ui/react";

interface Data {
  name: string;
  main: {
    [key: string]: number;
  };
  dt: number;
  wind: {
    [key: string]: number;
  };
}

function App() {
  const [data, setData] = useState<Data>();
  const [dateTime, setDateTime] = useState<string>();
  const [location, setLocation] = useState<string>("");
  const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=801bb116a4bb9c20c90347704eee9b6c`;

  const fetchLocation = async (searchLoc: string) => {
    const { data } = await axios.get(searchLoc);
    const date: string = new Date(data.dt * 1000).toLocaleString().toString();
    setDateTime(date);
    setData(data);
  };

  const SearchLocation = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter") {
      fetchLocation(url);
      setLocation("");
      setDateTime("");
    }
  };

  return (
    <div className="content">
      <Container position="relative" height="100%" paddingTop={20}>
        <Input
          placeholder="Masukan Lokasi"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={SearchLocation}
        />
        <Heading fontSize={30} marginTop={22}>
          {data?.name}
        </Heading>
        {data && <Heading fontSize={80}>{data?.main.temp.toFixed()}°C</Heading>}
        <Text fontSize={24}>{dateTime !== "" && dateTime}</Text>
        {data && (
          <Box
            position="absolute"
            bottom={5}
            left={4}
            right={4}
            padding={4}
            rounded={8}
            bg="rgba(255,255,255,.4)"
          >
            <Grid templateColumns="repeat(3, 1fr)" gap={4} textAlign="center">
              <GridItem
                display="flex"
                flexDirection="column"
                gap={1}
                justifySelf="center"
                alignItems="center"
              >
                <Text fontWeight={800} fontSize={24}>
                  {data?.main.feels_like.toFixed()}°C
                </Text>
                <Text>Feels Like</Text>
              </GridItem>
              <GridItem
                display="flex"
                flexDirection="column"
                gap={1}
                justifySelf="center"
                alignItems="center"
              >
                <Text fontWeight={800} fontSize={24}>
                  {data?.main.humidity}%
                </Text>
                <Text>Humidity</Text>
              </GridItem>
              <GridItem
                display="flex"
                flexDirection="column"
                gap={1}
                justifySelf="center"
                alignItems="center"
              >
                <Text fontWeight={800} fontSize={24}>
                  {data?.wind.speed}MPH
                </Text>
                <Text>Wind Speed</Text>
              </GridItem>
            </Grid>
          </Box>
        )}
      </Container>
    </div>
  );
}

export default App;
