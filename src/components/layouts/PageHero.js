import React from "react";
import styled from "styled-components";
import * as Icon from "@mui/icons-material";
import PropTypes from "prop-types";

import { useHistory } from "react-router";
import { H1, P } from "components/Utilities/Texts";

const PageHeroStyle = styled.div`
  background: #f8f6fe;
`;

const PageHero = ({ title, description, className, back, goBackText }) => {
  let history = useHistory();

  return (
    <PageHeroStyle className={`pt-16 pb-12 container ${className ? className : ""}`}>
      <H1 fontSize="26px" color="#22202D" className="mb-4">
        {title}
      </H1>
      {description && <P color="#1E202A">{description}</P>}
      {back && (
        <div
          className="flex items-center cursor-pointer"
          style={{
            width: "fit-content",
          }}
          onClick={() => history.goBack()}
        >
          <Icon.ChevronLeft size={14} color="#7D7B96" className="mr-2" />
          <P color="#1E202A" fontSize="14px" smallSize="14px">
            {goBackText}
          </P>
        </div>
      )}
    </PageHeroStyle>
  );
};

PageHero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.description,
  className: PropTypes.className,
  back: PropTypes.back,
  goBackText: PropTypes.goBackText,
};

export default PageHero;
