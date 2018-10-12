import '../styles/pagination.styl';
import { Component } from 'react';

export default class Pagination extends Component {
    state = { value: 1 };

    setValue (n) {
        n = n < 1? 1 : n > this.props.size? this.props.size : n;

        this.setState({ value: n });
        this.props.onChange && this.props.onChange(n)
    }

    render () {
        let { size, buttons } = this.props;
        let { value } = this.state;

        buttons = buttons || 10;
        
        let items = [];
        let middle = buttons/2;
        let start = value <= middle? 1 : Math.floor(value - middle) + 1;
        let end = value <= middle? buttons : buttons + Math.ceil((value - middle)) - 1;

        for(let i=start;i<=end;i++) {
            let n = i;
            items.push(<div
                className={
                     value === i?
                    "p-item num active" :
                    "p-item num"
                }

                key={ i }
                onClick={ () => this.setValue(n) }>{ i }</div>);
        }

        return (
            <div
                className="pagination-main"
                style = {{
                    gridTemplateColumns: 'repeat(auto-fit, 64px)'
                }}
            >
                <div className="p-item scroll" onClick={ () => this.setValue(this.state.value - 1) }>{"<<"}</div>
                { items }
                <div className="p-item scroll" onClick={ () => this.setValue(this.state.value + 1) }>{">>"}</div>
            </div>
        );
    }

}