import Icon from '../icons';
import { Component } from 'react';

function Option ({ id, name, onClick }) {
    return (<div className="option" onClick={onClick}>{ name }</div>);
}

export default class BodySelect extends Component {
    
    constructor ({ active }) {
        super();

        this.state = { open: false, active };
    }

    toggle (status) {
        this.setState({ open: status === undefined? !this.state.open: status });
    }

    change (id) {
        this.setState({ active: id })
    }

    render () {
        let { open, active } = this.state;
        let { data, placeholder, onChange } = this.props;

        return (
            <div className="select" onClick={ () => this.toggle() }>
                {
                    active?
                        (<div className="option active">{ data[active] }</div>):
                        (<div className="option placeholder">{ placeholder }</div>)
                }

                {
                    active?
                        <Icon.close onClick ={ (e) => { this.change(); e.stopPropagation(); onChange && onChange() } } /> :
                        <Icon.expand onClick={ () => this.toggle(true) }/>
                }

                { open &&
                    <div className={ Object.keys(data).length > 2? "options" : "options small" }>
                        {
                            (() => {
                                let x = [];

                                for(let id in data)
                                    x.push( 
                                        <Option
                                            id={id}
                                            name={data[id]}
                                            onClick={() => {
                                                this.change(id)
                                                this.toggle(false)
                                                onChange && onChange(id, data[id])
                                            }}
                                        />
                                    );
                                
                                return x;
                            })()
                        }
                    </div>
                }
            </div>
        )
    }
}