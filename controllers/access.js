module.exports = async (swc, options)=>{
	swc = await swc.registerService(swc, {
		path : `${__dirname}/../services/wechat/service`,
		serviceName : 'wechat'
	})

	return swc;
}