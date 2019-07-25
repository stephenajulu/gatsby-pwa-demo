import "./index.scss"

import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Reviews from "../components/reviews"
import Center from "../components/center";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle} top={<Bio isMain={true} />}>
        <SEO title="All posts" />
        <Center>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article className="post">
              <div className="post-aside">
                <small>{node.frontmatter.date}</small>
                <h3 className="post-title">
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <p dangerouslySetInnerHTML={{
                    __html: node.excerpt,
                  }}
                />
                </div>
                <div className="products">
                  {node.frontmatter.products.map(product =>{
                    return (
                      <article>
                        <img style={{margin: 0}}
                          src={product.image.publicURL}
                          alt={product.name} />
                        <button className="snipcart-add-item"
                          data-item-id={product.sku}
                          data-item-name={product.name}
                          data-item-price={product.price}
                          >${product.price}</button>
                        <p className="product-name">
                          {product.name}
                        </p>
                      </article>
                    )
                  })}
                </div>
            </article>
          )
        })}
        </Center>
        <Reviews />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC },
        filter: {fileAbsolutePath: {regex: "/\\/guides\\//"}},
      ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            cover {
              publicURL
            }
            products {
              image {
                publicURL
              }
              name
              price
              sku
            }
          }
        }
      }
    }
  }
`