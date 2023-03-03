import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
  Icon,
  Box,
} from "@chakra-ui/react";
import { MdPlayCircleOutline, MdPauseCircleOutline } from "react-icons/md";
import playlist from "./data.json";

// https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=id&part=snippet&id=16L2nuekLS4&key=AIzaSyCoXyAV05fYlv70Ajs71Owiub0xIZ0Xd8M
type VideoListItemProps = {
  video_id: string;
  seek_time: string;
  handleOnClick: (
    video_id: string,
    seek_time: string,
    currentVideo: any
  ) => void;
  isActive: Boolean;
  currentVideo: any;
};

export async function generateStaticParams() {
  return playlist.map((video) => ({
    vide_id: video.video_id,
    seek_time: video.seek_time,
  }));
}

export default function VideoListItem({
  video_id,
  seek_time,
  handleOnClick,
  isActive,
  currentVideo,
}: VideoListItemProps) {
  // const YOUTUBE_KEY = process.env.NEXT_YOUTUBE_KEY;
  // const YOUTUBE_KEY = "AIzaSyCoXyAV05fYlv70Ajs71Owiub0xIZ0Xd8M";

  // async function fetchData() {
  //   const url = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=id&part=snippet&id=${video_id}&key=${YOUTUBE_KEY}`;
  //   console.log(" URL ", url);
  //   const data = await fetch(url);
  //   const res = await data.json();
  //   console.log(" Print Resp ", res);
  //   console.log(
  //     " Print Resp YES",
  //     res.items && res.items[0] && res.items[0].snippet
  //   );
  //   res.items && res.items[0] && res.items[0].snippet
  //     ? setSnippet(res.items[0].snippet)
  //     : null;
  // }
  // useEffect(() => {
  //   // Update the document title using the browser API

  //   fetchData();
  // }, []);

  const truncateText = (str: any, no_words: any) => {
    return str.split(" ").splice(0, no_words).join(" ");
  };
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        size="lg"
        variant="outline"
        bg={isActive ? "#edf2f7" : "none"}
        borderRadius={0}
        cursor="pointer"
        onClick={() => handleOnClick(video_id, seek_time, currentVideo)}
        display="flex"
        alignItems="center"
      >
        <Box position="relative">
          <Image
            maxHeight="200px"
            backgroundPosition="center"
            maxW={{ base: "100%", sm: "300px" }}
            src={currentVideo?.video_thumbnail}
            alt={currentVideo?.title}
          />
          <Box
            position="absolute"
            left="0"
            top="0"
            right="0"
            bottom="0"
            margin="auto"
            bg={isActive ? "#00000050" : "#00000099"}
            width={"100%"}
            height={"100%"}
          />
          {isActive ? (
            <Icon
              as={MdPauseCircleOutline}
              position="absolute"
              left="0"
              top="0"
              right="0"
              bottom="0"
              margin="auto"
              color={"white"}
              width={"70px"}
              height={"70px"}
            />
          ) : (
            <Icon
              color={"white"}
              as={MdPlayCircleOutline}
              position="absolute"
              boxSize={20}
              left="0"
              top="0"
              right="0"
              bottom="0"
              margin="auto"
              width={"70px"}
              height={"70px"}
            />
          )}
        </Box>

        <Stack>
          <CardBody>
            <Tag
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="green"
              mb={2}
            >
              <TagLabel>Occurences {currentVideo?.occourances}</TagLabel>
            </Tag>
            <Heading size="md">{currentVideo?.title}</Heading>

            <Text py="2">{truncateText(currentVideo?.desc, 48)}...</Text>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
}
