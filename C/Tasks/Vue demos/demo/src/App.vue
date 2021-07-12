/* 配置组件的结构 */
<template>
	<div>
		<h2 class="like">我最喜欢的角色是：{{name}}</h2>
		<Hello/>
	</div>
</template>

/* 配置组件数据、交互、事件等等*/
<script>
	// 引入Hello组件
	import Hello from './components/Hello'

	export default {
		data(){
			return {
				name: 'Soryuu Kaminogi'
			}
		},
		components:{Hello},  // 注册组件
	}
</script>

<style>
  .like{
    color: green;
  }
</style>