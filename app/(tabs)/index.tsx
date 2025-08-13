import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0"/>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <Image source={icons.logo} className="w-20 h-10 mt-20 mb-5 mx-auto"/>

        <View className="flex-1 mt-5">
          <SearchBar onPress={() => {
            router.push('/search');
          }}
          placeholder="Search for a movie"
          />
        </View>
      </ScrollView>
    </View>
  );
}  
