import React,{Component} from 'react';

export default class Footer extends Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div ref='footer' className="footer ui equql width grid">
				<div className="equal width row">
					<div className="column">
						<button className="ui violet button">INFO</button>
					</div>
					<div className="column">
						<button className="ui violet button">SPIN</button>
					</div>
					<div className="column">
						<button className="ui violet button">-</button>
							<div className="ui inverted input">
								<input type="text"/>
							</div>
						<button className="ui violet button">+</button>
					</div>
					<div className="column">
						<button className="ui violet button">-</button>
							<div className="ui inverted input">
								<input type="text"/>
							</div>
						<button className="ui violet button">+</button>
					</div>
					<div className="column">
						<button className="ui violet button">-</button>
							<div className="ui inverted input">
								<input type="text"/>
							</div>
						<button className="ui violet button">+</button>
					</div>
					<div className="column">
						<div className="ui disabled inverted input">
							<input type="text"/>
						</div>
					</div>
					<div className="column">
						<div className="ui disabled inverted input">
							<input type="text"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
