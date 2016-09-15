import React,{Component} from 'react';
window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

export default class App extends Component{
	constructor(){
		super();
	}
	componentDidMount(){
		this.game = new Phaser.Game(800,600,Phaser.AUTO,'container',{preload:this.preload,create:this.create,update:this.update});
	}
	preload(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignVertically=true;
		this.scale.pageAlignHorizontally=true;
		//this.scale.setScreenSize = true;
	}
	create(){
	}
	update(){
	}

	render(){
		return(
			<div id='container'>
				<div id='overlay'>
					{this.props.children}
				</div>
			</div>
		);
	}
}
