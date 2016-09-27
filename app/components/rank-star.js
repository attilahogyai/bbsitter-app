export default Ember.Component.extend({
  rank:null,
  minValue:0,
  stars:function(){
  	var rankV=this.get('rankV');
  	var r=[];
  	for(var i=1;i<=5;i++){
  		r[i]={
  			i:i,
  			filled:i<=rankV,
  			half:(rankV-i)<1&&(rankV-i)>0,
  			empty:i>rankV
  		};
  	}
  	return r;
  }.property('rankV'),
  rankV:function(){
		var rank=this.get('rank');
    if(rank.get('rank')===null || rank.get('rank')<this.get('minValue')){
      rank.set('rank',this.get('minValue'));
    }
		return rank.get('rank');
  }.property('rank.rank'),
  actions:{
    setRank:function(value){
    	this.set('rank.rank',value);
    }
  }
});