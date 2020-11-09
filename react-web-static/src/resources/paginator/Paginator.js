import React from "react";
import Pagination from "react-bootstrap/Pagination";
import $ from "jquery";

class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.changeActivePagination = this.changeActivePagination.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  changeActivePagination() {
    const elements = $(".pagination li")
      .map(function () {
        return this;
      })
      .get();
    elements.forEach((el) => {
      if (el.classList.contains("active")) {
        el.classList.remove("active");
      }
    });
  }

  changePage(e) {
    let nPages =
      this.props.nIndex % 10 !== 0
        ? parseInt(this.props.nIndex / 10 + 1)
        : this.props.nIndex / 10;

    e.preventDefault();
    this.changeActivePagination();
    $(`#${e.target.id}`).parent().addClass("active");
    for (let i = 0; i < nPages; i++) {
      $(`.${i}`).hide();
    }
    $(`.${e.target.id}`).show();
    this.setState({ paginator: e.target.id });
  }

  render() {
    let nPages =
      this.props.nIndex % 10 !== 0
        ? parseInt(this.props.nIndex / 10 + 1)
        : this.props.nIndex / 10;

    let myItems = [];
    for (let active = 0; active < nPages; active++) {
      if (active === 0) {
        $(`.${active}`).show();
      }
      myItems.push(
        <Pagination.Item
          id={active}
          onClick={this.changePage}
          key={active}
          active={active === 0 ? true : false}
        >
          {active + 1}
        </Pagination.Item>
      );
    }
    return myItems;
  }
}

export default Paginator;
