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
	<script type="text/javascript">
		var config = {
			appid : '${swc.config.wechat.appid}',
			redirectUrl : 'https://www.deadfishcrypto.com/wechat_platform/access/receive_code'
		}
		window.localStorage.setItem('callback', '${query.callback}');
		location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + config.redirectUrl
			 + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
	</script>
</body>
</html>
`
	res.send(html);
	}
}