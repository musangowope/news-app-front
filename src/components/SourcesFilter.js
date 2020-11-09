import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import useAxios from "../custom-hooks/useAxios";
import api, { newsApiHeaderConfig } from "../constants/api";
import BlockLoader from "./BlockLoader";

const SourcesFilter = ({ onChange }) => {
  const {
    success,
    loading,
    failed,
    response: { sources = [] } = {},
  } = useAxios(api.getSources(), "get", newsApiHeaderConfig);

  const sourceOpts = sources.map((source) => ({
    label: source.name,
    value: source.id,
  }));

  /**
   *  Legacy context API has been detected within a strict-mode tree.
   *  Know warning for react select to be fixed
   *  https://github.com/JedWatson/react-select/issues/3916#issue-557531071
   **/
  return (
    <div className="sources-filter-container">
      {failed ? <div>Failed to load sources</div> : null}
      {loading ? (
        <div className="sources-filter-loader">
          <BlockLoader />
        </div>
      ) : null}
      {success ? (
        <Select
          searchable
          className="sources-filter"
          classNamePrefix="sources-filter"
          placeholder="Filter news by credible sources"
          isMulti
          options={sourceOpts}
          onChange={onChange}
        />
      ) : null}
    </div>
  );
};

SourcesFilter.propTypes = {
  onChange: PropTypes.func,
};
SourcesFilter.defaultProps = {
  defaultValue: null,
};

export default SourcesFilter;
