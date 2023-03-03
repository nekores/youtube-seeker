import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

type YouTubeVideoProps = {
  video_id: string;
  seek_time: string;
  currentVideo: any;
};

export default function YouTubeVideo({
  video_id,
  seek_time,
  currentVideo,
}: YouTubeVideoProps) {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
  }, [video_id]);

  return (
    <>
      <Heading as="h3" size="md" marginBottom="8px" marginTop="16px">
        {currentVideo?.title ? (
          currentVideo?.title
        ) : (
          <Spinner
            thickness="4px"
            speed="0.55s"
            emptyColor="gray.200"
            color="red.500"
            size="md"
          />
        )}
      </Heading>

      <Box
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "530px",
          minHeight: "530px",
          position: "relative",
        }}
      >
        {video_id ? (
          <ReactPlayer
            onReady={() => setLoader(false)}
            playing
            url={`https://www.youtube.com/embed/${video_id}`}
            config={{
              youtube: {
                playerVars: {
                  playsinline: 1,
                  disablekb: 1,
                  start: seek_time ? seek_time : 0,
                  autoplay: 1,
                  rel: 0,
                },
              },
            }}
            controls={true}
            width="100%"
            // height="100%"
            style={{ minHeight: "530px" }}
          />
        ) : null}
        {loader ? (
          <Box
            position="absolute"
            left="0"
            bgColor="black"
            top="0px"
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
        ) : null}
      </Box>
      <Box
        // height="100%"
        width="100%"
        // display="flex"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        {loader ? (
          <Spinner
            thickness="4px"
            speed="0.55s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
            m={10}
          />
        ) : (
          <>
            <Box mt={2} mb={5} p={3} bg="#e5e5e5" textAlign="left">
              <Heading as="h5" size="sm" mb={2}>
                Description:
              </Heading>
              <Text fontSize="md">{currentVideo?.desc}</Text>
            </Box>

            <Box textAlign="left">
              <Heading as="h3" size="md" mb={2}>
                Video Transcript
              </Heading>
              <Text fontSize="md">{currentVideo?.desc}</Text>
              <Text fontSize="md">{currentVideo?.desc}</Text>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
