import React from "react";
import Layout from "../../components/Layout";
import SEO from "../../components/seo/SEO";
import VideosRoll from "../../components/VideosRoll";
import StoriesRollItem from "../../components/StoriesRollItem";
import { graphql, Link } from "gatsby";

import { FaGlobe, FaVideo, FaBookOpen } from "react-icons/fa";
import Img from "gatsby-image";

export default class RecommendedIndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const videoImgData = data.videoImg.childImageSharp.fluid;
    const serviceImgData = data.serviceImg.childImageSharp.fluid;
    const storiesImgData = data.storiesImg.childImageSharp.fluid;
    const videos = data.recommendedVideos.edges;
    return (
      <Layout>
        <div className="container">
          <SEO
            title="Recommended"
            description="Developer stories, videos, and services which Abhith recommends."
            slug="\recommended"
          />
          <div className="section">
            <h1 className="title is-4 has-text-weight-bold mb-4">
              Recommended
            </h1>
            <div className="columns">
              <div className="column">
                <div>
                  <Link to="/recommended/stories">
                    <Img fluid={storiesImgData} />
                  </Link>
                  <div className="mt-1">
                    <Link to="/recommended/stories">
                      <h2 className="title is-4 has-text-weight-bold">
                        Developer Stories
                      </h2>
                    </Link>
                    <p className="content">
                      I read a lot, and that's how I stay updated about what's
                      going on around. Here I am listing out some of the stories
                      which I find useful.
                    </p>
                    <div>
                      <Link
                        className="sscroll btn btn-gray btn-sm"
                        to="/recommended/stories"
                      >
                        <FaBookOpen /> {data.recommendedStories.totalCount}{" "}
                        STORIES
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                {data.recommendedStories.edges.map(({ node }) => {
                  return <StoriesRollItem post={node} key={node.id} />;
                })}
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <div>
                  <Link to="/recommended/videos">
                    <Img fluid={videoImgData} />
                  </Link>
                  <div className="mt-1">
                    <Link className="text-dark" to="/recommended/videos">
                      <h2 className="title is-4 has-text-weight-bold">
                        VIDEOS
                      </h2>
                    </Link>
                    <p className="excerpt">
                      Similar to Developer Stories, here I am listing videos
                      which worth sharing.
                    </p>
                    <div>
                      <small className="d-block text-muted">
                        <Link
                          className="sscroll btn btn-lightblue btn-sm"
                          to="/recommended/videos"
                        >
                          <FaVideo /> {data.recommendedVideos.totalCount} VIDEOS
                        </Link>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <VideosRoll videos={videos} />
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <div className="">
                  <Link to="/recommended/services">
                    <Img fluid={serviceImgData} />
                  </Link>
                  <div className="">
                    <Link className="text-dark" to="/recommended/services">
                      <h2 className="title is-4 has-text-weight-bold">
                        Services
                      </h2>
                    </Link>
                    <p className="excerpt">
                      There are plenty of online services available nowadays.
                      Here I am sharing some of the useful ones which I explored
                      yet.
                    </p>
                    <div>
                      <Link
                        className="sscroll btn btn-light btn-sm"
                        to="/recommended/services"
                      >
                        <FaGlobe /> {data.services.totalCount} SERVICES
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
              <VideosRoll videos={videos} />
            </div> */}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query RecommendedIndexPageQuery {
    videoImg: file(relativePath: { eq: "recommended-video.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 505) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    recommendedVideos: allVideosJson(
      limit: 1
      sort: { fields: [date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          url
          type
        }
      }
    }
    serviceImg: file(relativePath: { eq: "recommended-services.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 505) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    services: allServicesJson(limit: 3, sort: { fields: [date], order: DESC }) {
      totalCount
      edges {
        node {
          title
          id
          tags
          url
        }
      }
    }
    storiesImg: file(relativePath: { eq: "recommended-stories.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 505) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    recommendedStories: allStoriesJson(
      limit: 3
      sort: { fields: [date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          title
          date(formatString: "MMM DD, YYYY")
          description
          id
          tags
          url
        }
      }
    }
  }
`;