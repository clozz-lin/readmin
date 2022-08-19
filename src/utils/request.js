const _get = async function (url, method) {
  const { data: res } = await this.$http.get(url)
  if (res.meta.status !== 200) return this.$message.error(res.data.msg)
}

export default {
  _get,
}
