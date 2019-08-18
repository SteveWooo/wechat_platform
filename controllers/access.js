module.exports = async (swc, options)=>{
	swc = await swc.registerService(swc, {
		path : `${__dirname}/../services/wechat/service`,
		serviceName : 'wechat'
	})

	swc = await swc.registerStatic(swc, {
		items : [{
			path : `/${swc.config.server.bussiness_name}/testPages`,
			staticFilePath : `${__dirname}/../public/testPages`
		}]
	});

	swc = await swc.registerHttpService(swc, {
		httpServiceFilePath : `${__dirname}/../services/http`
	})

	return swc;
}