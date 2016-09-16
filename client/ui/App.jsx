import React,{Component} from 'react';
window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

export default class App extends Component{
	constructor(){
		super();
	}
	componentDidMount(){
		this.game = new Phaser.Game(800,600,Phaser.AUTO,'',{preload:this.gamePreload.bind(this),create:this.gameCreate.bind(this),update:this.gameUpdate.bind(this),render:this.gameRender.bind(this)},true);
	}
	gamePreload(){
		//scale game screen
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignVertically=true;
		this.game.scale.pageAlignHorizontally=true;
		this.game.scale.setScreenSize = true;
		//call children method
		this.refs.childPage.gamePreload(this.game);

	}
	gameCreate(){
		this.refs.childPage.gameCreate(this.game);
	}
	gameUpdate(){
		this.refs.childPage.gameUpdate(this.game);
	}
	gameRender(){
		this.refs.childPage.gameRender(this.game);
	}

	render(){
		const childrenWithProps = React.Children.map(this.props.children,
				(child) => React.cloneElement(child,{
					ref:'childPage'
				})
			);
		return(
			<div id='overlay'>
				{childrenWithProps}
			</div>
		);
	}
}
