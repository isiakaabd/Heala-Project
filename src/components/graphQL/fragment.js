import { gql } from "@apollo/client";

export const PageInfo = gql`
  fragment pageDetails on PageInfo {
    totalDocs
    limit
    offset
    hasPrevPage
    hasNextPage
    page
    totalPages
    pagingCounter
    prevPage
    nextPage
  }
`;
