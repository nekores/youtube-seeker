"use client";

import YouTubeVideo from "./YouTubeVideo";
import { useEffect, useState } from "react";
import VideoListItem from "./VideoListItem";
import playlist from "./data.json";
import {
  Button,
  Flex,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Grid,
  GridItem,
  Heading,
  Divider,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { mediaQueryHook } from "utils/mediaQueryHook";
import { ModalComp } from "app/components/modal/";

export default function Home() {
  const [displayPlayList, setDisplayPlayList] = useState<boolean>(true);
  const [currentVideoId, setCurrentVideoId] = useState<string>("");
  const [currentVideoSeek, setCurrentVideoSeek] = useState<string>("3");
  const [filterPlaylist, setFilterPlaylist] = useState<Array<Object>>([]);
  const [searchLoader, setSearchLoader] = useState<Boolean>(false);
  const [inputSearchVal, setInputSearchVal] = useState<string>("");
  const [currentVideo, setCurrentVideo] = useState<Object>({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log(" **** DATA *** ", playlist);
  const { isMdUp } = mediaQueryHook();

  function showSearchResults(playlist: number) {
    setDisplayPlayList(true);
  }

  function handleOnClick(
    id: string,
    seek_time: string,
    currentVideoo: Object
  ): void {
    setCurrentVideoId(id);
    setCurrentVideo(currentVideoo);
    setCurrentVideoSeek(seek_time);
    onOpen();
    // console.log(" from child", currentVideoo);
  }

  useEffect(() => {
    setCurrentVideo(playlist[0]);
    setCurrentVideoId(playlist[0]?.video_id);
    setFilterPlaylist(playlist);
  }, []);

  const searchFnc = (e: any) => {
    const input = e.target.value.toLowerCase();
    if (e.key === "Enter") {
      searchButtonFnc();
    } else {
      setInputSearchVal(input);
    }
  };
  const searchButtonFnc = () => {
    const playlistFil = playlist?.filter((i) =>
      i?.title?.toLowerCase().includes(inputSearchVal)
    );
    setFilterPlaylist(playlistFil);
    setSearchLoader(playlistFil.length != playlist.length);
  };

  const timeOut = () => {
    return (
      <Box
        height="100%"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner
          thickness="4px"
          speed="0.55s"
          emptyColor="gray.200"
          color="red.500"
          size="xl"
        />
      </Box>
    );
  };

  return (
    <>
      <Box m={2} overflow="hidden" height="100%">
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2" display="flex" justifyContent="center" width="100%">
            <Heading size="md">Hello Youtube Seek!</Heading>
          </Box>
        </Flex>
      </Box>

      <Divider orientation="horizontal" mb={0} />

      <Grid templateColumns="repeat(12, 1fr)" gap={2} m={5}>
        <GridItem colSpan={[12, 12, 12, 12, 6, 7]}>
          {isMdUp ? (
            <YouTubeVideo
              video_id={currentVideoId}
              currentVideo={currentVideo}
              seek_time={currentVideoSeek}
            />
          ) : (
            <ModalComp isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
              <YouTubeVideo
                video_id={currentVideoId}
                currentVideo={currentVideo}
                seek_time={currentVideoSeek}
              />
            </ModalComp>
          )}
        </GridItem>

        <GridItem colSpan={[12, 12, 12, 12, 6, 5]}>
          <Box maxW={"100%"} margin="auto" mb={2}>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                placeholder="Search the video..."
                onChange={searchFnc}
                onKeyDown={searchFnc}
              />
              <InputRightElement width="4.5rem" mr={1.5}>
                <Button h="1.75rem" size="sm" onClick={searchButtonFnc}>
                  Search
                </Button>
              </InputRightElement>
            </InputGroup>
            {searchLoader ? (
              <Box
                fontSize="md"
                m="0"
                marginLeft={2}
                marginTop="2"
                display="flex"
                alignItems="center"
              >
                <Text
                  fontSize="md"
                  m="0"
                  marginLeft={2}
                  marginTop="2"
                  bg="#38a169"
                  padding="2px 8px"
                  borderRadius={4}
                  color="white"
                >
                  {filterPlaylist.length}
                </Text>
                <Text fontSize="md" m="0" marginLeft={2} marginTop="2">
                  matching videos found!
                </Text>
              </Box>
            ) : null}
          </Box>

          <Box className="video-responsive" maxH={"100vh"} overflow="auto">
            {displayPlayList && filterPlaylist?.length > 0
              ? filterPlaylist?.map((playlistId: any) => {
                  return (
                    <VideoListItem
                      key={playlistId.video_id}
                      video_id={playlistId.video_id}
                      seek_time={playlistId.seek_time}
                      handleOnClick={handleOnClick}
                      currentVideo={playlistId}
                      isActive={currentVideoId == playlistId.video_id}
                    />
                  );
                })
              : timeOut()}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
