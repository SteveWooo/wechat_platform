module.exports = {
	config : {
		path : '/MP_verify_rses2y8XszdddR5o.txt',
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
		res.send("rses2y8XszdddR5o");
	}
}