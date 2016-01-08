import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat
} from 'graphql';

const weatherForecastType = new GraphQLObjectType({
  name: "WeatherForecast",
  fields: () => ({
    cod: { type: GraphQLString },
    message: { type: GraphQLInt },
    cnt: { type: GraphQLInt },
    city: { type: cityType },
    list: {type: new GraphQLList(listType)},
  })
});

const cityType = new GraphQLObjectType({
  name: "City",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    population: { type: GraphQLInt },
    coord: {type: coordType },
  })
});

const coordType = new GraphQLObjectType({
  name: "Coordinates",
  fields: () => ({
    lon: { type: GraphQLFloat },
    lat: { type: GraphQLFloat},
  }),
});

const listType = new GraphQLObjectType({
  name: "List",
  description: "list of 5 day weather information",
  fields: () => ({
    dt: { type: GraphQLInt },
    dt_txt: { type: GraphQLString },
    lat: { type: GraphQLFloat},
    main: { type: mainType },
    weather: { type: new GraphQLList(weatherListType) },
    wind: { type: windType },
    clouds: { type: cloudsType },
  }),
});

const mainType = new GraphQLObjectType({
  name: "Main",
  description:"Main Weather Information",
  fields: () => ({
    temp: { type: GraphQLFloat },
    temp_min: { type: GraphQLFloat },
    temp_max: { type: GraphQLFloat },
    pressure: { type: GraphQLFloat },
    sea_level: { type: GraphQLFloat },
    grnd_level: { type: GraphQLFloat },
    humidity: { type: GraphQLInt },
    temp_kf: { type: GraphQLFloat},
    temp_f: {
      type: GraphQLFloat,
      resolve: (obj) => {
        return ((obj.temp * 9/5) - 459.67).toFixed(2);
      }
    },
    temp_c: {
      type: GraphQLFloat,
      resolve: (obj) => {
        return (obj.temp - 273.15).toFixed(2);
      }
    },
  }),
});

const weatherListType = new GraphQLObjectType({
  name: "WeatherList",
  description: "Weather information for that day",
  fields: () => ({
    id: { type: GraphQLID },
    main: { type: GraphQLString},
    description: { type: GraphQLString},
    icon: { type: GraphQLString},
  }),
});

const windType = new GraphQLObjectType({
  name: "Wind",
  fields: () => ({
    speed: { type: GraphQLFloat },
    deg: { type: GraphQLFloat },
  }),
});

const cloudsType = new GraphQLObjectType({
  name: "Clouds",
  fields: () => ({
    all: { type: GraphQLInt },
  }),
});

export default weatherForecastType;