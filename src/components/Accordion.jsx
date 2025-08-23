import React, { Component } from "react";

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  render() {
    return (
      <div>
        {Object.values(this.props.item).map((i, id) => {
          return (
            <div key={id} className="accordion-item">
              <div className="accordion-title"
                onClick={() =>
                  this.setState({
                    active: !this.state.active,
                  })
                }
              >
                <div>{i.question_english}</div><br/>
                <div>{i.question_bangla}</div>
                  <div>{this.state.active ? "-" : "+"}</div></div>

              {this.state.active && (
                <div className="card-body">{i.question_bangla}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Accordion;
