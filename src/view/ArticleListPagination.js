import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { ArticleCard } from "./ArticleCard";
import { useEffect, useState } from "react";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

export function ArticleListPagination({
  isLoading,
  map,
  page,
  pages,
  changePage,
}) {
  const [currentArticle, setArticle] = useState(null);

  useEffect(() => {
    setArticle(map[page]);
  }, [page, map]);

  useEffect(() => {
    setArticle(map[page]);
  }, []);

  return (
    <div>
      {isLoading || !currentArticle ? (
        <Box p={2}>
          {" "}
          <CircularProgress />{" "}
        </Box>
      ) : currentArticle.length === 0 ? (
        <p>No articles are here... yet.</p>
      ) : (
        <div>
          {currentArticle.map((value) => {
            return (
              <Box key={value.slug}>
                <ArticleCard article={value} />
              </Box>
            );
          })}
          {pages.length > 1 ? (
            <div>
              <IconButton
                disabled={page === 0}
                onClick={() => changePage(page - 1)}
              >
                <NavigateBefore className={"profile-tabs"} />
              </IconButton>
              {pages.map((value) => {
                return (
                  <Button
                    key={value}
                    className={"profile-tabs"}
                    onClick={() => changePage(value)}
                    sx={{
                      backgroundColor:
                        page === value ? "lightGreen" : "transparent",
                    }}
                  >
                    {value + 1}
                  </Button>
                );
              })}
              <IconButton
                disabled={page === pages.length - 1}
                onClick={() => changePage(page + 1)}
              >
                <NavigateNext className={"profile-tabs"} />
              </IconButton>
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
}
