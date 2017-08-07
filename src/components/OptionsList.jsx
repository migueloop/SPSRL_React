import React, {Component} from 'react';

class OptionsList extends Component {
  static propTypes = {
    options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onItemClick: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
    };
  }

  componentWillMount() {
    const { options, selected } = this.props;
    options.map((option, i) => {
      if (selected) {
        this.setState({
          activeItem: selected
        });
      }
      return true;
    });
  }

  updateSelection(selection) {
    const { onSelect, options, onItemClick} = this.props;
    const { activeItem } = this.state;

    this.setState({
      activeItem: selection,
    });
    onItemClick(selection)

  }

  render() {
    const { options } = this.props;
    const { activeItem } = this.state;
    console.log(options)
    console.log(activeItem)
    return (
      <div className="game-options">
          <div className="selection">
            {activeItem.label || 'select your tool'}
          </div>
          <ul className="options-list">
            {options.map((option) => {
              return (
                <li
                  key={`game-option-${option.label}`}
                  className="game-option"
                  onClick={() => this.updateSelection(option)}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
      </div>
    );
  }
}
export default OptionsList;
