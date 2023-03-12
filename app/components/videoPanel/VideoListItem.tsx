import { useState } from "react";
import playlist from "../../data.json";
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

//https://www.googleapis.com/youtube/v3/videos?id=nxtJb4awY3Q&key=[api-key]&part=snippet,contentDetails,status
import { MdPlayCircleOutline, MdPauseCircleOutline } from "react-icons/md";
import { SnippetType } from "../../types";
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
  embeddable: any;
};

export async function generateStaticParams() {
  return playlist.map((video) => ({
    video_id: video.video_id,
    seek_time: video.seek_time,
  }));
}

export default function VideoListItem({
  video_id,
  seek_time,
  handleOnClick,
  isActive,
  currentVideo,
  embeddable,
}: VideoListItemProps) {
  // const YOUTUBE_KEY = process.env.NEXT_YOUTUBE_KEY;
  const YOUTUBE_KEY = "AIzaSyD4SATJMYpvr2dyg5oefYDFzlNfId-nKek";


  const truncateText = (str: any, no_words: any) => {
    return str.split(" ").splice(0, no_words).join(" ");
  };

  function handleOnClickItem() { 

    // Pass click event to parent
     handleOnClick(video_id, seek_time, currentVideo);
  }
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
        onClick={handleOnClickItem}
        display="flex"
        alignItems="center"
      >
        <Box position="relative">
          <Image
            maxHeight="200px"
            backgroundPosition="center"
            maxW={{ base: "100%", sm: "300px" }}
            src={currentVideo?.thumbnails?.medium?.url}
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
            <Tag
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="red"
              mb={2}
              ml={1}
            >
              <TagLabel>Embedable : {embeddable ? "true" : "false"}</TagLabel>
            </Tag>
            <Heading size="md">{currentVideo.title}</Heading>
            <Text py="2">{truncateText(currentVideo?.description, 30)}...</Text>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
}
