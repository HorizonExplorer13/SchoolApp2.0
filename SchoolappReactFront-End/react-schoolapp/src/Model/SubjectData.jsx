import PropTypes from 'prop-types';
import React from 'react';
class SubjectData {
    constructor(Id,code, name) {
      this.Id = Id;
      this.code = code;
      this.name = name;
    }
  }

  SubjectData.propTypes = {
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };
  
  export default SubjectData;