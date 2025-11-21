import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

/**
 * API 클라이언트 설정
 * 백엔드 API와 통신하기 위한 axios 인스턴스
 */
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 요청 인터셉터
    this.client.interceptors.request.use(
      (config) => {
        // 필요시 인증 토큰 추가
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // 에러 처리
        if (error.response) {
          // 서버 응답이 있는 경우
          console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
          // 요청은 보냈지만 응답이 없는 경우
          console.error('Network Error:', error.request);
        } else {
          // 요청 설정 중 에러
          console.error('Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET 요청
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * POST 요청
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT 요청
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE 요청
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  /**
   * PATCH 요청
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }
}

// 싱글톤 인스턴스 export
export const apiClient = new ApiClient();

// 기본 axios 인스턴스도 export (필요시 직접 사용)
export default apiClient;

