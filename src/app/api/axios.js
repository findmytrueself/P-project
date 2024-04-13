import axios from 'axios'

/**
 * 공통 Axios 인스턴스 생성
 * 해당 인스턴스는 Client, Server Side에서 공통으로 사용할 속성을 정의하여 생성합니다
 */
const SERVER_API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL

const createInstance = (config) => {
  const defaultConfiguration = {
    // Default 값으로 설정할 config를 정리
    baseURL: SERVER_API_URL,
  }
  return axios.create({
    ...defaultConfiguration,
    ...config,
    withCredentials: true,
  })
}

export const clientAxiosInstance = createInstance({
  baseURL: SERVER_API_URL,
})
