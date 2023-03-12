"use client";

import { useEffect, useState } from "react";
import { Box, Divider, Flex, Heading, Spinner } from "@chakra-ui/react";
import axios from "axios";

import { VideoPanel } from "./components/videoPanel/index";

import { useSearchParams } from "next/navigation";
import SearchButton from "./components/searchButton";
import { SearchResultsType } from "./types";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const [videoList, setVideoList] = useState(Array<SearchResultsType>);

  var local_searchHistory: string[] = [];
  if (typeof window !== "undefined") {
    local_searchHistory = JSON.parse(
      localStorage.getItem("search_history") || "[]"
    );

    console.log(
      "yyyyy",
      JSON.parse(localStorage.getItem("search_history") || "[]")
    );
  } else local_searchHistory = [];

  async function runSearch(query: string) {
    window.history.pushState({}, "", `/?query=${query}`);
    local_searchHistory.push(query);
    local_searchHistory.indexOf(query) === -1
      ? local_searchHistory.push(query)
      : null;
    console.log(
      "Query",
      query,
      " Index ",
      local_searchHistory.indexOf(query),
      local_searchHistory
    );

    if (
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("search_history"))?.includes(query) !=
        true
    ) {
      localStorage.setItem(
        "search_history",
        JSON.stringify(local_searchHistory)
      );
    }
    const res = await axios.get(
      `https://b523ymmp62.execute-api.us-east-1.amazonaws.com/launch?q=${query}`
    );
    if (res.data.results) {
      const newArray = [];
      for (let i = 0; i < res.data.results.length; i++) {
        const dd =
          await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${res.data.results[i]?.video_id}&t=${res.data.results[i]?.offset}&key=AIzaSyD4SATJMYpvr2dyg5oefYDFzlNfId-nKek&part=snippet,contentDetails,status

      `);

        const {
          id,
          snippet: { title, description, thumbnails, localized },
        } = dd?.data?.items[0];

        newArray.push({
          video_id: id,
          title,
          description,
          thumbnails,
          localized,
          schemaTest: dd?.data?.items[0],
          embeddable: dd?.data?.items[0]?.status?.embeddable,
        });
      }

      await setVideoList(newArray);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    // Populate the list from history

    const query = searchParams.get("q");
    if (!query) return;

    runSearch(query);
  }, []);

  return (
    <>
      <Box m="2" overflow="hidden" height="100%">
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2" display="flex" justifyContent="center" width="100%">
            <Heading size="md">Hello My Search App!</Heading>
          </Box>
        </Flex>

        <Divider orientation="horizontal" mb={0} />
        <SearchButton runSearch={runSearch} />

        {loading ? (
          <Box
            height="100%"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={10}
          >
            <Spinner
              thickness="4px"
              speed="0.55s"
              emptyColor="gray.200"
              color="red.500"
              size="xl"
            />
          </Box>
        ) : (
          <VideoPanel videoList={videoList} />
        )}
      </Box>
    </>
  );
}
