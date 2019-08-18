module.exports = async (swc, options)=>{
	swc = await swc.registerService(swc, {
		path : `${__dirname}/../services/wechat/service`,
		serviceName : 'wechat'
	})

	swc = await swc.registerHttpService(swc, {
		httpServiceFilePath : `${__dirname}/../services/http`
	})

	return swc;
}