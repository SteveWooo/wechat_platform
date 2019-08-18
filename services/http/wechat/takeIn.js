module.exports = {
	config : {
		path : '/',
		method : 'get',
		middlewares : [],
		model : {
			code : 2000,
			data : {}
		}
	},
	service : async (req, res, next)=>{
		var query = req.query;
		var swc = req.swc;
		console.log(query);
		res.send(query.echostr);
	}
}