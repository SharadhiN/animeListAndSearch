import React, { useState, useEffect } from "react";
import { useAnime } from "../../providers/animeContext";
import Loader from "../Loader";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
  capitalize,
  LinearProgress,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BASE_URL } from "../../utils/constants";
import * as AnimeThunks from "../../thunks/animeList";
import InfiniteScroll from "react-infinite-scroll-component";


const useStyles = makeStyles({
  animeArea: {
    paddingTop: "30px",
    paddingLeft: "15%",
    paddingRight: "15%",
    width: "100%"
  },
  animeImage: {
    height: "160px",
    width: "160px"
  },
  progress: {
    position: "fixed",
    top: "50%",
    left: "50%",
    marginTop: "-100px",
    marginLeft: "-100px"
  }
});


const AnimeWidget = () => {
  // (local) states for infinite scroll & pagination. not concerned with any other component, hence maintained here outside of redux.
  const [ scrollData, setScrollData ] = useState();
  const [ hasMore, setHasMore ] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const classes = useStyles();
  const { animeData, dispatch } = useAnime();

  useEffect(() => {
    if ( animeData.pagination && animeData.pagination.current_page === (currentPage + 1) ) {
      console.log('Next Page Data!');
      setCurrentPage(animeData.pagination.current_page);
      loadMoreData();
    } else return;
  }, [animeData]);


  if ( !animeData.data ) return <Loader />
  if ( animeData.loading || Object.keys(animeData.data).length === 0 ) return <Loader />

  
  // set initital scroll range.
  if ( !scrollData || scrollData.length === 0 ) {
    setScrollData([ ...animeData.data ]);
  }

  const fetchMoreBooks = () => {
    const currentPage = animeData.pagination.current_page;
    const lastPage = animeData.pagination.last_visible_page;
    if ( currentPage === lastPage ) {
      setHasMore(false);
      return;
    }
    let nextPageUrl = BASE_URL + `/anime?page=${currentPage + 1}`;
    nextPageUrl = encodeURI(nextPageUrl);
    dispatch(AnimeThunks.getNextPage({ nextPageUrl }));
  };

  const loadMoreData = () => {
    console.log(scrollData.length);
    let newScrollData = [ ...scrollData, ...animeData.data ];
    console.log(newScrollData.length);
    setScrollData([ ...newScrollData ]);
  };

  const lastRowHandler = () => {
    fetchMoreBooks();
  };

  const renderAnime = (index) => {
    if ( !scrollData || !scrollData[index] ) return null;
    let { 
      aired, 
      genres, 
      images, 
      rank, 
      rating,
      source, 
      synopsis, 
      url, 
      title_english, 
      title_japanese, 
      trailer 
    } = scrollData[index];
    // console.log('Rendering');
    // console.log(animeData.data[index]);
    synopsis = synopsis ? synopsis.slice(0, 50) : '-';
    title_english = title_english ? capitalize(`${title_english}`) : '-' ;
    const trailer_url = trailer.embed_url ? trailer.embed_url : '-';

    return (
      <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <Card elevation={20}>
              <CardContent align="center">
                  <Typography>{"Title[ENG]: " + title_english }</Typography>
                  <Typography>{"Title[JPN]: " + capitalize(`${title_japanese}`)}</Typography>
                  <Typography>{"Synopsis: " + synopsis + '...'}</Typography>
                  <Typography>{"Aired: From " + (new Date(aired.from)).toLocaleDateString('en-GB') + " To " + (new Date(aired.to)).toLocaleDateString('en-GB')}</Typography>
                  <Typography>{"Genres: " + (genres.map(g => g.name)).join(", ")}</Typography>
                  <Typography>{"Rank: " + rank}</Typography>
                  <Typography>{"Rating: " + rating}</Typography>
                  <Typography>{"Source: " + source}</Typography>
                  <Typography>{"URL: " + url}</Typography>
                  <Typography>{"Trailer: " + trailer_url}</Typography>
                  <CardMedia>
                  <div
                      style={{
                      borderRadius: "50%",
                      backgroundColor: "#F2F5C8",
                      maxWidth: "90%"
                      }}
                  >
                      <img className={classes.animeImage} alt={title_english} src={images.jpg.image_url} />
                  </div>
                  </CardMedia>
              </CardContent>
          </Card>
      </Grid>
    );
  }



  return (
    <div>
      {
        scrollData && scrollData.length > 0 ?
        (
          <InfiniteScroll
            dataLength={scrollData.length}
            next={() => lastRowHandler()}
            hasMore={hasMore}
            loader={<LinearProgress />}
            style={{ overflow: 'unset' }}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>All Animes are loaded. Scroll back to top.</b>
              </p>
            }
          >
            <Grid container spacing={4} className={classes.animeArea}>
              {scrollData.map((anime, index) => renderAnime(index))}
            </Grid>
          </InfiniteScroll>
        )
        :
        <CircularProgress
          color={"success"}
          className={classes.progress}
          size={200}
        />
        // (
        //   <Grid container spacing={4} className={classes.animeArea}>
        //       {animeData.data.map((anime, index) => renderAnime(index))}
        //   </Grid>
        // )
      }
    </div>
  )
}

export default AnimeWidget;