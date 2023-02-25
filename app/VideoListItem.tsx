import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { PropaneSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import playlist from "./data.json";

// https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=id&part=snippet&id=16L2nuekLS4&key=AIzaSyCoXyAV05fYlv70Ajs71Owiub0xIZ0Xd8M
type VideoListItemProps = {
  video_id: string;
  seek_time: string;
  handleOnClick: (video_id: string, seek_time: string) => void;
  title: string;
  isActive: Boolean;
  currentVideo: Object;
};

export async function generateStaticParams() {
  return playlist.map((video) => ({
    vide_id: video.video_id,
    seek_time: video.seek_time,
  }));
}

type SnippetType = {
  title?: string;
  description?: string;
};
export default function VideoListItem({
  video_id,
  seek_time,
  handleOnClick,
  isActive,
  currentVideo,
}: VideoListItemProps) {
  const [snippet, setSnippet] = useState<SnippetType>({
    title: "First title",
    description: "Some description",
  });
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

  const truncateText = (str, no_words) => {
    return str.split(" ").splice(0, no_words).join(" ");
  };
  return (
    <>
      <Card
        maxH="300px"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        size="lg"
        variant={isActive ? "filled" : "outline"}
        borderRadius={0}
        cursor="pointer"
        onClick={() => handleOnClick(video_id, seek_time, currentVideo)}
      >
        <Image
          objectFit="cover"
          backgroundPosition="center"
          maxW={{ base: "100%", sm: "300px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Tag
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="green"
              mb={2}
            >
              <TagLabel>Occurences 12</TagLabel>
            </Tag>
            <Heading size="md">{currentVideo?.title}</Heading>

            <Text py="2">{truncateText(currentVideo?.desc, 47)}...</Text>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
}
