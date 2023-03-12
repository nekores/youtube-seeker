import {
  Button,
  Flex,
  FormControl,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchButtonPropsType } from "app/types";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

export default function SearchButton({ runSearch }: SearchButtonPropsType) {
  const [searchValue, setSearchValue] = useState("Shailesh");
  let params = new URL(document.location).searchParams;
  let name = params.get("query");

  const [searchedValues, setSearchedValues] = useState([]);

  const changeSearchValue = (event: any) => {
    if (event.key === "Enter") {
      runSearch(searchValue);
      if (searchedValues.includes(searchValue) != true) {
        setSearchedValues((prev) =>
          [...prev, searchValue]?.sort((a, b) => (a.itemM > b.itemM ? 1 : -1))
        );
      }
    }
    setSearchValue(event.target.value);
  };

  async function handleSearch() {
    runSearch(searchValue);
  }

  useEffect(() => {
    const pastSearchValues = localStorage?.getItem("search_history");
    if (name) {
      setSearchValue(name);
      runSearch(name);
    }
    if (searchValue === "Shailesh") {
      runSearch(searchValue);
    }
    if (pastSearchValues) {
      setSearchedValues(JSON.parse(pastSearchValues));
    }
  }, []);

  return (
    <>
      <Flex justifyContent="center" width="100%" mt="6">
        <FormControl w="xl">
          <AutoComplete
            openOnFocus
            freeSolo
            onChange={changeSearchValue}
            listAllValuesOnFocus
            onChange={(val) => {
              runSearch(val);
              setSearchValue(val);
            }}
          >
            <InputGroup size="lg" width="100%">
              <AutoCompleteInput
                variant="filled"
                type="text"
                placeholder="Search"
                onChange={changeSearchValue}
                onKeyDown={changeSearchValue}
                value={searchValue}
              />
              <InputRightElement width="4.5rem" right="10px">
                <Button h="1.75rem" size="sm" onClick={handleSearch}>
                  Search
                </Button>
              </InputRightElement>
            </InputGroup>
            <AutoCompleteList w="xl">
              {searchedValues.map((val, vid) => (
                <AutoCompleteItem
                  key={`option-${vid}`}
                  value={val}
                  textTransform="capitalize"
                >
                  {val}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        </FormControl>
      </Flex>
    </>
  );
}
