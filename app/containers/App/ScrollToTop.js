import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      if (document.getElementsByClassName('master-home-container').length!=0 ){
        document.getElementsByClassName('master-home-container')[0].scrollTo({top:0})

      }
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);