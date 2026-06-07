// @ts-check
/**
 * 프로젝트를 초기화한다
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */
// 이건 JsDoc임
// js 파일에서 ts처럼 타입을 명시할 때 사용
// ts로 전환하기 어려운 상황에서 js 파일 그대로 유지하면서 타입 체크를 하고 싶을 때 사용
export function init(config) {
  return true;
}
/**
 * 프로그램을 종료시킨다
 * @param {number} code
 * @returns number
 */
export function exit(code) {
  return code + 1;
}
