import React,{Component} from 'react';
window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

export default class App extends Component{
	constructor(){
		super();
		this.state = {
			game:null
		}
	}
	componentWillMount(){
	}
	componentDidMount(){
		this.game = new Phaser.Game(800,600,Phaser.AUTO,'',{preload:this.gamePreload.bind(this),create:this.gameCreate.bind(this),update:this.gameUpdate.bind(this),render:this.gameRender.bind(this)},true);
		this.setState({game:this.game});
	}
	gamePreload(){
		//scale game screen
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignVertically=true;
		this.game.scale.pageAlignHorizontally=true;
		this.game.scale.setScreenSize = true;
		//call children method
		this.refs.childPage.gamePreload();
	}
	gameCreate(){
		this.refs.childPage.gameCreate();
	}
	gameUpdate(){
		this.refs.childPage.gameUpdate();
	}
	gameRender(){
		this.refs.childPage.gameRender();
	}

	render(){
		const childrenWithProps = React.Children.map(this.props.children,
				(child) => React.cloneElement(child,{
					ref:'childPage',
					game:this.state.game
				})
			);
		return(
			<div id='overlay'>
				{childrenWithProps}
			</div>
		);
	}
}
