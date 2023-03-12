export type SnippetType = {
    title?: string;
    description?: string;
    thumbnails?: {
      default: {
        url: string;
        width: number,
        height: number
      },
      medium: {
        url: string,
        width: number,
        height: number
      },
  
  }};

  export type SearchResultsType = {
    matched_text: string,
    url: string,
    video_id: string,
    offset: number
    snippet: SnippetType
  }



  export type SearchButtonPropsType = {
    runSearch: any
  }