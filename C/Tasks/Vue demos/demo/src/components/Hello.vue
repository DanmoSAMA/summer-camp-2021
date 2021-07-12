/* 配置组件模板结构 */
<template>
	<div>
		<h2 class="title">学校名：{{name}}</h2>
		<h2 class="info">学校地址：{{address}}</h2>	
	</div>
</template>

/* 配置组件数据、交互等 */
<script>
	// 暴露组件配置，并没有创建组件(因为没有调用Vue.extend)
	export default {
		// data中存放组件所需数据
		data(){ 
			return {
				name:'DanmoSAMA',
				address:'湖北省-武汉市-洪山区-华中科技大学'
			}
		}
	}
</script>	

/* 配置组件样式 */
<style>
	.title{
		color: orange;
	}
	.info{
		color: blue;
	}
</style>