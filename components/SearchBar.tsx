import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";
import { ThemeInput } from "./ThemeInput";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const handleSearch = async () => onSearch(query.trim());

  return (
    <View style={styles.container}>
      <ThemeInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search by ticker..."
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <IconSymbol size={24} name="magnifyingglass" color={'blue'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  button: {
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 6,
    marginVertical: 6,
  },
});