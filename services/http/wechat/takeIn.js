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
		var query = req.body;
		var swc = req.swc;

		res.send(query.echostr);
	}
}