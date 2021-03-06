/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useSiteMetadata } from '../../hooks';
import "./Bio.scss";
import profilePhoto from "../../../assets/dwny-profile.png";

const Bio = () => {
  const { author } = useSiteMetadata();

  return (
    <div className="bio">
      <img
        src={profilePhoto}
        alt={author.name}
      />
      <p>
        Written by <strong>{author.name}</strong>
        {` `}
        {/* <a href={`https://twitter.com/${social.twitter}`}>
          You should follow him on Twitter
        </a> */}
      </p>
    </div>
  )
}

export default Bio;
