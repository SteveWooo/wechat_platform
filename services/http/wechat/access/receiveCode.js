const request = require('request');
function getAccessToken(swc, options){
	return new Promise(resolve=>{
		var option = {
			url : `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${swc.config.wechat.appid}&secret=${swc.config.wechat.secret}&code=${options.code}&grant_type=authorization_code`
		};

		request(option, (err, res, body)=>{
			if(err || res.statusCode != 200){
				resolve(undefined);
				return ;
			}
			body = JSON.parse(body);
			if(body.openid == undefined){
				resolve(undefined);
				return ;
			}
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
		if(result == undefined){
			res.send('微信登陆失败，请联系开发者');
			return ;
		}

		var openid = result.openid;

		var html = 
`
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<script type="text/javascript">
		var config = {
			appid : '${swc.config.wechat.appid}',
			redirectUrl : 'https://www.deadfishcrypto.com/wechat_platform/access/receive_code'
		}
		var callbackUrl = window.localStorage.getItem('callback');
		window.localStorage.setItem('callback', undefined);
		if(callbackUrl.indexOf('?') > 0){
			callbackUrl += '&openid=' + ${openid}
		} else {
			callbackUrl += '?openid=' + ${openid}
		}
		window.location.href = callbackUrl;
	</script>
</body>
</html>
`
	res.send(html);
	}
}