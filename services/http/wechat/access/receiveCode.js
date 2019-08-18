const request = require('request');
function getAccessToken(swc, options){
	return new Promise(resolve=>{
		var option = {
			url : `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${swc.config.wechat.appid}&secret=${swc.config.wechat.secret}&code=${options.code}&grant_type=authorization_code`
		};

		request(option, (err, res, body)=>{
			if(err || res.statusCode != 200){
				console.log(err);
				resolve(undefined);
				return ;
			}

			console.log(body);
			resolve(body);
		})
	})
}

module.exports = {
	config : {
		path : '/access/receive_code',
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

		var result = await getAccessToken(swc, {
			code : query.code
		})

		var html = 
`
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<h1>
		hi	receive code
	</h1>

	<script type="text/javascript">
		var config = {
			appid : '${swc.config.wechat.appid}',
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
		var code = getQuery('code');
		alert(code);
	</script>
</body>
</html>
`
	res.send(html);
	}
}