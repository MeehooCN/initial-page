/**
 * @description: 公共变量
 * @author: cnn
 * @createTime: 2020/7/16 16:53
 **/
interface Colors {
  // 主题色
  primaryColor: string,
  error: string
}
/**
 * 公共颜色
 * **/
export const colors: Colors = {
  primaryColor: '#1890ff',
  error: '#f5222d'
};
/**
 * 服务器部署前缀路径
 * **/
export const platform: string = '';
/**
 * API 接口路径
 **/
export const serverPath: string = '/api/';
