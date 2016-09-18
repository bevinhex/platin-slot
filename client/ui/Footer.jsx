import React,{Component} from 'react';

export default class Footer extends Component{
	constructor(){
		super();
		this.state = {
			spinCount:0,
			bet:0,
			total:0,
			win:0,
			balance:0,
			onSpin:null,
			incSpin:null,
			decSpin:null,
			incBet:null,
			decBet:null
		}
	}
	spin(){
		this.state.onSpin();
	}
	decSpin(){
		this.state.decSpin();
	}
	incSpin(){
		this.state.incSpin();
	}
	decBet(){
		this.state.decBet();
	}
	incBet(){
		this.state.incBet();
	}
	update(state){
		this.setState(state);
	}
	render(){
		return(
			<div ref='footer' className="footer ui equql width grid">
				<div className="equal width row">
					<div className="column">
						<button className="ui violet button">INFO</button>
					</div>
					<div className="column">
						<button className="ui violet button" onClick={this.spin.bind(this)}>SPIN</button>
					</div>
					<div className="column">
						<button className="ui violet button" onClick={this.decSpin.bind(this)}>-</button>
							<div className="ui inverted disabled input">
								<input type="text" value={this.state.spinCount}/>
							</div>
						<button className="ui violet button" onClick={this.incSpin.bind(this)}>+</button>
					</div>
					<div className="column">
						<button className="ui violet button" onClick={this.decBet.bind(this)}>-</button>
							<div className="ui inverted disabled input">
								<input type="text" value={this.state.bet}/>
							</div>
						<button className="ui violet button" onClick={this.incBet.bind(this)}>+</button>
					</div>
					<div className="column">
						<div className="ui disabled inverted input">
							<input type="text" value={this.state.total}/>
						</div>
					</div>
					<div className="column">
						<div className="ui disabled inverted input">
							<input type="text" value={this.state.win}/>
						</div>
					</div>
					<div className="column">
						<div className="ui disabled inverted input">
							<input type="text" value={this.state.balance}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
