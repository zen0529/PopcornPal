import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView className="flex-1 px-5" nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
        <Image source={icons.logo} className="w-20 h-10 mt-20 mb-5 mx-auto" />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#ffffff"
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text className="text-white text-lg font-bold">Error: {error?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            {/* <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
              value=""
            /> */}
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList 
              data={movies} 
              renderItem={({item}) => (
                <MovieCard 
                  {...item}
                />
                // <Text className="text-white text-sm">{item.title}</Text>
              )} 
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle= {{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom:20
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
              />
            </>

              
          </View>
        )}
      </ScrollView>
      {/* <FlatList
        className="mt-2 pb-32"
        data={movies}
        renderItem={({ item }) => (
          <Text className="text-white text-sm">{item.title}</Text>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginBottom: 10
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo}
              className="w-20 h-10 mt-20 mb-5 mx-auto"
            />

            {moviesLoading ? (
              <ActivityIndicator
                size="large"
                color="#ffffff"
                className="mt-10 self-center"
              />
            ) : moviesError ? (
              <Text className="text-white text-lg font-bold">
                Error: {moviesError?.message}
              </Text>
            ) : (
              <View className="mt-5">
                <SearchBar
                  onPress={() => {
                    router.push("/search");
                  }}
                  placeholder="Search for a movie"
                />
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Latest Movies
                </Text>
              </View>
            )}
          </> */}
        {/* } */}
      {/* /> */}
    </View>
  );
}
