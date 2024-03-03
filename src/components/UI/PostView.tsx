import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import RelatedArticlesSection from "../Articles/RelatedArticlesSection";
import CommentsSection from "../Articles/CommentsSection";
import ReactMarkdown from "react-markdown";
import {
  apiKey,
  ArticleData,
  bearerToken,
  getTenantById,
  Tenant,
  tenantId,
} from "../../services/apiService";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

function PostView({
  article,
  articles,
}: {
  article: ArticleData;
  articles: ArticleData[];
}) {
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(
          `https://fullstack.exercise.applifting.cz/images/${article.imageId}`,
          {
            responseType: "arraybuffer",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": apiKey,
              Authorization: bearerToken,
            },
          }
        );
        const blob = new Blob([response.data], { type: "image/jpeg" });

        const imageUrl = URL.createObjectURL(blob);

        setImageData(imageUrl);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    if (article.imageId) {
      fetchImageData();
    }
  }, [article.imageId]);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const response = await getTenantById(tenantId);
        setTenant(response);
      } catch (error) {
        console.error("Error fetching tenant:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, []);

  const createdAtDate = new Date(article.createdAt!);
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Grid container spacing={30}>
        <Grid item xs={12} sm={8}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50rem",
              height: "auto",
              ml: "15%",
              mt: "15%",
              gap: "1.5rem",
            }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="h3"
                sx={{
                  marginBottom: 2,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {article.title}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {tenant ? tenant.name : "No author available."}
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="subtitle2" color="text.secondary">
                    • {formattedDate}
                  </Typography>
                </Grid>
              </Grid>
              {imageData && (
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: "31.5rem",
                    marginTop: "1.5rem",
                    objectFit: "cover",
                  }}
                  src={imageData}
                  alt={article.title}
                />
              )}
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </CardContent>
          </Card>
          <CommentsSection />
        </Grid>
        <RelatedArticlesSection
          openedArticleId={article.articleId!}
          articles={articles}
        />
      </Grid>
    </>
  );
}

export default PostView;
