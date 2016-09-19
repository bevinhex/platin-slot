export default class Controller{
	constructor(spinner,sidebar,footer){
		this.spinner = spinner;
		this.sidebar = sidebar;
		this.footer = footer;
		
		//footer
		this.spinCount=1;
		this.bet=1;
		this.total=0;	
		this.win=0;
		this.balance=10000;
		//sidebar
		this.lines = {
		};
		for(var i=1;i<26;i++)
		{
			this.lines[i]=true;
		}
		
		this.initComponents();
		this.calculateBet();

		this.result = [];
	}
	linePath(){
		return {
			'1':[13,13,13,13,13],
			'2':[3,3,3,3,3],
			'3':[23,23,23,23,23],
			'4':[1,17,1,17,1],
			'5':[25,10,25,10,25],
			'6':[12,7,7,7,12],
			'7':[14,19,19,19,14],
			'8':[7,7,13,19,19],
			'9':[19,19,13,7,7],
			'10':[11,6,13,20,15],
			'11':[15,20,13,6,11],
			'12':[5,12,12,12,5],
			'13':[21,14,14,14,21],
			'14':[1,17,1,17,1],
			'15':[25,10,25,10,25],
			'16':[9,9,6,9,9],
			'17':[17,17,20,17,17],
			'18':[3,3,26,3,3],
			'19':[23,23,0,23,23],
			'20':[7,19,19,19,7],
			'21':[19,7,7,7,19],
			'22':[10,8,25,8,10],
			'23':[16,20,1,20,16],
			'24':[5,21,5,21,5],
			'25':[21,5,21,5,21]
		}
	}
	rules(){
		return{
			'9':{
				2:2,
				3:5,
				4:25,
				5:100
			},
			'10':{
				3:5,
				4:25,
				5:100
			},
			'J':{
				3:5,
				4:25,
				5:100
			},
			'Q':{
				3:5,
				4:25,
				5:100
			},
			'K':{
				3:10,
				4:50,
				5:150
			},
			'A':{
				3:10,
				4:50,
				5:150
			},
			'Odo':{
				3:20,
				4:100,
				5:400
			},
			'Shell':{
				2:2,
				3:5,
				4:20,
				5:500
			},
			'StarFish':{
				3:15,
				4:75,
				5:250
			},
			'SeaHorse':{
				3:15,
				4:75,
				5:250
			},
			'Shark':{
				2:4,
				3:25,
				4:125,
				5:750
			},
			'Turtle':{
				2:4,
				3:25,
				4:125,
				5:750
			},
			'Whale':{
				2:10,
				3:250,
				4:2500,
				5:10000
			}
		}
	}
	initComponents(){
		//footer
		this.footer.setState({
			spinCount:this.spinCount,
			bet:this.bet,
			total:this.total,
			win:this.win,
			balance:this.balance,
			onSpin:this.spin.bind(this),
			incSpin:this.incSpin.bind(this),
			decSpin:this.decSpin.bind(this),
			incBet:this.incBet.bind(this),
			decBet:this.decBet.bind(this)
		});
		//spinner
		this.spinner[0].setState({onStop:this.onSpinnerStop.bind(this,0)});
		this.spinner[1].setState({onStop:this.onSpinnerStop.bind(this,1)});
		this.spinner[2].setState({onStop:this.onSpinnerStop.bind(this,2)});
		this.spinner[3].setState({onStop:this.onSpinnerStop.bind(this,3)});
		this.spinner[4].setState({onStop:this.onSpinnerStop.bind(this,4)});
		//sidebar
		this.sidebar.setState({
			lines:this.lines,
			linePath:this.linePath(),
			toggle:this.onToggle.bind(this)
		});
	}
	spin(){
		if(this.balance>=this.total){
			this.balance -= this.total;
			this.footer.setState({
				'win':0,
				'balance':this.balance
			});
		}
		this.sidebar.animateWin([]);
		this.spinMusic.loopFull(1);
		this.spinner[0].Start();
		this.spinner[0].SetFriction(0.98);
		this.spinner[1].Start();
		this.spinner[2].Start();
		this.spinner[3].Start();
		this.spinner[4].Start();
	}
	incSpin(){
		this.spinCount++;
		this.footer.setState({spinCount:this.spinCount});
	}
	decSpin(){
		if(this.spinCount>1)
		{
			this.spinCount--;
			this.footer.setState({spinCount:this.spinCount});
		}
	}
	incBet(){
		this.bet++;
		this.footer.setState({bet:this.bet});
		this.calculateBet();
	}
	decBet(){
		if(this.bet>1){
			this.bet--;
			this.footer.setState({bet:this.bet});
			this.calculateBet();
		}
	}
	calculateBet(){
		var total = 0;
		for(var i=1;i<=25;i++){
			if(this.lines[i]){
				total += this.bet;
			}
		}
		this.total = total;
		this.footer.setState({total:this.total});	
	}
	onToggle(id){
		for(var i =1;i<=25;i++){
			if(i<=parseInt(id))
			{
				this.lines[i] = true;
			}
			else{
				this.lines[i] = false;
			}
		}
		this.sidebar.setState({
			lines:this.lines
		});
		this.calculateBet();
	}
	onSpinnerStop(index,result){
		this.pushResult(index,result);
		this.spinStopMusic.play();
		if(index==4){
			this.spinMusic.stop();
			this.applyRules();
		}
		else{
			this.spinner[index+1].SetFriction(0.98);	
		}
	}
	pushResult(index,result){
		this.result[index] = result;	
	}
	applyRules(){
		var winLine = [];
		var win=0;
		for(var i=1;i<=25;i++){
			var tmp = this.lineWin(i);
			if(tmp[0]>0){
				winLine.push([i,tmp[1]])
			}
			win += tmp[0];
		}
		this.win = win*this.bet;
		this.balance += this.win;
		this.footer.setState({
			balance:this.balance,
			win:this.win});
	
		this.sidebar.animateWin(winLine);
	}
	lineWin(lineNumber){
		if(this.lines[lineNumber] == false){
			return 0;
		}
		var result = this.getLineResult(lineNumber);
		var filteredRes = this.filterResult(result);
		console.log(filteredRes);
		var win = this.checkProfiles(filteredRes);
		return [win,filteredRes.length];
	}
	getLineResult(lineNumber){
		var path = this.linePath()[lineNumber];
		
		var result = [];
		for(var i=0;i<5;i++){
			var index = Math.floor(path[i]/9);
			result.push(this.result[i][index]);
		}
		return result;
	}
	filterResult(input){
		var type=null;
		var result = [];
		for(var i=0;i<5;i++){
			//put every whale
			if(input[i] == 'Whale'){
				result.push('Whale');
			}
			else{
				if(type==null){
					type=input[i];
					result.push(input[i]);
				}
				else{
					if( type == input[i]){
						result.push(input[i]);
					}
					else{
						break;
					}
				}
			}
		}
		return result;
	}
	checkProfiles(result){
		if(result.length==1)
			return 0;

		var profileName = 'Whale';
		var wild = false;
		for(var i=0;i<result.length;i++){
			if(result[i]!='Whale')
			{
				profileName = result[i];
			}
			else{
				wild = true;
			}
		}

		var profile = this.rules()[profileName];
		var len = result.length;
		if(!(len in profile)){
			return 0;
		}
		var win = profile[len];

		if(profileName != 'Whale'){
			win = win*2;
		}
		return win;
	}
}
