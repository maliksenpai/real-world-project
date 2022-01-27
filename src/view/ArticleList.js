import { Box, CircularProgress } from "@mui/material";
import { ArticleCard } from "./ArticleCard";

export function ArticleList({ articles, isLoading }) {
  return (
    <div>
      {isLoading || !articles ? (
        <Box p={2}>
          {" "}
          <CircularProgress />{" "}
        </Box>
      ) : articles.length === 0 ? (
        <p>No articles are here... yet.</p>
      ) : (
        <div>
          {articles.map((value) => {
            return (
              <Box key={value.slug}>
                <ArticleCard article={value} />
              </Box>
            );
          })}
        </div>
      )}
    </div>
  );
}
