module.exports = {
	config : {
		path : '/access/get_openid',
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

		var html = 
`
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<h1>
		hi	
	</h1>

	<script type="text/javascript">
		var config = {
			appid : 'wx943d1f278fbc24ff',
			redirectUrl : 'https://www.deadfishcrypto.com/wechat_platform/access/receive_code'
		}
		var getQuery = function(variable){
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i=0;i<vars.length;i++) {
			       var pair = vars[i].split("=");
			       if(pair[0] == variable){return pair[1];}
			}

			return undefined;
		}

		window.localStorage.set('redirecUrl', ${query.redirec_url});

		location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + config.redirectUrl
			 + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
	</script>
</body>
</html>
`
	res.send(html);
	}
}