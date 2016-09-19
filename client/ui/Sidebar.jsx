import React,{Component} from 'react';
import classNames from 'classnames';

export default class Sidebar extends Component{
	constructor(){
		super();
		this.state = {
			lines:{},
			linePath:{},
			toggle:null
		};
		for(var i=1;i<26;i++)
		{
			this.state.lines[i]=false;
		}
		this.animIndex = 0;
	}
	componentDidMount(){
		this.game = this.props.game;
	}
	gamePixeltoDOM(val){
		return $(this.props.game.canvas).width()*val/800.0;
	}
	getClass(val){
		return classNames('ui','toggle','mini','blue','circular','button',{active:this.state.lines[val]});
	}
	onClick(id){
		this.state.toggle(id);
		for(var i=0;i<25;i++){
			var graphics = this.group.getAt(i);
			if(this.state.lines[i+1]){
				graphics.y = 0;
			}
			else{
				graphics.y = -1000;
			}
		}
		this.startShowTime = this.game.time.totalElapsedSeconds();
	}
	create(){
		this.animatedGroup = this.game.add.group();
		this.animatedGroup.x = 67;
		this.animatedGroup.y = 67;
		//variable to keep track of delay till lines hide themselves
		this.startShowTime = this.game.time.totalElapsedSeconds();

		this.group = this.game.add.group();
		this.group.x = 67;
		this.group.y = 67;

		var linePath = this.state.linePath;
		var cof = 400/27;
		for(var i=1;i<=25;i++){
			var graphics = this.game.add.graphics(0,0);
			this.group.add(graphics);
			graphics.lineStyle(10,0xffd900,0.7);
			var path = linePath[i.toString()];

			graphics.moveTo(0,path[0]*cof);
			graphics.lineTo(4*cof,path[0]*cof);
			for(var j = 1;j<=4;j++){
				graphics.lineTo((4+j*9)*cof,path[j]*cof);
			}
			graphics.lineTo(45*cof,path[4]*cof)
		}
	}
	updateLines(){
		//hide lines in 3 seconds
		var deltaTime =3;
		if(this.game.time.totalElapsedSeconds()-this.startShowTime > deltaTime){
			this.group.visible = false;
		}
		else {
			this.group.visible = true;
		}
		//update animated group
		if(this.game.time.totalElapsedSeconds()-this.startAnimTime > 0.5){
			if(this.animatedGroup.length){
				var graphics = this.animatedGroup.getAt(this.animIndex);
				graphics.y = 0;
			}
		}
		if(this.game.time.totalElapsedSeconds()-this.startAnimTime > 1){
			if(this.animatedGroup.length){
				var graphics = this.animatedGroup.getAt(this.animIndex);
				graphics.y = -1000;
			}
			this.startAnimTime = this.game.time.totalElapsedSeconds();
			this.animIndex ++;
			if(this.animIndex>=this.animatedGroup.length){
				this.animIndex = 0;
			}
		}
	}
	update(){
		this.updateLines();
	}
	animateWin(lines){
		//lines = [[5,3]]; //line, size
		var cof = 400/27;

		this.animatedGroup.removeAll(true);
		for(var i=0;i<lines.length;i++){
			var index = lines[i][0];
			var len = lines[i][1];
			var path = this.state.linePath[index];
			var graphics = this.game.add.graphics(0,0);
			graphics.y = -1000;

			this.animatedGroup.add(graphics);
			graphics.lineStyle(10,0xff3333,0.7);
			graphics.moveTo(0,path[0]*cof);
			graphics.lineTo(4*cof,path[0]*cof);

			var rectX=0,rectY=0;
			rectY = Math.floor(path[0]/9);
			graphics.drawRect(rectX*cof*9,rectY*cof*9,cof*9,cof*9);
			graphics.moveTo(4*cof,path[0]*cof);

			for(var j = 1;j<=4;j++){
				graphics.lineTo((4+j*9)*cof,path[j]*cof);
				if(j<len){
					rectX = j;
					rectY = Math.floor(path[j]/9);
					graphics.drawRect(rectX*cof*9,rectY*cof*9,cof*9,cof*9);
					graphics.moveTo((4+j*9)*cof,path[j]*cof);
				}
			}
			graphics.lineTo(45*cof,path[4]*cof)
		}
		if(lines.length)
			this.animIndex = 0;

		this.startAnimTime = this.game.time.totalElapsedSeconds();	
	}
	render(){
		let style={width:this.gamePixeltoDOM(67)};
		return(
			<div ref='sidebar' className="sidebar">
				<div className='leftbar' style={style}>
					<button onClick={this.onClick.bind(this,'4')} className={this.getClass('4')}>4</button>
					<button onClick={this.onClick.bind(this,'2')} className={this.getClass('2')}>2</button>
					<button onClick={this.onClick.bind(this,'24')} className={this.getClass('24')}>24</button>
					<button onClick={this.onClick.bind(this,'20')} className={this.getClass('20')}>20</button>
					<button onClick={this.onClick.bind(this,'16')} className={this.getClass('16')}>16</button>
					<button onClick={this.onClick.bind(this,'10')} className={this.getClass('10')}>10</button>
					<button onClick={this.onClick.bind(this,'1')} className={this.getClass('1')}>1</button>
					<button onClick={this.onClick.bind(this,'11')} className={this.getClass('11')}>11</button>
					<button onClick={this.onClick.bind(this,'17')} className={this.getClass('17')}>17</button>
					<button onClick={this.onClick.bind(this,'13')} className={this.getClass('13')}>13</button>
					<button onClick={this.onClick.bind(this,'21')} className={this.getClass('21')}>21</button>
					<button onClick={this.onClick.bind(this,'3')} className={this.getClass('3')}>3</button>
					<button onClick={this.onClick.bind(this,'5')} className={this.getClass('5')}>5</button>
				</div>	
				<div className='rightbar' style={style}>
					<button onClick={this.onClick.bind(this,'14')} className={this.getClass('14')}>14</button>
					<button onClick={this.onClick.bind(this,'18')} className={this.getClass('18')}>18</button>
					<button onClick={this.onClick.bind(this,'12')} className={this.getClass('12')}>12</button>
					<button onClick={this.onClick.bind(this,'9')} className={this.getClass('9')}>9</button>
					<button onClick={this.onClick.bind(this,'22')} className={this.getClass('22')}>22</button>
					<button onClick={this.onClick.bind(this,'6')} className={this.getClass('6')}>6</button>
					<button onClick={this.onClick.bind(this,'7')} className={this.getClass('7')}>7</button>
					<button onClick={this.onClick.bind(this,'23')} className={this.getClass('23')}>23</button>
					<button onClick={this.onClick.bind(this,'8')} className={this.getClass('8')}>8</button>
					<button onClick={this.onClick.bind(this,'19')} className={this.getClass('19')}>19</button>
					<button onClick={this.onClick.bind(this,'25')} className={this.getClass('25')}>25</button>
					<button onClick={this.onClick.bind(this,'15')} className={this.getClass('15')}>15</button>
				</div>	    
			</div>
		);
	}
}
