interface IObj {
  [prop: string]: any
}
/**
 * @desc 对象Key排序并生成key=value&
 * @param {Object} jsonObj 排序对象
 * @param {Boolean} isSort 是否排序
 */
const jsonSort = (obj: IObj, isSort = false) => {
  const keyArr = Object.keys(obj);
  isSort && keyArr.sort();
  let str = '';
  keyArr.forEach((key) => {
    str += `${key}=${obj.key}&`;
  });
  return str.substr(0, str.length - 1);
};

export {
  jsonSort,
};
