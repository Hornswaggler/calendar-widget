module.exports = function(){
	var config = {
		env:{
			dev:{
				base:		'./src',
				name:	'dev'
			},
			prod:{
				base:		'./dist',
				name:	'prod'
			}
		}
	};
	
	return config;
}