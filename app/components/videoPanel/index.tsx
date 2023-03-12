import VideoListItem from "./VideoListItem";
import YouTubeVideo from "./YouTubeVideo";
import {
  Box,
  Grid,
  GridItem,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ModalComp } from "../modal/index";
import { mediaQueryHook } from "../../utils/mediaQueryHook";
import { SearchResultsType } from "../../types";

type VideoPanelProps = {
  videoList: Array<SearchResultsType>;
};

export const VideoPanel = ({ videoList }: VideoPanelProps) => {
  const { isMdUp } = mediaQueryHook();
  const [currentVideoSeek, setCurrentVideoSeek] = useState<string>("3");
  const [currentVideoId, setCurrentVideoId] = useState<string>("");
  const [currentVideo, setCurrentVideo] = useState<Object>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [playing, setPlaying] = useState<boolean>(false);

  function handleOnClick(
    id: string,
    seek_time: string,
    currentVideoo: Object
  ): void {
    if (playing && currentVideoId == id) {
      setPlaying(false);
      return;
    }

    setPlaying(true);
    setCurrentVideoId(id);
    setCurrentVideo(currentVideoo);

    setCurrentVideoSeek(seek_time);
    onOpen();
  }
  useEffect(() => {
    setCurrentVideo(videoList[0]);
    setCurrentVideoId(videoList[0]?.video_id);
  }, []);

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      gap={2}
      m={5}
      display={currentVideo ? "grid" : "flex"}
      justifyContent="center"
    >
      {isMdUp && currentVideo ? (
        <GridItem colSpan={[12, 12, 12, 12, 6, 7]}>
          <YouTubeVideo
            playing={playing}
            setPlaying={setPlaying}
            currentVideo={currentVideo}
            seek_time={currentVideoSeek}
          />
        </GridItem>
      ) : (
        <ModalComp isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <YouTubeVideo
            playing={playing}
            setPlaying={setPlaying}
            currentVideo={currentVideo}
            seek_time={currentVideoSeek}
          />
        </ModalComp>
      )}

      <GridItem colSpan={[12, 12, 12, 12, 6, 5]}>
        <Box maxW={"100%"} margin="auto" mb={2}>
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
              {videoList.length}
            </Text>
            <Text fontSize="md" m="0" marginLeft={2} marginTop="2">
              matching videos found!
            </Text>
          </Box>
        </Box>

        <Box className="video-responsive" maxH={"100vh"} overflow="auto">
          {videoList && videoList?.length > 0
            ? videoList?.map((playlistId: any) => {
                return (
                  <VideoListItem
                    key={playlistId.video_id}
                    video_id={playlistId.video_id}
                    seek_time={playlistId.seek_time}
                    handleOnClick={handleOnClick}
                    currentVideo={playlistId}
                    embeddable={playlistId?.embeddable}
                    isActive={playing && currentVideoId == playlistId.video_id}
                  />
                );
              })
            : "no vides found"}
        </Box>
      </GridItem>
    </Grid>
  );
};
